const query = (function() {
  const baseURL = 'https://pokeapi.co/api/v2'
  
  
  const fetchData = async (url) => {
    if (!url) return;
    const response = await fetch(url);
    if (!response) throw new Error("There was a problem fetching data.");
    return await response.json();
  }

  
  const fetchPokemonById = async (id) => {
    const data = await fetchData(
      `${baseURL}/pokemon/${id}`
    );
    if (data) {
      return data
    } else {
      console.error(`Something went wrong fetching pokemon with id ${id}`)
    }
  };

  const fetchPokemonByGeneration = async (generation) => {
    const data = await fetchData(
      `${baseURL}/generation/${generation}`
    );

    if (data) {
      let list = [];

      data.pokemon_species.forEach((item) => {
        list.push(fetchData(`${baseURL}/pokemon/${item.name}`));
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

  const fetchPokemonByType = async (type) => {
    const data = await fetchData(
      `${baseURL}/type/${type}`
    );

    if (data) {
      let list = [];

      data.pokemon.forEach((item) => {
        list.push(fetchData(`${item.pokemon.url}`));
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
  }

  return {
    fetchData, fetchPokemonByGeneration, fetchPokemonById, fetchPokemonByType
  }
}())

export default query



