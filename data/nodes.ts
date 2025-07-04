export const nodes = [
  {
    type: "chat_node",
    position: { x: 100, y: 100 },
    data: { label: "Chat", isStart: true, name: "chat_node", type: "root" },
  },
  {
    type: "agent",
    position: { x: 200, y: 200 },
    data: { label: "Agent", isStart: false, name: "agent", type: "root" },
  },
  {
    type: "openai",
    position: { x: 300, y: 300 },
    data: { label: "OpenAI", isStart: false, name: "openai", type: "model" },
  },
  {
    type: "gemini",
    position: { x: 400, y: 400 },
    data: { label: "Gemini", isStart: false, name: "gemini", type: "model" },
  },
  {
    type: "geminiEmbedding",
    position: { x: 500, y: 400 },
    data: {
      label: "Gemini Embedding",
      isStart: false,
      name: "gemini",
      type: "model",
    },
  },
  {
    type: "pinecone",
    position: { x: 500, y: 400 },
    data: {
      label: "Pinecone",
      isStart: false,
      name: "pinecone",
      type: "tool",
    },
  },
];
