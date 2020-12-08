import React from "react";

import { useQuery } from "@apollo/react-hooks";

import { GET_POKEMONS_LIST } from "../graphql";
import { uppercaseFirstLetter } from "../helpers";

import ListComponent from "../components/List";

import ErrorPage from "./Error";

function Home() {
  const [limit, setLimit] = React.useState(10);
  const [offset, setOffset] = React.useState(1);
  const [activePokemon, setActivePokemon] = React.useState({});

  const { loading, error, data: { pokemons = [] } = {}, fetchMore } = useQuery(
    GET_POKEMONS_LIST,
    {
      variables: { limit, offset },
      // fetchPolicy: "no-cache",
      // nextFetchPolicy: "no-cache",
    }
  );

  if (loading) return "Loading...";
  if (error) return <ErrorPage />;

  function handleClickedPokemon(e, pokemon) {
    e.preventDefault();
    setActivePokemon(pokemon);
  }

  function handleClickedPagination(e, direction) {
    e.preventDefault();
    setActivePokemon({});
    if (direction === "prev" && offset > 0) {
      if (offset - limit === 0) {
        setOffset(1);
      } else {
        setOffset(offset - limit);
      }
    } else if (direction === "next" && offset < pokemons.count) {
      setOffset(offset + limit);
    }
    try {
      fetchMore({
        variables: { limit, offset },
        updateQuery: ({ fetchMoreResult }) =>
          Object.assign({}, fetchMoreResult),
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      {pokemons && (
        <section>
          {Object.keys(activePokemon).length === 0 ? (
            <p>Welcome!</p>
          ) : (
            <img
              src={activePokemon.image}
              alt={uppercaseFirstLetter(activePokemon.name)}
              title={`${uppercaseFirstLetter(activePokemon.name)}'s image`}
            />
          )}
          <ul>
            {pokemons.results &&
              pokemons.results
                .slice(0, 10)
                .map((pokemon) => (
                  <ListComponent
                    key={pokemon.name}
                    pokemon={pokemon}
                    handleClickedPokemon={handleClickedPokemon}
                  />
                ))}
          </ul>
          <button
            onClick={(e) => handleClickedPagination(e, "prev")}
            disabled={!pokemons.previous}
          >
            Prev
          </button>
          <button
            onClick={(e) => handleClickedPagination(e, "next")}
            disabled={!pokemons.next}
          >
            Next
          </button>
        </section>
      )}
    </>
  );
}

export default Home;
