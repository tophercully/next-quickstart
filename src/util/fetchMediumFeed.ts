export const fetchMediumFeed = async (username: string) => {
  const rssUrl = `https://medium.com/feed/@${username}`;
  const response = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`,
  );
  if (!response.ok) {
    throw new Error(`Error fetching feed: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};
