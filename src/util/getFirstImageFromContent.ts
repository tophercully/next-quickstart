export const getFirstImageFromContent = (
  htmlContent: string,
): string | null => {
  const imgRegex = /<img[^>]+src="([^">]+)"/g;
  let match;
  while ((match = imgRegex.exec(htmlContent)) !== null) {
    const src = match[1];
    if (!src.includes(".gif")) {
      return src;
    }
  }
  return null;
};
