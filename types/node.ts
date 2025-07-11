export interface NodeData {
  id?: string | null;
  type?: string | null;
  triggerEvent?: string | null;
  account?: string | null;
  spreadsheet?: string | null;
  worksheet?: string | null;
  actionEvent?: string | null;
  channel?: string | null;
  botName?: string | null;
  messageText?: string | null;
}
export interface Node {
  id: string;
  type: string;
  label?: string;
  data?: NodeData;
}
