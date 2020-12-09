import React from "react";

import { useQuery } from "@apollo/react-hooks";

import { GET_POKEMONS_LIST } from "../graphql";
import { uppercaseFirstLetter, addOrRemoveClass } from "../helpers";

import ListComponent from "../components/List";

import ErrorPage from "./Error";

import styled from "@emotion/styled";

import ContainerComponent from "../components/Container";
import SkeletonComponent from "../components/Skeleton";
import ScreenComponent from "../components/Screen";

function Home() {
  const [limit, setLimit] = React.useState(10);
  const [offset, setOffset] = React.useState(1);
  const [activePokemon, setActivePokemon] = React.useState({});

  const { loading, error, data: { pokemons = [] } = {}, fetchMore } = useQuery(
    GET_POKEMONS_LIST,
    {
      variables: { limit, offset },
    }
  );

  // if (loading) return "Loading...";
  if (error) return <ErrorPage />;

  function handleClickedPokemon(e, pokemon) {
    e.preventDefault();
    // remove class active from last selected pokemon
    if (activePokemon.hasOwnProperty("lastTarget")) {
      addOrRemoveClass(activePokemon.lastTarget, "remove", "active");
    }
    // then add class active to newly selected pokemon
    addOrRemoveClass(e.target, "add", "active");

    setActivePokemon({ lastTarget: e.target, pokemon });
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
        <ContainerComponent>
          <SkeletonComponent>
            <ScreenComponent>
              <div className="layer hide-scrollbar">
                {Object.keys(activePokemon).length === 0 ? (
                  <div className="empty"></div>
                ) : (
                  <img
                    src={activePokemon.pokemon.image}
                    alt={uppercaseFirstLetter(activePokemon.pokemon.name)}
                    title={`${uppercaseFirstLetter(
                      activePokemon.pokemon.name
                    )}'s image`}
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
              </div>
            </ScreenComponent>
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
            <button>Select</button>
          </SkeletonComponent>
        </ContainerComponent>
      )}
    </>
  );
}

export default Home;
