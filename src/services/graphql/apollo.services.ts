import ApolloClient from "apollo-boost";
import {apolloClient} from "../../utils/apollo";

export class ApolloServices {
  protected apollo: ApolloClient<any>;

  constructor() {
    this.apollo = apolloClient;
  }
}
