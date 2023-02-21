import { useState, useEffect } from "react";
import { useParams,useLocation, Link} from "react-router-dom";
import query from "../utils/query";
import Loading from "../components/Loading";
import PokemonCard from "../components/PokemonCard";


const PokemonGrid = () => {

  const [pokemon, setPokemon] = useState([])
  const [pokemonList, setPokemonList] = useState([])
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const {id} = useParams()
  const {pathname} = useLocation()

  // Handles querying for list of pokemon and initial data
  useEffect(() =>{
      (async () => {

        setIsLoading(true)

        const data = pathname.includes("generation") ? 
        await query.fetchPokemonByGeneration(id) : 
        await query.fetchPokemonByType(id)
        
        if(data) {

          //Sorts pokemon based on id found in url
          const sortedPokemon = data.pokemon.sort((first, second) => {
            console.log(first, second)
            let firstNum = Number(first.url.slice(-6).match(/\d+/g)[0]);
            let secondNum = Number(second.url.slice(-6).match(/\d+/g)[0]);
            return firstNum > secondNum ? 1 : -1
          });

          setPokemonList(sortedPokemon)

          //Fetches initial pokemon to be displayed
          const resolvedData = await query.fetchPokemonByList(sortedPokemon.slice(0,30))

          setPokemon(resolvedData);
        }

        setIsLoading(false)
      })();
    
  }, [id, pathname])

  // Handles new pokemon to be fetched through next page requests
  useEffect(() =>{
    (async () => {
      const limit = 20;
      setIsLoading(true)
      console.log("hi")
      if(pokemonList.length) {
        const resolvedData = await query.fetchPokemonByList(pokemonList.slice(page * limit, limit))
        setPokemon(resolvedData)
      }
      setIsLoading(false)
    })();
  
  }, [page, pokemonList])

  const handleClick = () => {
    setPage(page + 1)
  }

  return (
    <>
      <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-6">
      {isLoading ? <Loading/> : pokemon.length ? pokemon.map((item) => (
        <Link to={`/pokemon/${item.name}`} key={item.id}>
          <PokemonCard pokemon={item}></PokemonCard>
        </Link>
      )): null}
      </div>
      <div>
        <button onClick={handleClick}>Click</button>
      </div>
    </>
  );
};

export default PokemonGrid;
