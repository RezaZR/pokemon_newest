import React from "react";

import { useQuery } from "@apollo/react-hooks";

import { GET_POKEMONS_LIST } from "../graphql";
import {
  uppercaseFirstLetter,
  addOrRemoveClass,
  setScrollPosition,
} from "../helpers";

import ErrorPage from "./Error";

import ListComponent from "../components/List";
import ContainerComponent from "../components/Container";
import SkeletonComponent from "../components/Skeleton";
import CaseComponent from "../components/Case";
import ScreenComponent from "../components/Screen";
import NavigationComponent from "../components/Navigation";

import LoadingAsset from "../components/assets/Loading";

function Home({ history }) {
  const [limit, setLimit] = React.useState(10);
  const [offset, setOffset] = React.useState(1);
  const [selectedPokemon, setSelectedPokemon] = React.useState({});
  const [id, setId] = React.useState(null);
  const [targetParent, setTargetParent] = React.useState(null);
  const [target, setTarget] = React.useState(null);

  const { loading, error, data: { pokemons = [] } = {}, fetchMore } = useQuery(
    GET_POKEMONS_LIST,
    {
      variables: { limit, offset },
    }
  );

  if (error) return <ErrorPage />;

  function handleSelectedPokemon(e, pokemon, isSynthetic) {
    // check if it was coming from synthetic based event
    if (isSynthetic) {
      e.preventDefault();
      const idLocal = "#Pokemon-List";
      const targetParentLocal = document.querySelector(idLocal);
      const targetLocal = e.target;
      setId(idLocal);
      setTargetParent(targetParentLocal);
      setTarget(targetLocal);
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

  function handlePagination(e, direction) {
    e.preventDefault();
    setSelectedPokemon({});
    if (direction === "left" && offset > 0) {
      if (offset - limit < 1) {
        setOffset(1);
      } else {
        setOffset(offset - limit);
      }
    } else if (direction === "right" && offset < pokemons.count) {
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
    let idLocal = null;
    let targetParentLocal = null;
    let targetLocal = null;
    // if navigation been operated, do it based on direction
    // else if haven't been operated, check the direction is it vertical or horizontal
    if (targetParent) {
      if (direction === "top" || direction === "bottom") {
        if (id === "#Pokemon-List") {
          for (let i = 0; i < targetParent.children.length; i++) {
            if (targetParent.children[i].classList.contains("active")) {
              index = direction === "top" ? i - 1 : i + 1;
              break;
            }
          }
          addOrRemoveClass(target, "remove", "active");
          if (index === -1 || index === pokemons.results.length - 1) {
            setSelectedPokemon({});
            idLocal = "#Header nav ul";
            targetParentLocal = document.querySelector(idLocal);
            targetLocal =
              targetParentLocal.children[direction === "top" ? 1 : 0];
            addOrRemoveClass(targetLocal, "add", "active");
            // set them to the state
            setId(idLocal);
            setTargetParent(targetParentLocal);
            setTarget(targetLocal);
          } else {
            targetLocal = targetParent.children[index];
            addOrRemoveClass(targetLocal, "add", "active");
            // set them to the state
            setTarget(targetLocal);
            handleSelectedPokemon(targetLocal, pokemons.results[index], false);
          }
          // set the scroll position to the selected target's offset position
          setScrollPosition(targetParent, targetLocal.offsetTop - 73);
        } else if (id === "#Header nav ul") {
          for (let i = 0; i < targetParent.children.length; i++) {
            if (targetParent.children[i].classList.contains("active")) {
              index = i;
              break;
            }
          }
          addOrRemoveClass(target, "remove", "active");
          if (
            (direction === "top" && index === 1) ||
            (direction === "bottom" && index === 0)
          ) {
            targetLocal =
              targetParent.children[
                direction === "top" ? index - 1 : index + 1
              ];
            addOrRemoveClass(targetLocal, "add", "active");
            // set them to the state
            setTarget(targetLocal);

            // set the scroll position to the selected target's offset position
            setScrollPosition(targetParent, targetLocal.offsetTop - 73);
          } else if (
            (direction === "top" && index === 0) ||
            (direction === "bottom" && index === 1)
          ) {
            idLocal = "#Pokemon-List";
            targetParentLocal = document.querySelector(idLocal);
            targetLocal =
              targetParentLocal.children[
                direction === "top" ? pokemons.results.length - 2 : 0
              ];
            addOrRemoveClass(targetLocal, "add", "active");
            // set them to the state
            setId(idLocal);
            setTargetParent(targetParentLocal);
            setTarget(targetLocal);
            // set the scroll position to the selected target's offset position
            setScrollPosition(targetParentLocal, targetLocal.offsetTop - 73);

            handleSelectedPokemon(
              targetLocal,
              pokemons.results[
                direction === "top" ? pokemons.results.length - 2 : 0
              ],
              false
            );
          }
        }
      } else if (direction === "left" || direction === "right") {
        // clear the last target
        setId(null);
        setTargetParent(null);
        setTarget(null);
        handlePagination(e, direction);
      }
    } else {
      if (direction === "top" || direction === "bottom") {
        index = 0;
        idLocal = "#Pokemon-List";
        targetParentLocal = document.querySelector(idLocal);
        targetLocal = targetParentLocal.children[index];
        addOrRemoveClass(targetLocal, "add", "active");
        // set them to the state
        setId(idLocal);
        setTargetParent(targetParentLocal);
        setTarget(targetLocal);
        // set the scroll position to the selected target's offset position
        setScrollPosition(targetParentLocal, targetLocal.offsetTop - 73);

        handleSelectedPokemon(targetLocal, pokemons.results[index], false);
      } else if (direction === "left" || direction === "right") {
        // clear the last target
        setId(null);
        setTargetParent(null);
        setTarget(null);
        handlePagination(e, direction);
      }
    }
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

  function handleSelectButton(e) {
    e.preventDefault();
    if (id === "#Pokemon-List") {
      goToSelectedPokemon(e);
    } else if (id === "#Header nav ul") {
      target.children[0].click();
    }
  }

  return (
    <>
      {pokemons && (
        <ContainerComponent>
          <SkeletonComponent>
            <CaseComponent>
              <ScreenComponent
                className="hide-scrollbar"
                childClasses={loading ? "full-screen center" : "normal-screen"}
              >
                {loading ? (
                  <LoadingAsset
                    className="text-alone"
                    title="Loading"
                    desc="Loading text"
                  />
                ) : (
                  <>
                    <aside className="image-container">
                      {Object.keys(selectedPokemon).length !== 0 && (
                        <img
                          src={selectedPokemon.pokemon.image}
                          alt={uppercaseFirstLetter(
                            selectedPokemon.pokemon.name
                          )}
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
                          .map((pokemon) => (
                            <ListComponent
                              key={pokemon.name}
                              pokemon={pokemon}
                              handleSelectedPokemon={handleSelectedPokemon}
                              contentFor="home"
                            />
                          ))}
                    </ul>
                  </>
                )}
              </ScreenComponent>
            </CaseComponent>
            <NavigationComponent
              handleClickNavigation={handleClickNavigation}
              handleBackButton={goBack}
              handleSelectButton={handleSelectButton}
            />
          </SkeletonComponent>
        </ContainerComponent>
      )}
    </>
  );
}

export default Home;
