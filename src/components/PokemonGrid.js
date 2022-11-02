import { useState } from "react";
import Card from "./Card";

const PokemonGrid = ({ pokemon, pageLimit, searchQuery }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const nextDisabled = () => {
    return currentPage === Math.round(pokemon.length / pageLimit);
  };

  const prevDisabled = () => {
    return currentPage === 0;
  };

  const handlePrevPageClick = () => {
    if (!prevDisabled()) setCurrentPage(currentPage - 1);
  };

  const handleNextPageClick = () => {
    if (!nextDisabled()) setCurrentPage(currentPage + 1);
  };

  const pokemonToShow = () => {
    const start = currentPage * pageLimit;
    return searchQuery ? pokemon : pokemon.slice(start, start + pageLimit);
  };

  return pokemon ? (
    <div>
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-6 px-12 py-24 overflow-scroll bg-slate-200">
        {pokemonToShow().map((item) => (
          <Card key={item.id} pokemon={item}></Card>
        ))}
      </div>
      {pokemonToShow().length && !searchQuery.length ? (
        <div className="flex justify-center">
          <button
            className="py-1 px-3 rounded bg-green-600 text-white disabled:opacity-75"
            onClick={handlePrevPageClick}
            disabled={prevDisabled()}
          >
            Prev
          </button>
          <button
            className="py-1 px-3 rounded bg-green-600 text-white disabled:opacity-75"
            onClick={handleNextPageClick}
            disabled={nextDisabled()}
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  ) : null;
};

export default PokemonGrid;
