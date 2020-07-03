import ApolloClient from "apollo-boost";
import { InMemoryCache } from 'apollo-cache-inmemory';
import {api} from "./constants";

export const apolloClient = new ApolloClient({
  uri: api.endpoints.graphql,
  // fetchOptions: {
  //   credentials: "include"
  // },
  // request: operation => {
  //   if (!localStorage.token) {
  //     localStorage.setItem("token", "");
  //   }
  //
  //   operation.setContext({
  //     headers: {
  //       authorization: localStorage.getItem("token")
  //         ? `Bearer ${localStorage.getItem("token")}`
  //         : ""
  //     }
  //   });
  // },
  onError: ({ graphQLErrors, networkError, forward, operation, response }) => {
    if (networkError) {
      // console.log("[networkError]", networkError);
    }

    graphQLErrors?.forEach(({message, locations, path}) =>  {
      // console.log(`[Message]: ${message}, [Location]: ${locations}, [Path]: ${path}`);
    });
    // throw new ErrorEvent(graphQLErrors?[0].message)
  },
  cache: new InMemoryCache({addTypename: false}),
});
