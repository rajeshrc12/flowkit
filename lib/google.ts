import { google } from "googleapis";
import type { OAuth2Client } from "google-auth-library";

// Create a singleton OAuth2 client
let oauth2Client: OAuth2Client | null = null;

export const getOAuthClient = (): OAuth2Client => {
  if (!oauth2Client) {
    oauth2Client = new google.auth.OAuth2(
      process.env.AUTH_GOOGLE_ID!,
      process.env.AUTH_GOOGLE_SECRET!,
      process.env.CUSTOM_GOOGLE_REDIRECT_URL!
    );
  }
  return oauth2Client;
};

export const getAuthUrl = (): string => {
  const client = getOAuthClient();
  const scopes = [
    "https://www.googleapis.com/auth/spreadsheets.readonly",
    "https://www.googleapis.com/auth/drive.metadata.readonly",
    "openid",
    "email",
    "profile",
  ];

  return client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes,
  });
};
