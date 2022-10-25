export const fetchData = async (url) => {
  if (!url) return;
  const response = await fetch(url);
  return await response.json();
};
