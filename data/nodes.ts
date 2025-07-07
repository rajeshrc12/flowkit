import { Node } from "@/types/node";

export const nodes: Node[] = [
  {
    id: "i1",
    type: "google_sheets",
    label: "Google Sheets",
    data: {
      triggerEvent: "",
      account: "",
      spreadsheet: "",
      worksheet: "",
    },
  },
  {
    id: "i2",
    type: "slack",
    label: "Slack",
    data: {
      actionEvent: "",
      account: "",
      channel: "",
      botName: "",
      messageText: "",
    },
  },
];
