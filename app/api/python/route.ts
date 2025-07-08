import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import axios from "axios";
import { Session } from "next-auth";
const PYTHON_URL = process.env.PYTHON_URL;
export async function POST(req: Request) {
  const {
    user: { id },
  } = (await auth()) as Session;

  try {
    const { message, workflowId, chat_message } = await req.json();
    const response = await axios.post(`${PYTHON_URL}/chat`, {
      message,
      workflow_id: workflowId,
      chat_message,
    });
    // console.log(response);
    return Response.json(response.data.chat_message, { status: 201 });
  } catch (error) {
    console.error("Error creating credential:", error);
    return Response.json(
      { error: "Error creating credential" },
      { status: 500 }
    );
  }
}
