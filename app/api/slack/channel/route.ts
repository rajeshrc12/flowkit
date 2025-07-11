import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import axios from "axios";
import { auth } from "@/auth";
import { Session } from "next-auth";

export async function GET() {
  try {
    const {
      user: { id },
    } = (await auth()) as Session;
    // Fetch Slack access token from database
    const credential = (await prisma.credential.findFirst({
      where: {
        type: "slack",
        userId: id,
      },
    })) as any;

    if (!credential?.data?.access_token) {
      return NextResponse.json(
        { error: "Slack token not found" },
        { status: 404 }
      );
    }

    // Fetch Slack channels using the stored access token
    const { data } = await axios.get(
      "https://slack.com/api/conversations.list",
      {
        headers: {
          Authorization: `Bearer ${credential?.data?.access_token}`,
        },
      }
    );

    if (!data.ok) {
      console.error("Slack API Error", data);
      return NextResponse.json(
        { error: "Slack API error", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ channels: data.channels });
  } catch (error) {
    console.error("Internal Error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
