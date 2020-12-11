import React from "react";

import { useQuery } from "@apollo/react-hooks";

import { GET_POKEMONS_LIST } from "../graphql";
import {
  uppercaseFirstLetter,
  addOrRemoveClass,
  setScrollPosition,
} from "../helpers";

import ListComponent from "../components/List";

import ErrorPage from "./Error";

import ContainerComponent from "../components/Container";
import SkeletonComponent from "../components/Skeleton";
import CaseComponent from "../components/Case";
import ScreenComponent from "../components/Screen";

function Home({ history }) {
  const [limit, setLimit] = React.useState(10);
  const [offset, setOffset] = React.useState(1);
  const [selectedPokemon, setSelectedPokemon] = React.useState({});

  const { loading, error, data: { pokemons = [] } = {}, fetchMore } = useQuery(
    GET_POKEMONS_LIST,
    {
      variables: { limit, offset },
    }
  );

  // if (loading) return "Loading...";
  if (error) return <ErrorPage />;

  function handleSelectedPokemon(e, pokemon, isSynthetic) {
    // check if it was coming from synthetic based event
    if (isSynthetic) {
      e.preventDefault();
    }
    const target = isSynthetic ? e.target : e;
    // remove class active from last selected pokemon
    if (selectedPokemon.hasOwnProperty("lastTarget")) {
      addOrRemoveClass(selectedPokemon.lastTarget, "remove", "active");
    }
    // then add class active to newly selected pokemon
    addOrRemoveClass(target, "add", "active");

    setSelectedPokemon({ lastTarget: target, pokemon });
  }

  function handleClickPagination(e, direction) {
    e.preventDefault();
    setSelectedPokemon({});
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

  function handleClickNavigation(e, direction) {
    e.preventDefault();
    let index = null;
    const targetParent = document.querySelector("#Pokemon-List");
    let target = null;
    if (direction === "top") {
      // if the user haven't selected a pokemon,
      // else if the user already selected a pokemon
      if (Object.keys(selectedPokemon).length === 0) {
        index = pokemons.results.length - 2;
        target = targetParent.children[index];
      } else {
        for (let i = 0; i < targetParent.children.length; i++) {
          if (targetParent.children[i].classList.contains("active")) {
            index = i === 0 ? targetParent.children.length - 1 : i - 1;
            target = targetParent.children[index];
          }
        }
      }
    } else if (direction === "bottom") {
      if (Object.keys(selectedPokemon).length === 0) {
        index = 0;
        target = targetParent.children[index];
      } else {
        for (let i = 0; i < targetParent.children.length; i++) {
          if (targetParent.children[i].classList.contains("active")) {
            index = i === pokemons.results.length - 2 ? 0 : i + 1;
            target = targetParent.children[index];
          }
        }
      }
    }
    // set the scroll position to the selected target's offset position,
    // minus 32 because we have to adjust the offset according to the
    // padding top and bottom that being placed which is 1rem + 1rem = 32px
    setScrollPosition(targetParent, target.offsetTop - 32);
    handleSelectedPokemon(target, pokemons.results[index], false);
  }

  function goBack(e) {
    e.preventDefault();

    history.goBack();
  }

  function goToSelectedPokemon(e) {
    e.preventDefault();

    history.push({
      pathname: `/pokemon_details/${selectedPokemon.pokemon.name}`,
      state: selectedPokemon.pokemon.image,
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
                  {Object.keys(selectedPokemon).length !== 0 && (
                    <img
                      src={selectedPokemon.pokemon.image}
                      alt={uppercaseFirstLetter(selectedPokemon.pokemon.name)}
                      title={`${uppercaseFirstLetter(
                        selectedPokemon.pokemon.name
                      )}'s image`}
                    />
                  )}
                </aside>
                <ul
                  className="content-container hide-scrollbar"
                  id="Pokemon-List"
                >
                  {pokemons.results &&
                    pokemons.results
                      .slice(0, 10)
                      .map((pokemon, index) => (
                        <ListComponent
                          key={pokemon.name}
                          pokemon={pokemon}
                          handleSelectedPokemon={handleSelectedPokemon}
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
            <button onClick={(e) => handleClickNavigation(e, "top")}>
              Top
            </button>
            <button onClick={(e) => handleClickNavigation(e, "bottom")}>
              Bottom
            </button>
            <button onClick={goBack}>Back</button>
            <button onClick={goToSelectedPokemon}>Select</button>
          </SkeletonComponent>
        </ContainerComponent>
      )}
    </>
  );
}

export default Home;
