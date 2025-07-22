import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import axios from "axios";
import { Session } from "next-auth";

export async function POST(req: Request) {
  const {
    user: { id },
  } = (await auth()) as Session;

  try {
    const {
      username: userId,
      messageTextPlain: message,
      account: credentialId,
    } = await req.json();
    const credential = (await prisma.credential.findUnique({
      where: {
        id: credentialId,
        userId: id,
      },
    })) as any;

    // Step 1: Open a DM channel with the user
    const openDMResponse = await axios.post(
      "https://slack.com/api/conversations.open",
      { users: userId },
      {
        headers: {
          Authorization: `Bearer ${credential?.data?.access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(openDMResponse.data);

    const channelId = openDMResponse.data.channel.id;

    // Step 2: Send a message to that channel
    const sendMessageResponse = await axios.post(
      "https://slack.com/api/chat.postMessage",
      {
        channel: channelId,
        text: message,
      },
      {
        headers: {
          Authorization: `Bearer ${credential?.data?.access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return Response.json(sendMessageResponse.data, { status: 201 });
  } catch (error) {
    console.error("Error creating credential:", error);
    return Response.json(
      { error: "Error creating credential" },
      { status: 500 }
    );
  }
}
