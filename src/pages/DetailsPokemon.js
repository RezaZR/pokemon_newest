import React from "react";

import { useQuery } from "@apollo/react-hooks";

import { GET_POKEMON } from "../graphql";
import { uppercaseFirstLetter } from "../helpers";

import ErrorPage from "./Error";

import ContainerComponent from "../components/Container";
import SkeletonComponent from "../components/Skeleton";
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

  React.useEffect(() => {}, []);

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
      console.log("p", ownedPokemons, ownedPokemonsParsed);
      let ownedPokemonsUpdated = [];
      if (ownedPokemonsParsed) {
        ownedPokemonsUpdated = [...ownedPokemonsParsed];
      }
      ownedPokemonsUpdated.push(catchedPokemon);
      console.log(ownedPokemonsUpdated);
      console.log("x");
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
            <ScreenComponent>
              <div className="layer hide-scrollbar">
                <img
                  src={location.state}
                  alt={uppercaseFirstLetter(pokemon.name)}
                  title={`${uppercaseFirstLetter(pokemon.name)}'s image`}
                />
                <p>{uppercaseFirstLetter(pokemon.name)}</p>
                {pokemon.types && (
                  <ul>
                    {pokemon.types.map(({ type }) => (
                      <li key={type.name}>{type.name}</li>
                    ))}
                  </ul>
                )}
                {pokemon.abilities && (
                  <ul>
                    {pokemon.abilities.map(({ ability }) => (
                      <li key={ability.name}>{ability.name}</li>
                    ))}
                  </ul>
                )}
                <button onClick={catchPokemon}>
                  <PokemonAsset title="Catch" desc="Button to catch pokemon" />
                </button>
                {catchStatus}
              </div>
            </ScreenComponent>
          </SkeletonComponent>
        </ContainerComponent>
      )}
    </>
  );
}

export default PokemonDetails;
