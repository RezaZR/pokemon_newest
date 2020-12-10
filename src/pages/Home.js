import React from "react";

import { useQuery } from "@apollo/react-hooks";

import { GET_POKEMONS_LIST } from "../graphql";
import { uppercaseFirstLetter, addOrRemoveClass } from "../helpers";

import ListComponent from "../components/List";

import ErrorPage from "./Error";

import ContainerComponent from "../components/Container";
import SkeletonComponent from "../components/Skeleton";
import CaseComponent from "../components/Case";
import ScreenComponent from "../components/Screen";

function Home({ history }) {
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

  function handleClickPokemon(e, pokemon) {
    e.preventDefault();
    // remove class active from last selected pokemon
    if (activePokemon.hasOwnProperty("lastTarget")) {
      addOrRemoveClass(activePokemon.lastTarget, "remove", "active");
    }
    // then add class active to newly selected pokemon
    addOrRemoveClass(e.target, "add", "active");

    setActivePokemon({ lastTarget: e.target, pokemon });
  }

  function handleClickPagination(e, direction) {
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

  function goToSelectedPokemon(e) {
    e.preventDefault();

    history.push({
      pathname: `/pokemon_details/${activePokemon.pokemon.name}`,
      state: activePokemon.pokemon.image,
    });
  }

  return (
    <>
      {pokemons && (
        <ContainerComponent>
          <SkeletonComponent>
            <CaseComponent>
              <ScreenComponent className="normal-screen hide-scrollbar">
                <aside className="image-container">
                  {Object.keys(activePokemon).length !== 0 && (
                    <img
                      src={activePokemon.pokemon.image}
                      alt={uppercaseFirstLetter(activePokemon.pokemon.name)}
                      title={`${uppercaseFirstLetter(
                        activePokemon.pokemon.name
                      )}'s image`}
                    />
                  )}
                </aside>
                <ul className="content-container hide-scrollbar">
                  {pokemons.results &&
                    pokemons.results
                      .slice(0, 10)
                      .map((pokemon) => (
                        <ListComponent
                          key={pokemon.name}
                          pokemon={pokemon}
                          handleClickPokemon={handleClickPokemon}
                        />
                      ))}
                </ul>
              </ScreenComponent>
            </CaseComponent>
            <button
              onClick={(e) => handleClickPagination(e, "prev")}
              disabled={!pokemons.previous}
            >
              Prev
            </button>
            <button
              onClick={(e) => handleClickPagination(e, "next")}
              disabled={!pokemons.next}
            >
              Next
            </button>
            <button onClick={goToSelectedPokemon}>Select</button>
          </SkeletonComponent>
        </ContainerComponent>
      )}
    </>
  );
}

export default Home;
