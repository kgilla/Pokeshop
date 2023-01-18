import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import PokemonCard from "../components/PokemonCard";
import Loading from "../components/Loading";
import query from "../utils/query";

const PokemonDetails = () => {
  const [pokemon, setPokemon] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const {id} = useParams()

  useEffect(() =>{
      (async () => {
        setIsLoading(true)
        const data = await query.fetchPokemonById(id)
        if(data) setPokemon(data)
        console.log(data)
        setIsLoading(false)
      })();
    
  },[id])

  return (<div className="">
  
    {isLoading ? <Loading/> : pokemon?.id ?   <div className="grid grid-cols-3">
      <div className="bg-white col-span-1">
      <PokemonCard pokemon={pokemon} />
      </div>
      <div className="col-span-2 bg-green-600">
        {JSON.stringify(pokemon)}
      </div>
    </div>  : null}
  </div>)
}

export default PokemonDetails