import React from "react";

import { useQuery } from "@apollo/react-hooks";

import { GET_POKEMON } from "../graphql";
import { uppercaseFirstLetter } from "../helpers";

import ErrorPage from "./Error";

import ContainerComponent from "../components/Container";
import SkeletonComponent from "../components/Skeleton";
import CaseComponent from "../components/Case";
import ScreenComponent from "../components/Screen";

import PokemonAsset from "../components/assets/Pokemon";

function PokemonDetails({ match, location }) {
  const [catchStatus, setCatchStatus] = React.useState(null);

  const { loading, error, data: { pokemon = {} } = {} } = useQuery(
    GET_POKEMON,
    {
      variables: { name: match.params.name },
    }
  );

  if (error) return <ErrorPage />;

  function catchPokemon(e) {
    e.preventDefault();

    const result = Math.random();
    if (result >= 0.5) {
      setCatchStatus("catched");
      // access localStorage and parse the existing owned pokemons
      const ownedPokemons = localStorage.getItem("ownedPokemons");
      const ownedPokemonsParsed = JSON.parse(ownedPokemons);
      // set the catched pokemon's info
      const catchedPokemon = {
        name: pokemon.name,
        nickName: "yep",
      };
      // update the pokemons
      let ownedPokemonsUpdated = [];
      if (ownedPokemonsParsed) {
        ownedPokemonsUpdated = [...ownedPokemonsParsed];
      }
      ownedPokemonsUpdated.push(catchedPokemon);
      localStorage.setItem(
        "ownedPokemons",
        JSON.stringify(ownedPokemonsUpdated)
      );
    } else {
      setCatchStatus("missed");
    }
  }

  return (
    <>
      {Object.keys(pokemon).length !== 0 && (
        <ContainerComponent>
          <SkeletonComponent>
            <CaseComponent>
              <ScreenComponent className="normal-screen hide-scrollbar">
                <aside className="image-container">
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
                    <PokemonAsset
                      title="Catch!"
                      desc="Button to catch pokemon"
                    />
                  </button>
                  {catchStatus}
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
              </ScreenComponent>
            </CaseComponent>
          </SkeletonComponent>
        </ContainerComponent>
      )}
    </>
  );
}

export default PokemonDetails;
