import { useState, useEffect } from "react";
import { fetchData } from "./utils/query";
import Card from "./components/Card";
import Loading from "./components/Loading";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [currentPage]);

  const fetchPokemons = async () => {
    let list = [];
    const pageLimit = 50;
    const offset = pageLimit * (currentPage - 1);

    setIsLoading(true);

    const data = await fetchData(
      `https://pokeapi.co/api/v2/pokemon/?limit=${pageLimit}&offset=${offset}`
    );

    if (data) {
      data.results.forEach((item) => {
        list.push(fetchData(item.url));
      });

      const resolved = await Promise.all(list).then();

      if (resolved) {
        const sorted = resolved.sort((a, b) => (a.id > b.id ? 1 : 0));
        pokemonData.length
          ? setPokemonData((pokemonData) => [...pokemonData, ...sorted])
          : setPokemonData(sorted);
      }
    }
    setIsLoading(false);
  };

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleButtonClick = () => {
    setCurrentPage(currentPage + 1);
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
    <div className="h-screen w-screen  bg-slate-200">
      <header className="h-12 bg-green-600 flex justify-between items-center px-8 w-screen">
        <h1 className="text-white text-lg font-bold">Pokestore</h1>
        <input value={searchQuery} onChange={handleSearchInput} />
      </header>
      {isLoading ? <Loading /> : null}
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-6 p-10 overflow-scroll">
        {filteredResults().map((item) => (
          <Card key={item.id} pokemon={item}></Card>
        ))}
        {filteredResults().length ? (
          <button onClick={handleButtonClick}>Load more</button>
        ) : null}
      </div>
    </div>
  );
};

export default App;
