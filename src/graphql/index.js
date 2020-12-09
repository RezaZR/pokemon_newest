import gql from "graphql-tag";

const GET_POKEMONS_LIST = gql`
  query Pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      results {
        name
        image
      }
    }
  }
`;

const GET_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      abilities {
        ability {
          name
        }
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
    }
  }
`;

export { GET_POKEMONS_LIST, GET_POKEMON };
