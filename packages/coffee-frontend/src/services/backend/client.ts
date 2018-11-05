import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.COFFEE_ENDPOINT }),
  cache: new InMemoryCache()
});
export default client;
