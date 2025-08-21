import { prisma } from "@/lib/prisma"; // Prisma import for accessing your database
import { Session } from "next-auth";
import { auth } from "@/auth";
import axios from "axios";

export async function GET(req: Request) {
  const {
    user: { id },
  } = (await auth()) as Session;

  try {
    const url = new URL(req.url);
    const credentialId = url.pathname.split("/").pop();

    if (!credentialId) {
      return Response.json(
        { error: "Credential ID not found" },
        { status: 404 }
      );
    }
    const credential = (await prisma.credential.findUnique({
      where: { type: "telegram", userId: id, id: credentialId },
    })) as any;

    if (!credential) {
      return Response.json({ error: "Credential not found" }, { status: 404 });
    }

    const response = await axios.get(
      `https://api.telegram.org/bot${credential.data.accessToken}/getUpdates`
    );
    console.log(response.data);
    return Response.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching credentials:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
