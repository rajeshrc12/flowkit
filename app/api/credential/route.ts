import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";

export async function POST(req: Request) {
  const {
    user: { id },
  } = (await auth()) as Session;

  try {
    const { name, type, data } = await req.json();
    const credential = await prisma.credential.create({
      data: {
        name,
        type,
        data,
        userId: id,
      },
    });

    return Response.json({ credential }, { status: 201 });
  } catch (error) {
    console.error("Error creating credential:", error);
    return Response.json(
      { error: "Error creating credential" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const {
      user: { id },
    } = (await auth()) as Session;

    const credentials = await prisma.credential.findMany({
      where: { userId: id },
    });
    // console.log(credentials);
    return Response.json({ credentials }, { status: 200 });
  } catch (error) {
    console.error("Error fetching credentials:", error);
    return Response.json(
      { error: "Failed to fetch credentials" },
      { status: 500 }
    );
  }
}
