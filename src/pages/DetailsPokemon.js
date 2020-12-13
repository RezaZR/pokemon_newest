import React from "react";

import { useQuery } from "@apollo/react-hooks";

import { GET_POKEMON } from "../graphql";
import { uppercaseFirstLetter, addOrRemoveClass } from "../helpers";

import ErrorPage from "./Error";

import ContainerComponent from "../components/Container";
import SkeletonComponent from "../components/Skeleton";
import CaseComponent from "../components/Case";
import ScreenComponent from "../components/Screen";
import NavigationComponent from "../components/Navigation";
import ModalComponent from "../components/Modal";

function PokemonDetails({ match, location, history }) {
  const [catchStatus, setCatchStatus] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [targetParent, setTargetParent] = React.useState(null);
  const [target, setTarget] = React.useState(null);
  const [isModalActive, setIsModalActive] = React.useState(false);

  const nickNameRef = React.useRef(null);

  const { loading, error, data: { pokemon = {} } = {} } = useQuery(
    GET_POKEMON,
    {
      variables: { name: match.params.name },
    }
  );

  if (error) return <ErrorPage />;

  function catchPokemon(e) {
    e.preventDefault();
    if (!targetParent) {
      // we need to store id, targetParent and target before go through the next step
      const idLocal = "#Catch";
      const targetParentLocal = document.querySelector(idLocal);
      const targetLocal = targetParentLocal.children[1];
      addOrRemoveClass(targetLocal, "add", "active");
      // set them to the state
      setId(idLocal);
      setTargetParent(targetParentLocal);
      setTarget(targetLocal);
      // immediately remove the active class
      addOrRemoveClass(targetLocal, "remove", "active");
    }

    const result = Math.random();
    let status = "";
    if (result >= 0.5) {
      status = "catched";
    } else {
      status = "missed";
    }
    setCatchStatus(status);
    // clear the last target then open the modal
    if (targetParent) {
      addOrRemoveClass(target, "remove", "active");
    }
    setId(null);
    setTargetParent(null);
    setTarget(null);
    openCloseModal(e, "open", status);
  }

  function savePokemon() {
    // access localStorage and parse the existing owned pokemons
    const ownedPokemons = localStorage.getItem("ownedPokemons");
    let ownedPokemonsParsed;
    try {
      ownedPokemonsParsed = JSON.parse(ownedPokemons);
    } catch (e) {
      console.error(e);
    }
    // set the catched pokemon's info
    const catchedPokemon = {
      name: pokemon.name,
      nickName: nickNameRef.current.value,
    };
    nickNameRef.current.value = "";
    // update the pokemons
    let ownedPokemonsUpdated = [];
    if (ownedPokemonsParsed) {
      ownedPokemonsUpdated = [...ownedPokemonsParsed];
    }
    ownedPokemonsUpdated.push(catchedPokemon);
    try {
      localStorage.setItem(
        "ownedPokemons",
        JSON.stringify(ownedPokemonsUpdated)
      );
    } catch (e) {
      console.error(e);
    }
  }

  async function openCloseModal(e, condition, status) {
    e.preventDefault();
    const modalElement = document.querySelector("#Modal");
    if (condition === "open") {
      addOrRemoveClass(modalElement, "add", "active");
      setIsModalActive(true);
      // target to modal button ok or input nickname
      const idLocal = "#Modal";
      const targetParentLocal = await document.querySelector(idLocal);
      const targetLocal =
        status === "catched"
          ? targetParentLocal.children[0].children[1].children[0]
          : targetParentLocal.children[0].children[1];
      addOrRemoveClass(targetLocal, "add", "active");
      setId(idLocal);
      setTargetParent(targetParentLocal);
      setTarget(targetLocal);
      if (status === "catched") {
        // focus on the input tag
        nickNameRef.current.focus();
      }
    } else if (condition === "close") {
      addOrRemoveClass(modalElement, "remove", "active");
      setIsModalActive(false);
      // clear the last target
      setId(null);
      setTargetParent(null);
      setTarget(null);
    }
  }

  function handleClickNavigation(e, direction) {
    e.preventDefault();
    let index = null;
    let idLocal = null;
    let targetParentLocal = null;
    let targetLocal = null;
    // if navigation been operated, do it based on direction
    // else whichever the direction is, just focus on Catch Button
    if (targetParent) {
      if (direction === "top" || direction === "bottom") {
        // if id is #Catch then select the My Pokemon Page
        // else if id is #Header nav ul
        if (id === "#Catch") {
          addOrRemoveClass(target, "remove", "active");
          index = direction === "top" ? 1 : 0;
          idLocal = "#Header nav ul";
          targetParentLocal = document.querySelector(idLocal);
          targetLocal = targetParentLocal.children[index];
          addOrRemoveClass(targetLocal, "add", "active");
          // set them to the state
          setId(idLocal);
          setTargetParent(targetParentLocal);
          setTarget(targetLocal);
        } else if (id === "#Header nav ul") {
          // first check which index is the current active children
          // if index is 0, then we go to the Catch Button
          // else if index is 1, then we go to its sibling element
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
          } else if (
            (direction === "top" && index === 0) ||
            (direction === "bottom" && index === 1)
          ) {
            idLocal = "#Catch";
            targetParentLocal = document.querySelector(idLocal);
            targetLocal = targetParentLocal.children[1];
            addOrRemoveClass(targetLocal, "add", "active");
            // set them to the state
            setId(idLocal);
            setTargetParent(targetParentLocal);
            setTarget(targetLocal);
          }
        } else if (id === "#Modal") {
          for (
            let i = 0;
            i < targetParent.children[0].children[1].children.length;
            i++
          ) {
            if (
              targetParent.children[0].children[1].children[
                i
              ].classList.contains("active")
            ) {
              index = i;
              break;
            }
          }
          targetLocal =
            targetParent.children[0].children[1].children[index === 0 ? 1 : 0];
          addOrRemoveClass(targetLocal, "add", "active");
          // set them to the state
          setTarget(targetLocal);
        }
      }
    } else {
      index = 1;
      idLocal = "#Catch";
      targetParentLocal = document.querySelector(idLocal);
      targetLocal = targetParentLocal.children[index];
      addOrRemoveClass(targetLocal, "add", "active");
      // set them to the state
      setId(idLocal);
      setTargetParent(targetParentLocal);
      setTarget(targetLocal);
    }
  }

  function goBack(e) {
    e.preventDefault();

    history.goBack();
  }

  function handleSelectButton(e) {
    e.preventDefault();
    if (id === "#Catch") {
      catchPokemon(e);
    } else if (id === "#Header nav ul") {
      target.children[0].click();
    } else if (id === "#Modal") {
      target.click();
    }
  }

  function handleSubmitNickName(e) {
    e.preventDefault();
    savePokemon();
    openCloseModal(e, "close");
  }

  return (
    <>
      {Object.keys(pokemon).length !== 0 && (
        <ContainerComponent>
          <SkeletonComponent>
            <CaseComponent>
              <ScreenComponent
                className="hide-scrollbar"
                childClasses="normal-screen"
              >
                <aside className="image-container" id="Catch">
                  <img
                    src={location.state}
                    alt={uppercaseFirstLetter(pokemon.name)}
                    title={`${uppercaseFirstLetter(pokemon.name)}'s image`}
                  />
                  <button
                    className="button-transparent button-catch"
                    onClick={catchPokemon}
                    title="Catch!"
                  >
                    Catch!
                  </button>
                </aside>
                <div className="content-container hide-scrollbar">
                  <section className="sectioned-blocks">
                    <p className="sectioned-blocks__title">Name:</p>
                    <h1 className="sectioned-blocks__content">
                      {pokemon.name}
                    </h1>
                  </section>
                  <section className="sectioned-blocks">
                    <p className="sectioned-blocks__title">Types:</p>
                    {pokemon.types && (
                      <ul className="sectioned-blocks__content">
                        {pokemon.types.map(({ type }) => (
                          <li key={type.name}>{type.name}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                  <section className="sectioned-blocks">
                    <p className="sectioned-blocks__title">Moves:</p>
                    {pokemon.moves && (
                      <ul className="sectioned-blocks__content">
                        {pokemon.moves.map(({ move }) => (
                          <li key={move.name}>{move.name}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                </div>
                <ModalComponent id="Modal">
                  {isModalActive &&
                    (catchStatus === "missed" ? (
                      <div className="options">
                        <p>You missed</p>
                        <button onClick={(e) => openCloseModal(e, "close")}>
                          Ok
                        </button>
                      </div>
                    ) : (
                      <div className="options">
                        <p>You catch em!</p>
                        <form onSubmit={handleSubmitNickName}>
                          <input
                            type="text"
                            required={true}
                            name="nickName"
                            id="nickName"
                            ref={nickNameRef}
                          />
                          <button>Ok</button>
                        </form>
                      </div>
                    ))}
                </ModalComponent>
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

export default PokemonDetails;
