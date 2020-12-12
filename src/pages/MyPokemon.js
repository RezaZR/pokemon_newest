import React from "react";

import ListComponent from "../components/List";

import ErrorPage from "./Error";

import ContainerComponent from "../components/Container";
import SkeletonComponent from "../components/Skeleton";
import CaseComponent from "../components/Case";
import ScreenComponent from "../components/Screen";
import NavigationComponent from "../components/Navigation";

function MyPokemon() {
  const [ownedPokemons, setOwnedPokemons] = React.useState(() =>
    JSON.parse(localStorage.getItem("ownedPokemons"))
  );

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
          </SkeletonComponent>
        </ContainerComponent>
      )}
    </>
  );
}

export default MyPokemon;
