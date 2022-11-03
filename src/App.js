import { useState, useEffect } from "react";
import { fetchData } from "./utils/query";
import Loading from "./components/Loading";
import TopNav from "./components/TopNav";
import PokemonGrid from "./components/PokemonGrid";
import SideNav from "./components/SideNav";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState({});
  const [generationData, setGenerationData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGeneration, setSelectedGeneration] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const pageLimit = 50;

  useEffect(() => {
    fetchPokemons(selectedGeneration);
  }, [selectedGeneration]);

  const fetchPokemons = async (generation) => {
    if (pokemonData[generation]) return;

    let list = [];

    setIsLoading(true);

    const data = await fetchData(
      `https://pokeapi.co/api/v2/generation/${generation}`
    );

    if (data) {
      if (!generationData[data.id]) {
        const newData = (generationData[data.id] = data);
        setGenerationData({ ...generationData, newData });
      }
      data.pokemon_species.forEach((item) => {
        list.push(fetchData(`https://pokeapi.co/api/v2/pokemon/${item.name}`));
      });

      const resolved = await Promise.allSettled(list).catch((err) => {
        console.log("A promise failed to resolve", err);
      });

      if (resolved) {
        const values = resolved
          .filter((item) => item.status === "fulfilled")
          .map((item) => item.value)
          .sort((a, b) => (a.id > b.id ? 1 : -1));
        const dataCopy = { ...pokemonData };
        dataCopy[data.id] = values;
        setPokemonData({ ...dataCopy });
      }
    }
    setIsLoading(false);
  };

  const filteredResults = () => {
    if (!searchQuery) return pokemonData[selectedGeneration];
    return pokemonData[selectedGeneration].filter(
      (item) =>
        item.types.some((type) =>
          type.type.name.includes(searchQuery.toLowerCase())
        ) || item.name.includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="h-screen w-screen  bg-slate-200">
      <TopNav
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsOpen={setIsOpen}
      />
      <SideNav
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setGeneration={setSelectedGeneration}
      />
      {isLoading ? <Loading /> : null}
      <PokemonGrid
        pokemon={filteredResults()}
        pageLimit={pageLimit}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default App;
