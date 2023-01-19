import { useState, useEffect } from "react";
import { useParams,useLocation, Link} from "react-router-dom";
import query from "../utils/query";
import Loading from "../components/Loading";
import PokemonCard from "../components/PokemonCard";


const PokemonGrid = () => {

  const [pokemon, setPokemon] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const {id} = useParams()
  const {pathname} = useLocation()

  useEffect(() =>{
      (async () => {
        setIsLoading(true)
        const data = pathname.includes("generation") ? 
        await query.fetchPokemonByGeneration(id) : 
        await query.fetchPokemonByType(id)
        if(data) setPokemon(data)
        setIsLoading(false)
      })();
    
  }, [id, pathname])

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-6">
      {isLoading ? <Loading/> : pokemon.length ? pokemon.map((item) => (
        <Link to={`/pokemon/${item.name}`} key={item.id}>
          <PokemonCard pokemon={item}></PokemonCard>
        </Link>
      )): null}
    </div>
  );
};

export default PokemonGrid;
