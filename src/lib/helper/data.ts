export function cleanData(data: any): any {
  if (Array.isArray(data)) {
    return data.filter(Boolean).map((item) => cleanData(item));
  } else if (typeof data === "object" && data !== null) {
    return Object.fromEntries(
      Object.entries(data)
        .filter(([key, value]) => Boolean(value))
        .map(([key, value]) => [key, cleanData(value)]),
    );
  }
  return data;
}

export function extractTextFromHtml(htmlString: string) {
  if (typeof document != "undefined") {
    var span = document.createElement("span");
    span.innerHTML = htmlString;
    return span.textContent || span.innerText;
  } else {
    return htmlString;
  }
}
