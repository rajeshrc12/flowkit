import { prisma } from "@/lib/prisma"; // Prisma import for accessing your database

// Define GET method handler
export async function GET(req: Request) {
  const url = new URL(req.url);
  const workflowId = url.pathname.split("/").pop(); // Extract videoId from URL path

  try {
    // Fetch video data from the database using Prisma
    const workflow = await prisma.workflow.findUnique({
      where: { id: workflowId },
    });

    // If video does not exist, return an error
    if (!workflow) {
      return Response.json({ error: "Video not found" }, { status: 404 });
    }

    // Return the signed URL
    return Response.json({ ...workflow }, { status: 200 });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
