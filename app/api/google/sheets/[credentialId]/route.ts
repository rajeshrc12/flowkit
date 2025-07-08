import { getOAuthClient } from "@/lib/google";
import { prisma } from "@/lib/prisma";
import { google } from "googleapis";

// GET handler to fetch all spreadsheets and their internal sheets
export async function GET(req: Request) {
  const url = new URL(req.url);
  const credentialId = url.pathname.split("/").pop();

  try {
    const credential = (await prisma.credential.findUnique({
      where: { id: credentialId },
    })) as any;

    if (!credential?.data?.access_token) {
      return Response.json({ error: "Missing access token" }, { status: 401 });
    }

    const oAuth2Client = getOAuthClient();
    oAuth2Client.setCredentials({
      access_token: credential.data.access_token,
      refresh_token: credential.data.refresh_token,
    });

    const drive = google.drive({ version: "v3", auth: oAuth2Client });

    const fileList = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.spreadsheet'",
      fields: "files(id, name)",
    });

    const spreadsheets = fileList.data.files || [];

    const sheetsApi = google.sheets({ version: "v4", auth: oAuth2Client });

    const results = [];

    for (const file of spreadsheets) {
      const sheetMeta = await sheetsApi.spreadsheets.get({
        spreadsheetId: file.id!,
      });

      const sheetTitles =
        sheetMeta.data.sheets?.map((s) => s.properties?.title || "Untitled") ||
        [];

      results.push({
        id: file.id!,
        name: file.name!,
        sheets: sheetTitles,
      });
    }

    return Response.json(results, { status: 200 });
  } catch (error) {
    console.error("Error fetching spreadsheets and sheets:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
