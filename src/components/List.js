import { uppercaseFirstLetter } from "../helpers";

function List({ pokemon, handleClickedPokemon }) {
  return (
    <li onClick={(e) => handleClickedPokemon(e, pokemon)}>
      {uppercaseFirstLetter(pokemon.name)}
    </li>
  );
}

export default List;
