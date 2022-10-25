import { useState, useEffect } from "react";

const typeColors = {
  fire: "bg-red-400",
  grass: "bg-green-400",
  poison: "bg-purple-400",
  bug: "bg-green-500",
  flying: "bg-yellow-200",
  water: "bg-blue-400",
  normal: "bg-gray-300",
  rock: "bg-amber-600 text-white",
  electric: "bg-yellow-400",
  ice: "bg-blue-200",
  fairy: "bg-pink-200",
  psychic: "bg-purple-400",
  ground: "bg-slate-400",
  fighting: "bg-yellow-600",
  dragon: "bg-red-700 text-white",
};

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);

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

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {pokemonData.map((item) => (
        <Card key={item.id} pokemon={item}></Card>
      ))}
    </div>
  );
};

const Card = ({ pokemon }) => {
  const stats = () => {
    return pokemon.stats.map((item) => (
      <div>
        <label>{item.stat.name}</label>
        <span>{item.base_stat}</span>
      </div>
    ));
  };

  const types = () => {
    return pokemon.types.map((item) => (
      <span
        className={typeColors[item.type.name] + " rounded-xl py-1 px-2 mr-1"}
        key={item.type.name}
      >
        {item.type.name}
      </span>
    ));
  };

  return (
    <div className="border-2 border-gray-200 shadow-lg rounded-md p-2 bg-gray-100">
      <header className="flex justify-between mb-2">
        <h1 className="capitalize font-bold">{pokemon.name}</h1>
        <span>#{pokemon.id}</span>
      </header>

      <div className="border-2 border-yellow-600 flex justify-center items-center bg-red-200 mb-2">
        <img
          className="w-32 h-32"
          src={pokemon.sprites.front_default}
          alt={`Image of ${pokemon.name}`}
        ></img>
      </div>

      <div className="mb-2">{types()}</div>

      {stats()}
    </div>
  );
};

const fetchData = async (url) => {
  if (!url) return;
  const response = await fetch(url);
  return await response.json();
};

export default App;
