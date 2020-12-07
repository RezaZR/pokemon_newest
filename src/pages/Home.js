import React from "react";

import { useQuery } from "@apollo/react-hooks";

import { GET_POKEMONS_LIST } from "../graphql";

import ListComponent from "../components/List";

function Home() {
  const [limit, setLimit] = React.useState(9);
  const [offset, setOffset] = React.useState(1);

  const { data: { pokemons = [] } = {} } = useQuery(GET_POKEMONS_LIST, {
    variables: { limit, offset },
  });
  console.log(pokemons);

  return (
    <section>
      {pokemons &&
        pokemons.results &&
        pokemons.results.map((pokemon) => (
          <ListComponent key={pokemon.name} pokemon={pokemon} />
        ))}
    </section>
  );
}

export default Home;
