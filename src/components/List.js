import React from "react";

import { uppercaseFirstLetter } from "../helpers";

function List({ pokemon, handleSelectedPokemon }) {
  const [ownedPokemons, setOwnedPokemons] = React.useState(() =>
    JSON.parse(localStorage.getItem("ownedPokemons"))
  );

  return (
    <li
      className="pokemon-list"
      onClick={(e) => handleSelectedPokemon(e, pokemon, true)}
    >
      <div className="pokemon-list__name">{pokemon.name}</div>
      <div className="pokemon-list__details">
        Owned:{" "}
        {ownedPokemons
          ? ownedPokemons.filter(
              (ownedPokemon) => ownedPokemon.name === pokemon.name
            ).length
          : 0}
      </div>
    </li>
  );
}

export default List;
