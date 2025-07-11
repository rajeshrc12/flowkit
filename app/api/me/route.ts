import { auth } from "@/auth";
import { Session } from "next-auth";

export async function GET() {
  try {
    const { user } = (await auth()) as Session;

    return Response.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching credentials:", error);
    return Response.json(
      { error: "Failed to fetch credentials" },
      { status: 500 }
    );
  }
}
