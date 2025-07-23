import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";

export async function POST(req: Request) {
  const {
    user: { id },
  } = (await auth()) as Session;
  const { workflowId, isPublished } = await req.json();
  try {
    const workflow = await prisma.workflow.update({
      where: {
        id: workflowId,
        userId: id,
      },
      data: {
        isPublished,
      },
    });
    return Response.json({ workflow }, { status: 201 });
  } catch (error) {
    console.error("Error publishing workflow:", error);
    return Response.json(
      { error: "Error publishing workflow" },
      { status: 500 }
    );
  }
}
