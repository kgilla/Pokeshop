import { useEffect, useState } from "react";
import { useLoaderData} from "react-router-dom";
import PokemonCard from "../components/PokemonCard";
import Loading from "../components/Loading";

const PokemonDetails = () => {
  const data = useLoaderData()
  const [pokemon, setPokemon] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() =>{
      (async () => {
        setIsLoading(true)

        if(data) setPokemon(data)
        console.log(data)

        setIsLoading(false)
      })();
    
  },[data])

  return (<div className="">
  
    {isLoading ? <Loading/> : pokemon?.id ?   <div className="grid grid-cols-3">
      <div className="col-span-1">
      <PokemonCard pokemon={pokemon} />
      </div>
      <div className="col-span-2 bg-green-600">
       
      </div>
    </div>  : null}
  </div>)
}

export default PokemonDetails