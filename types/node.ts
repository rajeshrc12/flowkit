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
  username?: string | null;
  worksheetData?: any[] | null;
  worksheetIndex?: number | null;
  response?: any | null;
}
export interface Node {
  id: string;
  type: string;
  label?: string;
  name?: string;
  data?: NodeData;
}

export const AppTypes = {
  google_sheets: "Google Sheets",
  slack: "Slack",
  filter: "Filter",
};
