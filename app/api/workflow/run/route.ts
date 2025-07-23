import axios from "axios";

export async function POST(req: Request) {
  const { workflowId } = await req.json();
  try {
    const response = await axios.post(`http://localhost:8000/workflow`, {
      workflow_id: workflowId,
    });
    console.log(response);
    return Response.json({ workflowId }, { status: 201 });
  } catch (error) {
    console.error("Error creating video:", error);
    return Response.json({ error: "Error creating video" }, { status: 500 });
  }
}
