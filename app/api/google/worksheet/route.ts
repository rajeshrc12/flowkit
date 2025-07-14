import { auth } from "@/auth";
import { getOAuthClient } from "@/lib/google";
import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";
import { google } from "googleapis";
import { convertSheetData } from "@/utils/api";

export async function GET(req: Request) {
  const {
    user: { id },
  } = (await auth()) as Session;

  try {
    const url = new URL(req.url);
    const credentialId = url.searchParams.get("credentialId") || undefined;
    const spreadsheetId = url.searchParams.get("spreadsheetId");
    const worksheetName = url.searchParams.get("worksheetName");

    if (!spreadsheetId || !worksheetName) {
      return Response.json(
        { error: "Missing spreadsheetId or worksheetName" },
        { status: 400 }
      );
    }

    const credential = (await prisma.credential.findUnique({
      where: { id: credentialId, userId: id },
    })) as any;

    if (!credential?.data?.access_token) {
      return Response.json({ error: "Missing access token" }, { status: 401 });
    }

    const oAuth2Client = getOAuthClient();
    oAuth2Client.setCredentials({
      access_token: credential.data.access_token,
      refresh_token: credential.data.refresh_token,
    });

    const sheets = google.sheets({ version: "v4", auth: oAuth2Client });

    const res = (await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId as string,
      range: worksheetName as string,
    })) as any;

    return Response.json(convertSheetData(res.data.values), { status: 200 });
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    return Response.json(
      { error: "Error fetching sheet data" },
      { status: 500 }
    );
  }
}
