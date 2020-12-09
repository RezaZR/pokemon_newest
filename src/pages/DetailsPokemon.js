import React from "react";

import { useQuery } from "@apollo/react-hooks";

import { GET_POKEMON } from "../graphql";
import { uppercaseFirstLetter } from "../helpers";

import ErrorPage from "./Error";

import ContainerComponent from "../components/Container";
import SkeletonComponent from "../components/Skeleton";
import ScreenComponent from "../components/Screen";

function PokemonDetails({ match, location }) {
  const { loading, error, data: { pokemon = {} } = {} } = useQuery(
    GET_POKEMON,
    {
      variables: { name: match.params.name },
    }
  );

  React.useEffect(() => {
    console.log(location);
  }, []);

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
              </div>
            </ScreenComponent>
          </SkeletonComponent>
        </ContainerComponent>
      )}
    </>
  );
}

export default PokemonDetails;
