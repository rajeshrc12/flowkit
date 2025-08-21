import { Node } from "@/types/node";

export const nodes: Node[] = [
  {
    id: "i1",
    type: "google_sheets",
    label: "Google Sheets",
    name: "app",
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
    name: "app",
    data: {
      actionEvent: "",
      account: "",
      channel: "",
      botName: "",
      messageText: "",
      username: "",
    },
  },
  {
    id: "i3",
    type: "filter",
    label: "Filter",
    name: "control",
    data: {},
  },
  {
    id: "i4",
    type: "telegram",
    label: "Telegram",
    name: "app",
    data: {
      accessToken: "",
    },
  },
];
