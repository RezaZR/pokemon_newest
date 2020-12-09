import { uppercaseFirstLetter } from "../helpers";

function List({ pokemon, handleClickPokemon }) {
  return (
    <li onClick={(e) => handleClickPokemon(e, pokemon)}>
      <div className="list-name">{uppercaseFirstLetter(pokemon.name)}</div>
      <div className="list-details">Owned: 0</div>
    </li>
  );
}

export default List;
