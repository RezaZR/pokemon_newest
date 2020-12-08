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

export { GET_POKEMONS_LIST };
