export function unicodeToChar(text: string) {
  return text?.replace(/\\u[\dA-F]{4}/gi, function (match) {
    return String?.fromCharCode(parseInt(match.replaceAll("\\u", ""), 16));
  });
}
