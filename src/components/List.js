import { uppercaseFirstLetter } from "../helpers";

function List({ pokemon, handleClickedPokemon }) {
  return (
    <li onClick={(e) => handleClickedPokemon(e, pokemon)}>
      <div className="list-name">{uppercaseFirstLetter(pokemon.name)}</div>
      <div className="list-details">Owned: 0</div>
    </li>
  );
}

export default List;
