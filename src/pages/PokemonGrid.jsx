import { useState, useEffect } from "react";
import {Link, useLoaderData} from "react-router-dom";
import query from "../utils/query";
import PokemonCard from "../components/PokemonCard";
import PlaceholderCard from "../components/PlaceholderCard";

const PokemonGrid = () => {
  const data = useLoaderData()
  const [pokemon, setPokemon] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  // const [pokemonList, setPokemonList] = useState([])

  // Handles querying for list of pokemon and initial data

  useEffect(() =>{
      (async () => {
        setIsLoading(true)
        if(data) {
          //Sorts pokemon based on id found in url
          const sortedPokemon = data.pokemon.sort((first, second) => {
            let firstNum = Number(first.url.slice(-6).match(/\d+/g)[0]);
            let secondNum = Number(second.url.slice(-6).match(/\d+/g)[0]);
            return firstNum > secondNum ? 1 : -1
          });

          // tbd storing sorted list of pokemon urls for pagination
          // setPokemonList(sortedPokemon)

          //Fetches initial pokemon to be displayed
          const resolvedData = await query.fetchPokemonByList(sortedPokemon)

          setPokemon(resolvedData);
        } 
        setIsLoading(false)
      })();
    
  }, [data])

  const placeHolders = () => {
    let array = []
    for(let x = 0; x < 16; x++) {
      array.push(<PlaceholderCard/>)
    }
    return array
  }

  return (
    <>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
      {isLoading ? placeHolders() : pokemon.length ? pokemon.map((item) => (
        <Link to={`/pokemon/${item.name}`} key={item.id}>
          <PokemonCard pokemon={item}></PokemonCard>
        </Link>
      )): null}
      </div>
    </>
  );
};

export default PokemonGrid;
