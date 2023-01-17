import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import query from "../utils/query";

import Loading from "../components/Loading";
import PokemonCard from "../components/PokemonCard";


const PokemonGrid = () => {

  const [pokemon, setPokemon] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const {id} = useParams()

  useEffect(() =>{
      (async () => {
        setIsLoading(true)
        const data = await query.fetchPokemonByGeneration(id)
        if(data) setPokemon(data)
        setIsLoading(false)
      })();
    
  },[id])

  return (
    <div className="min-h-screen container m-auto py-24 px-12 grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-6 bg-white dark:bg-gray-700">
      {isLoading ? <Loading/> : pokemon.length ? pokemon.map((item) => (
        <PokemonCard key={item.id} pokemon={item}></PokemonCard>
      )): null}
    </div>
  );
};

export default PokemonGrid;
