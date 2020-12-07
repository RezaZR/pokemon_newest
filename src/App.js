import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import { BASE_URI as uri } from "./config";

import HomePage from "./pages/Home";
import DetailsPokemonPage from "./pages/DetailsPokemon";
import MyPokemonPage from "./pages/MyPokemon";
import ErrorPage from "./pages/Error";

import "./App.css";

function App({ children }) {
  const client = new ApolloClient({
    uri,
  });

  return (
    <ApolloProvider client={client}>
      <main>{children}</main>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route
            path="/pokemon_details/:name"
            exact
            component={DetailsPokemonPage}
          />
          <Route path="/my_pokemon" exact component={MyPokemonPage} />
          <Route path="/" component={ErrorPage} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
