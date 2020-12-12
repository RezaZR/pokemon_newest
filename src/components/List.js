import React from "react";

import TrashAsset from "./assets/Trash";

import styled from "@emotion/styled";

const ListStyle = styled.li`
  border-radius: 3px;
  cursor: pointer;
  text-transform: capitalize;
  &.space-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & button {
      width: unset;
      background-color: transparent;
      & svg {
        width: 17px;
        fill: var(--color-text-1);
      }
    }
    &:hover,
    &.active {
      & button {
        & svg {
          fill: var(--color-bg-3);
        }
      }
    }
  }
  & div {
    pointer-events: none;
  }
  & .pokemon-list__name {
    font-size: 0.85rem;
    font-weight: bold;
  }
  & .pokemon-list__details {
    font-size: 0.75rem;
  }
  &:not(:last-of-type) {
    margin-bottom: 0.35rem;
  }
  &:hover,
  &.active {
    background-color: var(--color-bg-3-1);
    color: var(--color-bg-3);
  }
`;

function List({ pokemon, handleSelectedPokemon, contentFor }) {
  const [ownedPokemons, setOwnedPokemons] = React.useState(() =>
    JSON.parse(localStorage.getItem("ownedPokemons"))
  );

  return (
    <>
      {contentFor === "home" ? (
        <ListStyle onClick={(e) => handleSelectedPokemon(e, pokemon, true)}>
          <div className="pokemon-list__name">{pokemon.name}</div>
          <div className="pokemon-list__details">
            Owned:{" "}
            {ownedPokemons
              ? ownedPokemons.filter(
                  (ownedPokemon) => ownedPokemon.name === pokemon.name
                ).length
              : 0}
          </div>
        </ListStyle>
      ) : (
        <ListStyle
          className="space-between"
          onClick={(e) => handleSelectedPokemon(e, pokemon, true)}
        >
          <div>
            <div className="pokemon-list__name">{pokemon.nickName}</div>
            <div className="pokemon-list__details">{pokemon.name}</div>
          </div>
          <button>
            <TrashAsset title="Release" desc="Button to release pokemon" />
          </button>
        </ListStyle>
      )}
    </>
  );
}

export default List;
