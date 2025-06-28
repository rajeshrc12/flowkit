export const nodes = [
  {
    id: "chat_node",
    type: "chat_node",
    position: { x: 100, y: 100 },
    data: { label: "Chat", isStart: true },
  },
  {
    id: "agent",
    type: "agent",
    position: { x: 200, y: 200 },
    data: { label: "Agent", isStart: false },
  },
  {
    id: "openai",
    type: "openai",
    position: { x: 300, y: 300 },
    data: { label: "OpenAI", isStart: false },
  },
  {
    id: "gemini",
    type: "gemini",
    position: { x: 400, y: 400 },
    data: { label: "Gemini", isStart: false },
  },
  {
    id: "pinecone",
    type: "pinecone",
    position: { x: 500, y: 400 },
    data: { label: "Pinecone", isStart: false },
  },
];
