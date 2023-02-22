import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  console.log(error)

  return (
    <div id="error-page" className="max-h-screen h-[calc(100vh-128px)] w-full flex flex-col justify-center items-center dark:text-white text-center">
      <h1 className="text-4xl mb-6">Oops! Something Went Wrong...</h1>
      <img src="/surprisedPika.png" className="h-64 w-64 mb-6" />
      <p className="text-xl mb-6">Sorry, an unexpected error has occurred.</p>
      <p className="text-xl">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}