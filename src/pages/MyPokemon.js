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

import EmptyAsset from "../components/assets/Empty";

function MyPokemon({ history }) {
  const [ownedPokemons, setOwnedPokemons] = React.useState(() =>
    JSON.parse(localStorage.getItem("ownedPokemons"))
  );
  const [selectedPokemon, setSelectedPokemon] = React.useState({});
  const [id, setId] = React.useState(null);
  const [targetParent, setTargetParent] = React.useState(null);
  const [target, setTarget] = React.useState(null);
  const [isModalActive, setIsModalActive] = React.useState(false);

  function releasePokemon(pokemon) {
    // clear the current selected pokemon
    addOrRemoveClass(selectedPokemon.lastTarget, "remove", "active");
    setSelectedPokemon({});
    setId(null);
    setTargetParent(null);
    setTarget(null);

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

  async function openCloseModal(e, pokemon, condition, isPickedYes) {
    if (e) {
      e.preventDefault();
    }
    const modalElement = document.querySelector("#Modal");
    if (condition === "open") {
      addOrRemoveClass(modalElement, "add", "active");
      setIsModalActive(true);
      // target to modal button no
      const idLocal = "#Modal";
      const targetParentLocal = await document.querySelector(idLocal);
      const targetLocal = targetParentLocal.children[0].children[1];
      addOrRemoveClass(targetLocal, "add", "active");
      setId(idLocal);
      setTargetParent(targetParentLocal);
      setTarget(targetLocal);
    } else if (condition === "close") {
      addOrRemoveClass(modalElement, "remove", "active");
      // if the user pick "Yes", then release the pokemon
      if (isPickedYes) {
        releasePokemon(pokemon);
      }
      setIsModalActive(false);
      // clear the last target
      setId(null);
      setTargetParent(null);
      setTarget(null);
    }
  }

  async function handleSelectedPokemon(
    e,
    pokemon,
    isSynthetic,
    isOpenTheModal
  ) {
    // check if it was coming from synthetic based event
    if (isSynthetic) {
      e.preventDefault();
      const idLocal = "#My-Pokemon-List";
      const targetParentLocal = document.querySelector(idLocal);
      const targetLocal = await e.target;
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
    // if true, open the modal dialogue
    if (isOpenTheModal) {
      openCloseModal(null, null, "open", null);
    }
  }

  function handleClickNavigation(e, direction) {
    e.preventDefault();
    let index = null;
    let idLocal = null;
    let targetParentLocal = null;
    let targetLocal = null;
    // if navigation been operated, do it based on direction
    // else if haven't been operated, set the first on the list to selected pokemon
    if (targetParent) {
      if ((direction === "top" || direction === "bottom") && !isModalActive) {
        if (id === "#My-Pokemon-List" && ownedPokemons.length > 0) {
          for (let i = 0; i < targetParent.children.length; i++) {
            if (targetParent.children[i].classList.contains("active")) {
              index = direction === "top" ? i - 1 : i + 1;
              break;
            }
          }
          addOrRemoveClass(target, "remove", "active");
          if (index === -1 || index === ownedPokemons.length) {
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
            handleSelectedPokemon(targetLocal, ownedPokemons[index], false);
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
            if (ownedPokemons.length > 0) {
              idLocal = "#My-Pokemon-List";
              targetParentLocal = document.querySelector(idLocal);
              targetLocal =
                targetParentLocal.children[
                  direction === "top" ? ownedPokemons.length - 1 : 0
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
                ownedPokemons[
                  direction === "top" ? ownedPokemons.length - 1 : 0
                ],
                false
              );
            } else {
              targetLocal =
                targetParent.children[
                  direction === "top" ? index + 1 : index - 1
                ];
              addOrRemoveClass(targetLocal, "add", "active");
              // set them to the state
              setTarget(targetLocal);
            }
          }
        }
      } else if (
        (direction === "left" || direction === "right") &&
        isModalActive
      ) {
        for (let i = 0; i < targetParent.children[0].children.length; i++) {
          if (
            targetParent.children[0].children[i].classList.contains("active")
          ) {
            index = i;
            break;
          }
        }
        addOrRemoveClass(target, "remove", "active");
        if (direction === "left") {
          targetLocal =
            targetParent.children[0].children[index === 1 ? 2 : index - 1];
        } else if (direction === "right") {
          targetLocal = targetParent.children[0].children[index === 1 ? 2 : 1];
        }
        addOrRemoveClass(targetLocal, "add", "active");
        // set them to the state
        setTarget(targetLocal);
      }
    } else {
      if (
        (direction === "top" || direction === "bottom") &&
        !isModalActive &&
        ownedPokemons.length > 0
      ) {
        index = 0;
        idLocal = "#My-Pokemon-List";
        targetParentLocal = document.querySelector(idLocal);
        targetLocal = targetParentLocal.children[index];
        addOrRemoveClass(targetLocal, "add", "active");
        // set them to the state
        setId(idLocal);
        setTargetParent(targetParentLocal);
        setTarget(targetLocal);
        // set the scroll position to the selected target's offset position
        setScrollPosition(targetParentLocal, targetLocal.offsetTop - 73);

        handleSelectedPokemon(targetLocal, ownedPokemons[index], false);
      } else if (ownedPokemons.length === 0) {
        idLocal = "#Header nav ul";
        targetParentLocal = document.querySelector(idLocal);
        targetLocal = targetParentLocal.children[1];
        addOrRemoveClass(targetLocal, "add", "active");
        // set them to the state
        setId(idLocal);
        setTargetParent(targetParentLocal);
        setTarget(targetLocal);
      }
    }
  }

  function goBack(e) {
    e.preventDefault();

    history.goBack();
  }

  function handleSelectButton(e) {
    e.preventDefault();
    if (isModalActive) {
      target.click();
    } else {
      if (id === "#My-Pokemon-List") {
        if (Object.keys(selectedPokemon).length !== 0) {
          addOrRemoveClass(target, "remove", "active");
          openCloseModal(e, null, "open", null);
        }
      } else if (id === "#Header nav ul") {
        target.children[0].click();
      }
    }
  }

  return (
    <>
      <ContainerComponent>
        <SkeletonComponent>
          <CaseComponent>
            <ScreenComponent
              childClasses={
                ownedPokemons.length > 0
                  ? "full-screen hide-scrollbar"
                  : "full-screen hide-scrollbar center"
              }
            >
              {ownedPokemons.length > 0 ? (
                <>
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
                          {uppercaseFirstLetter(
                            selectedPokemon.pokemon.nickName
                          )}{" "}
                          the{" "}
                          {uppercaseFirstLetter(selectedPokemon.pokemon.name)}.
                          Are you sure?
                        </p>
                        <button
                          onClick={(e) =>
                            openCloseModal(e, null, "close", false)
                          }
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
                </>
              ) : (
                <EmptyAsset
                  className="text-alone"
                  title="Empty"
                  desc="Empty text"
                />
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
    </>
  );
}

export default MyPokemon;
