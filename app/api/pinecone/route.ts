// app/api/pinecone/route.ts or pages/api/pinecone.ts
import { pinecone } from "@/lib/pinecone";

export async function GET() {
  try {
    const indexList = await pinecone.listIndexes();
    return Response.json({ indexList });
  } catch (error) {
    console.error("Pinecone error:", error);
    return Response.json(
      { error: "Failed to fetch index list" },
      { status: 500 }
    );
  }
}
