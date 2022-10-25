import { useState, useEffect } from "react";

const typeColors = {
  fire: "bg-red-500",
  grass: "bg-green-500",
  poison: "bg-purple-500",
  bug: "bg-green-500",
  flying: "bg-yellow-400",
  water: "bg-blue-500",
  normal: "bg-gray-400",
  rock: "bg-amber-600",
  electric: "bg-yellow-500",
  ice: "bg-blue-400",
  fairy: "bg-pink-400",
  psychic: "bg-purple-500",
  ground: "bg-slate-500",
  fighting: "bg-yellow-700",
  dragon: "bg-red-800",
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
      <div
        key={item.stat.name + pokemon.id}
        className="flex justify-between mx-4"
      >
        <label className="text-gray-500 text-sm capitalize">
          {item.stat.name}
        </label>
        <span className="font-semi-bold text-gray-800">{item.base_stat}</span>
      </div>
    ));
  };

  const types = () => {
    return pokemon.types.map((item) => (
      <span
        className={
          typeColors[item.type.name] +
          " rounded-xl py-1 px-2 mr-1 capitalize text-sm font-semi-bold text-white"
        }
        key={item.type.name}
      >
        {item.type.name}
      </span>
    ));
  };

  return (
    <div className="border-2 border-gray-200 shadow-lg rounded-md p-4 bg-amber-100">
      <header className="flex justify-between mb-2">
        <h1 className="capitalize font-bold">{pokemon.name}</h1>
        <span className="font-bold text-gray-600">#{pokemon.id}</span>
      </header>

      <div className="border-2 border-yellow-600 rounded flex justify-center items-center bg-red-100 mb-2">
        <img
          className="w-36 h-36"
          src={pokemon.sprites.front_default}
          alt={`Image of ${pokemon.name}`}
        ></img>
      </div>

      <div className="mb-2">{types()}</div>

      <div className="border-2 border-gray-300 rounded p-1 bg-white">
        {" "}
        {stats()}
      </div>
    </div>
  );
};

const fetchData = async (url) => {
  if (!url) return;
  const response = await fetch(url);
  return await response.json();
};

export default App;
