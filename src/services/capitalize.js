export function capitalizeBody(text) {
    const words = text.split(" ");
    const capitalizeLeBodyWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    const results = capitalizeLeBodyWords.join(" ");
    return results;
  }