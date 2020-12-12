import React from "react";

function List({ pokemon, handleSelectedPokemon, contentFor }) {
  const [ownedPokemons, setOwnedPokemons] = React.useState(() =>
    JSON.parse(localStorage.getItem("ownedPokemons"))
  );

  return (
    <>
      {contentFor === "home" ? (
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
      ) : (
        <li className="pokemon-list">
          <div className="pokemon-list__name">{pokemon.nickName}</div>
          <div className="pokemon-list__details">{pokemon.name}</div>
        </li>
      )}
    </>
  );
}

export default List;
