export const encodedUrl = (
  destination: string,
  text: string,
  url: string,
): string => {
  const _url = new URL(destination);
  if (text !== undefined) _url.searchParams.set("text", text);
  if (url !== undefined) _url.searchParams.set("url", url);
  return _url.toString();
};
