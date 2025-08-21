import { prisma } from "@/lib/prisma"; // Prisma import for accessing your database
import { Session } from "next-auth";
import { auth } from "@/auth";
import axios from "axios";

export async function POST(req: Request) {
  const {
    user: { id },
  } = (await auth()) as Session;

  try {
    const { accessToken } = await req.json();
    const response = await axios.get(
      `https://api.telegram.org/bot${accessToken}/getMe`
    );
    const credential = await prisma.credential.create({
      data: {
        name: "Telegram",
        type: "telegram",
        data: {
          accessToken,
          botId: String(response.data.result.id),
          botUserName: response.data.result.username,
          botFirstName: response.data.result.first_name,
        },
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

// Define GET method handler
export async function GET(req: Request) {
  const {
    user: { id },
  } = (await auth()) as Session;

  try {
    // Fetch video data from the database using Prisma
    const credentials = (await prisma.credential.findMany({
      where: { type: "telegram", userId: id },
    })) as any;

    // If video does not exist, return an error
    if (!credentials) {
      return Response.json({ error: "Credential not found" }, { status: 404 });
    }

    return Response.json(credentials, { status: 200 });
  } catch (error) {
    console.error("Error fetching credentials:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
