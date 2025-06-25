import { prisma } from "@/lib/prisma"; // Prisma import for accessing your database
import { Session } from "next-auth";
import { auth } from "@/auth";

// Define GET method handler
export async function GET(req: Request) {
  const {
    user: { id },
  } = (await auth()) as Session;
  const url = new URL(req.url);
  const credentialType = url.pathname.split("/").pop(); // Extract videoId from URL path

  try {
    // Fetch video data from the database using Prisma
    const credentials = await prisma.credential.findMany({
      where: { type: credentialType, userId: id },
    });

    // If video does not exist, return an error
    if (!credentials) {
      return Response.json({ error: "Credential not found" }, { status: 404 });
    }

    // Return the signed URL
    return Response.json({ credentials }, { status: 200 });
  } catch (error) {
    console.error("Error fetching credentials:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
