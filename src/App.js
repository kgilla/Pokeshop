import { useState, useEffect } from "react";

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
    setPokemonData(resolved.sort((a, b) => (a.id > b.id ? 1 : 0)));
  };

  return (
    <div className="grid grid-cols-5 gap-4">
      {pokemonData.map((item) => (
        <Card key={item.id} pokemon={item}></Card>
      ))}
    </div>
  );
};

const Card = ({ pokemon }) => {
  return (
    <div className="border-2 border-gray-200 shadow-lg rounded-md">
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default}></img>
      {pokemon.types.map((item) => (
        <p key={item.type.name}>{item.type.name}</p>
      ))}
    </div>
  );
};

const fetchData = async (url) => {
  if (!url) return;
  const response = await fetch(url);
  return await response.json();
};

export default App;
