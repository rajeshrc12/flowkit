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

    const data = {
      id: credential?.id,
      accessToken: credential?.data?.access_token,
      name: credential?.data?.team?.name,
      slackUserId: credential?.data?.authed_user?.id,
      email: credential?.data?.email,
    };

    return NextResponse.json([data]);
  } catch (error) {
    console.error("Internal Error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
