import React from "react";

import {
  uppercaseFirstLetter,
  addOrRemoveClass,
  setScrollPosition,
} from "../helpers";

import ListComponent from "../components/List";
import ContainerComponent from "../components/Container";
import SkeletonComponent from "../components/Skeleton";
import CaseComponent from "../components/Case";
import ScreenComponent from "../components/Screen";
import NavigationComponent from "../components/Navigation";
import ModalComponent from "../components/Modal";

function MyPokemon({ history }) {
  const [ownedPokemons, setOwnedPokemons] = React.useState(() =>
    JSON.parse(localStorage.getItem("ownedPokemons"))
  );
  const [selectedPokemon, setSelectedPokemon] = React.useState({});

  function releasePokemon(pokemon) {
    // clear the current selected pokemon
    addOrRemoveClass(selectedPokemon.lastTarget, "remove", "active");
    setSelectedPokemon({});

    const index = ownedPokemons.indexOf(pokemon);
    if (index > -1) {
      ownedPokemons.splice(index, 1);
      setOwnedPokemons(ownedPokemons);
    }
    try {
      localStorage.setItem("ownedPokemons", JSON.stringify(ownedPokemons));
    } catch (e) {
      console.error(e);
    }
  }

  function openCloseModal(e, pokemon, condition, isPickedYes) {
    console.log("ahoy", e);
    if (e) {
      e.preventDefault();
    }
    const modalElement = document.querySelector("#Modal");
    if (condition === "open") {
      addOrRemoveClass(modalElement, "add", "active");
    } else if (condition === "close") {
      addOrRemoveClass(modalElement, "remove", "active");
      // if the user pick "Yes", then release the pokemon
      if (isPickedYes) {
        releasePokemon(pokemon);
      }
    }
  }

  function handleSelectedPokemon(e, pokemon, isSynthetic, isOpenTheModal) {
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
    // if true, open the modal dialogue
    if (isOpenTheModal) {
      openCloseModal(null, null, "open", null);
    }

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
    setScrollPosition(targetParent, target.offsetTop - 73);
    handleSelectedPokemon(target, ownedPokemons[index], false, false);
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
                        handleSelectedPokemon={handleSelectedPokemon}
                        contentFor="mypokemon"
                      />
                    ))}
                </ul>
                <ModalComponent id="Modal">
                  {Object.keys(selectedPokemon).length !== 0 && (
                    <div className="options">
                      <p>
                        You will delete{" "}
                        {uppercaseFirstLetter(selectedPokemon.pokemon.nickName)}{" "}
                        the {uppercaseFirstLetter(selectedPokemon.pokemon.name)}
                        . Are you sure?
                      </p>
                      <button
                        onClick={(e) => openCloseModal(e, null, "close", false)}
                      >
                        No
                      </button>
                      <button
                        onClick={(e) =>
                          openCloseModal(
                            e,
                            selectedPokemon.pokemon,
                            "close",
                            true
                          )
                        }
                      >
                        Yes
                      </button>
                    </div>
                  )}
                </ModalComponent>
              </ScreenComponent>
            </CaseComponent>
            <NavigationComponent
              handleClickNavigation={handleClickNavigation}
              goBack={goBack}
              goToSelectedPokemon={(e) => openCloseModal(e, null, "open", null)}
            />
          </SkeletonComponent>
        </ContainerComponent>
      )}
    </>
  );
}

export default MyPokemon;
