import { NextRequest, NextResponse } from "next/server";
import { getOAuthClient } from "@/lib/google";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Session } from "next-auth";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  console.log(url);
  const code = url.searchParams.get("code");
  const {
    user: { id },
  } = (await auth()) as Session;

  if (!code)
    return NextResponse.json({ error: "Missing code" }, { status: 400 });

  try {
    const oauthClient = getOAuthClient();
    const { tokens } = await oauthClient.getToken(code);
    oauthClient.setCredentials(tokens);

    // console.log(tokens);
    await prisma.credential.create({
      data: {
        name: "Google Sheets",
        type: "google_sheets",
        userId: id,
        data: { ...tokens },
      },
    });
    const html = `
      <html>
        <head><title>Authentication Completed</title></head>
        <body style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;">
          <div>
            <h2>Google Authentication Successful</h2>
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
  } catch (err) {
    console.error("OAuth Callback Error:", err);
    return NextResponse.json(
      { error: "Token exchange failed" },
      { status: 500 }
    );
  }
}
