import { useState, useEffect } from "react";
import { fetchData } from "./utils/query";
import Card from "./components/Card";

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    let list = [];

    const data = await fetchData(
      "https://pokeapi.co/api/v2/pokemon/?limit=151"
    );

    data.results.forEach((item) => {
      list.push(fetchData(item.url));
    });

    const resolved = await Promise.all(list).then();
    console.log(resolved[0]);
    setPokemonData(resolved.sort((a, b) => (a.id > b.id ? 1 : 0)));
  };

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredResults = () => {
    if (!searchQuery) return pokemonData;
    return pokemonData.filter(
      (item) =>
        item.types.some((type) => type.type.name.includes(searchQuery)) ||
        item.name.includes(searchQuery)
    );
  };

  return (
    <div>
      <header className="h-12 bg-green-600 flex justify-between items-center px-8 fixed w-screen">
        <h1 className="text-white text-lg font-bold">Pokestore</h1>
        <input value={searchQuery} onChange={handleSearchInput} />
      </header>
      <div className="pt-16 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-6 px-8 justify-items-stretch">
        {filteredResults().map((item) => (
          <Card key={item.id} pokemon={item}></Card>
        ))}
      </div>
    </div>
  );
};

export default App;
