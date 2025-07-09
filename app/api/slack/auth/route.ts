import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.SLACK_CLIENT_ID!;
  const redirectUri = process.env.SLACK_REDIRECT_URI!;
  const scopes = [
    "chat:write",
    "im:read",
    "im:write",
    "channels:read",
    "groups:read",
    "mpim:read",
    "users:read",
    "users:read.email",
  ].join(",");

  const url = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;
  console.log(url);
  return NextResponse.redirect(url);
}
