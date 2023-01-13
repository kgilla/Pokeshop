const query = (function() {
    const fetchData = async (url) => {
    if (!url) return;
    const response = await fetch(url);
    if (!response) throw new Error("There was a problem fetching data.");
    return await response.json();
  }

  const fetchPokemonByGeneration = async (generation = 1) => {
    const data = await fetchData(
      `https://pokeapi.co/api/v2/generation/${generation}`
    );

    if (data) {
      let list = [];

      data.pokemon_species.forEach((item) => {
        list.push(fetchData(`https://pokeapi.co/api/v2/pokemon/${item.name}`));
      });

      const resolved = await Promise.allSettled(list).catch((err) => {
        console.log("A promise failed to resolve", err);
      });

      if (resolved) {
        return resolved
          .filter((item) => item.status === "fulfilled")
          .map((item) => item.value)
          .sort((a, b) => (a.id > b.id ? 1 : -1));
      }
    }
  };

  return {
    fetchData, fetchPokemonByGeneration
  }
}())

export default query



