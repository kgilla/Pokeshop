import App from "./App";
import ErrorPage from "./pages/errorPage";
import PokemonIndex from "./pages/pokemonIdex";
import PokemonGrid  from "./pages/PokemonGrid"
import { createBrowserRouter } from "react-router-dom";
import query from "./utils/query"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <PokemonIndex /> },
      {
        path: "generation/:id",
        element: <PokemonGrid />,
        loader: query.fetchPokemonByGenerations,
      },
    ],
  },
]);