import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { Session } from "next-auth";
import axios from "axios";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) return NextResponse.redirect("/?error=missing_code");

  const {
    user: { id },
  } = (await auth()) as Session;

  try {
    const { data } = await axios.post(
      "https://slack.com/api/oauth.v2.access",
      new URLSearchParams({
        code,
        client_id: process.env.SLACK_CLIENT_ID!,
        client_secret: process.env.SLACK_CLIENT_SECRET!,
        redirect_uri: process.env.SLACK_REDIRECT_URI!,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!data.ok) {
      console.error("Slack OAuth error:", data);
      return NextResponse.redirect("/?error=oauth_failed");
    }

    await prisma.credential.create({
      data: {
        name: "Slack",
        type: "slack",
        userId: id,
        data,
      },
    });

    const html = `
      <html>
        <head><title>Authentication Completed</title></head>
        <body style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;">
          <div>
            <h2>Slack Authentication Successful</h2>
            <p>You may now close this window.</p>
          </div>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    console.error("Slack OAuth Axios error:", error);
    return NextResponse.redirect("/?error=axios_failed");
  }
}
