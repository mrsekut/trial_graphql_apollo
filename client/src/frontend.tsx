import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { ApolloProvider } from "@apollo/client/react";
import { createHttpLink } from "@apollo/client/link/http";

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
  ssrMode: typeof window === 'undefined',
});

function start() {
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
