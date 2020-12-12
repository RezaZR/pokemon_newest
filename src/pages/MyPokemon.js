import React from "react";

import { addOrRemoveClass, setScrollPosition } from "../helpers";

import ErrorPage from "./Error";

import ListComponent from "../components/List";
import ContainerComponent from "../components/Container";
import SkeletonComponent from "../components/Skeleton";
import CaseComponent from "../components/Case";
import ScreenComponent from "../components/Screen";
import NavigationComponent from "../components/Navigation";

function MyPokemon({ history }) {
  const [ownedPokemons, setOwnedPokemons] = React.useState(() =>
    JSON.parse(localStorage.getItem("ownedPokemons"))
  );
  const [selectedPokemon, setSelectedPokemon] = React.useState({});

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

  function handleClickNavigation(e, direction) {
    e.preventDefault();
    let index = null;
    const targetParent = document.querySelector("#My-Pokemon-List");
    let target = null;
    if (direction === "top") {
      // if the user haven't selected a pokemon,
      // else if the user already selected a pokemon
      if (Object.keys(selectedPokemon).length === 0) {
        index = ownedPokemons.length - 1;
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
            index = i === ownedPokemons.length - 1 ? 0 : i + 1;
            target = targetParent.children[index];
          }
        }
      }
    }
    // set the scroll position to the selected target's offset position
    setScrollPosition(targetParent, target.offsetTop - 77);
    handleSelectedPokemon(target, ownedPokemons[index], false);
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
      {ownedPokemons && (
        <ContainerComponent>
          <SkeletonComponent>
            <CaseComponent>
              <ScreenComponent childClasses="full-screen hide-scrollbar">
                <ul
                  className="content-container hide-scrollbar"
                  id="My-Pokemon-List"
                >
                  {ownedPokemons &&
                    ownedPokemons.map((pokemon, index) => (
                      <ListComponent
                        key={`${pokemon.name}-${index}`}
                        pokemon={pokemon}
                        contentFor="mypokemon"
                      />
                    ))}
                </ul>
              </ScreenComponent>
            </CaseComponent>
            <NavigationComponent
              handleClickNavigation={handleClickNavigation}
              goBack={goBack}
              goToSelectedPokemon={goToSelectedPokemon}
            />
          </SkeletonComponent>
        </ContainerComponent>
      )}
    </>
  );
}

export default MyPokemon;
