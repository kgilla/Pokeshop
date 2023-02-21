import { pokemonTypes } from "../utils/const";

const PokemonCard = ({ pokemon }) => {
  const stats = () => {
    return pokemon.stats.map((item) => (
      <div
        key={item.stat.name + pokemon.id}
        className="flex justify-between mx-4"
      >
        <label className="text-gray-500 dark:text-gray-100 text-sm capitalize">
          {item.stat.name}
        </label>
        <span className="font-semi-bold text-gray-800 dark:text-gray-100">{item.base_stat}</span>
      </div>
    ));
  };

  const types = () => {
    return pokemon.types.map((item) => (
      <span
        className={
          pokemonTypes[item.type.name].bgColor +
          " rounded-xl py-1 px-2 mr-1 text-sm font-semibold text-gray-200 dark:border-2 dark:border-gray-900"
        }
        key={item.type.name}
      >
        {item.type.name.charAt(0).toUpperCase() + item.type.name.slice(1)}
      </span>
    ));
  };

  return (
    <div className="max-w-xs border-2 border-gray-300 dark:border-gray-900 shadow-lg rounded-md p-4 bg-amber-100 dark:bg-blue-900">
      <header className="flex justify-between mb-2">
        <h1 className="capitalize font-bold dark:text-gray-100">{pokemon.name}</h1>
        <span className="font-bold text-gray-600 dark:text-gray-400">
          #{pokemon.id}
        </span>
      </header>

      <div className="border-2 border-gray-300 dark:border-gray-900 rounded flex justify-center items-center bg-red-200 dark:bg-gray-500 mb-2">
        <img
          className={pokemon.sprites.front_default ? "w-36 h-36" :"w-36 h-36 p-4"}
          src={pokemon.sprites.front_default || "/pokeball.png"}
          alt={`${pokemon.name}`}
        ></img>
      </div>

      <div className="mb-2">{types()}</div>

      <div className="border-2 dark:border-gray-900 rounded p-1 bg-white border-gray-300 dark:bg-gray-500">
        {" "}
        {stats()}
      </div>
    </div>
  );
};

export default PokemonCard;
