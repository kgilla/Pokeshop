export const fetchData = async (url) => {
  if (!url) return;
  const response = await fetch(url);
  if (!response) throw new Error("There was a problem fetching data.");
  return await response.json();
};
