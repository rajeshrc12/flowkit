import { auth } from "@/auth";
import { db } from "@/lib/mongodb";
import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  const {
    user: { id },
  } = (await auth()) as Session;

  try {
    const workflow = await prisma.workflow.create({
      data: {
        node: [],
        edge: [],
        userId: id,
      },
    });

    return Response.json({ workflow }, { status: 201 });
  } catch (error) {
    console.error("Error creating video:", error);
    return Response.json({ error: "Error creating video" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const {
    user: { id },
  } = (await auth()) as Session;

  const { nodes, edges, workflowId, name } = await req.json();

  try {
    const workflow = await prisma.workflow.update({
      where: {
        id: workflowId,
        userId: id,
      },
      data: {
        node: nodes,
        edge: edges,
        name,
      },
    });

    return Response.json({ workflow }, { status: 201 });
  } catch (error) {
    console.error("Error creating video:", error);
    return Response.json({ error: "Error creating video" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const {
    user: { id },
  } = (await auth()) as Session;

  const { workflowId, credentialKey, credentialValue, nodeId } =
    await req.json();

  try {
    const result = await db.collection("Workflow").updateOne(
      {
        _id: new ObjectId(workflowId),
        "node.id": nodeId,
      },
      {
        $set: {
          [`node.$.data.${credentialKey}`]: credentialValue,
        },
      }
    );

    return Response.json({ result }, { status: 201 });
  } catch (error) {
    console.error("Error creating video:", error);
    return Response.json({ error: "Error creating video" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const {
      user: { id },
    } = (await auth()) as Session;

    const workflows = await prisma.workflow.findMany({
      where: { userId: id },
    });
    // console.log(workflows);
    return Response.json({ workflows }, { status: 200 });
  } catch (error) {
    console.error("Error fetching workflows:", error);
    return Response.json(
      { error: "Failed to fetch workflows" },
      { status: 500 }
    );
  }
}
