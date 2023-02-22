const query = (function() {
  const baseURL = 'https://pokeapi.co/api/v2'
  
  const fetchData = async (url) => {
    if (!url) return;
    const response = await fetch(url);
    if (!response) throw new Error("There was a problem fetching data.");
    return await response.json();
  }

  const fetchPokemonByList = async (pokemonToFetch) => {
    let list = [];

    pokemonToFetch.forEach((item) => {
      list.push(fetchData(`${baseURL}/pokemon/${item.name}`));
    });

    const resolved = await Promise.allSettled(list).catch((err) => {
      console.log("A promise failed to resolve", err);
    });

    if (resolved) {
      return resolved
        .filter((item) => item.status === "fulfilled")
        .map((item) => item.value)
    }
  }

  
  const fetchPokemonById = async (id) => {
    const data = await fetchData(
      `${baseURL}/pokemon/${id}`
    );
    if (data) {
      return data
    } else {
      console.error(`Something went wrong fetching pokemon with id: ${id}`)
    }
  };

  const fetchPokemonByGeneration = async (generation) => {
    const data = await fetchData(
      `${baseURL}/generation/${generation}`
    );

    if (data) {
      return {pokemon: data.pokemon_species, region: data.main_region.name}
    } else {
      console.error(`Error fetching pokemon with generation: ${generation}`)
    }
    
  };

  const fetchPokemonByType = async (type) => {
    const data = await fetchData(
      `${baseURL}/type/${type}`
    );

    if (data) {
      return {...data, pokemon: data.pokemon.map(item => {return item.pokemon})}
    } else {
      console.error(`Error fetching pokemon with type: ${type}`)
    }
  }

  return {
    fetchData, fetchPokemonByGeneration, fetchPokemonById, fetchPokemonByType, fetchPokemonByList
  }
}())

export default query



