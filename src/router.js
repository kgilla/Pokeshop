import App from "./App";
import ErrorPage from "./pages/errorPage";
import PokemonIndex from "./pages/pokemonIndex";
import PokemonGrid  from "./pages/PokemonGrid"
import PokemonDetails from "./pages/PokemonDetails";

import { createBrowserRouter } from "react-router-dom";
import {gridLoader, detailsLoader} from "./utils/loaders"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <PokemonIndex /> },
        {
          path: "generation/:id",
          element: <PokemonGrid />,
          loader: gridLoader
        },
        {
          path: "type/:id",
          element: <PokemonGrid />,
          loader: gridLoader
        },
        {
          path: "pokemon/:id",
          element: <PokemonDetails />,
          loader: detailsLoader
        },
      ]
      }
    ],
  },
]);