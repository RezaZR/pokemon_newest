import React from "react";

import { uppercaseFirstLetter } from "../helpers";

function List({ pokemon, handleClickPokemon }) {
  const [ownedPokemons, setOwnedPokemons] = React.useState(() =>
    JSON.parse(localStorage.getItem("ownedPokemon"))
  );

  return (
    <li onClick={(e) => handleClickPokemon(e, pokemon)}>
      <div className="list-name">{uppercaseFirstLetter(pokemon.name)}</div>
      <div className="list-details">
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
