import App from "./App";
import ErrorPage from "./pages/errorPage";
import PokemonIndex from "./pages/pokemonIndex";
import PokemonGrid  from "./pages/PokemonGrid"
import { createBrowserRouter } from "react-router-dom";
import PokemonDetails from "./pages/PokemonDetails";

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
      },
      {
        path: "type/:id",
        element: <PokemonGrid />,
      },
      {
        path: "pokemon/:id",
        element: <PokemonDetails />,
      },
    ],
  },
]);