import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.SLACK_CLIENT_ID!;
  const redirectUri = process.env.SLACK_REDIRECT_URI!;
  const scopes = [
    "chat:write", // send messages
    "im:read", // read direct message conversations
    "im:write", // write to direct messages ✅
    "channels:read", // public channels
    "groups:read", // private channels
    "mpim:read", // multi-person DMs
    "users:read", // get Slack user info
  ].join(",");

  const url = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;
  console.log(url);
  return NextResponse.redirect(url);
}
