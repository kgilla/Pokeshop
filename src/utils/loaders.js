import query from "./query";

export async function gridLoader({ params, request }) {
  try {
    const data = request.url.includes("generation") ? 
    await query.fetchPokemonByGeneration(params.id) : 
    await query.fetchPokemonByType(params.id)
    return data
  } catch {
    throw new Response("", {
      status: 404,
      statusText: `Could not find pokemon generation or type with name: ${params.id}`,
    });
  }
}

export async function detailsLoader({params}) {
  try {
    const data = await query.fetchPokemonById(params.id)
    return data
  } catch {
    throw new Response("", {
      status: 404,
      statusText: `Could not find pokemon with name: ${params.id}`,
    });
  }

}
