import { Pinecone } from "@pinecone-database/pinecone";

const PINECONE_API_KEY = process.env.PINECONE_API_KEY!;

export async function GET() {
  try {
    const pc = new Pinecone({ apiKey: PINECONE_API_KEY });

    const indexList = await pc.listIndexes();

    console.log(indexList);
    return Response.json({ indexList }, { status: 200 });
  } catch (error) {
    console.error("Error fetching index list:", error);
    return Response.json(
      { error: "Failed to fetch index list" },
      { status: 500 }
    );
  }
}
