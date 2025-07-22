import { Node, mergeAttributes } from "@tiptap/core";

const MultiSpan = Node.create({
  name: "multiSpan",
  group: "inline",
  inline: true,
  selectable: true,
  atom: true,

  addAttributes() {
    return {
      class: {
        default: "inline-flex items-center gap-2 border rounded px-1",
      },
      key: {
        default: "key",
      },
      value: {
        default: "value",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (node) => {
          const classAttr = node.getAttribute?.("class");
          return { class: classAttr };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes),
      ["span", {}, `${HTMLAttributes.key}: `],
      ["span", { class: "text-xs text-gray-500" }, HTMLAttributes.value],
    ];
  },
});

export default MultiSpan;
