import { typeColors } from "../utils/const";

const PokemonCard = ({ pokemon }) => {
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
    <div className="border-2 border-gray-200 shadow-lg rounded-md p-4 bg-amber-100 hover:bg-amber-200 hover:cursor-pointer hover:shadow-xl">
      <header className="flex justify-between mb-2">
        <h1 className="capitalize font-bold">{pokemon.name}</h1>
        <span className="font-bold text-gray-600">#{pokemon.id}</span>
      </header>

      <div className="border-2 border-yellow-600 rounded flex justify-center items-center bg-red-100 mb-2">
        <img
          className="w-36 h-36"
          src={pokemon.sprites.front_default}
          alt={`${pokemon.name}`}
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

export default PokemonCard;
