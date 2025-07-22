// Extract keys from message
function extractKeysFromMessage(template: string) {
  const regex = /key="([^"]+)"/g;
  const keys = [];
  let match;
  while ((match = regex.exec(template)) !== null) {
    keys.push(match[1]);
  }
  return keys;
}

// Clean and replace message
export function createPlainMessages(template: string, dataArray: any[]) {
  const keysInTemplate = extractKeysFromMessage(template);

  return dataArray.map((entry) => {
    let plain = template;

    // Replace HTML spans with just the value
    for (const key of keysInTemplate) {
      if (entry[key]) {
        const regex = new RegExp(
          `<span class="inline-flex[^>]*key="${key}"[^>]*value="[^"]*"[^>]*>(.*?)<span class="text-xs text-gray-500">[^<]*</span>.*?</span>`,
          "g"
        );
        plain = plain.replace(regex, entry[key]);
      }
    }

    // Strip any remaining tags
    return plain
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  });
}
