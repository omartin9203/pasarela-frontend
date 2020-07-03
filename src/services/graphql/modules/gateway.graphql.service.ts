import { graphql as typesGraphql} from "../../../graphql/index"
import {CrudMethod, IGraphQlServices, IQueryType, QueryType} from "../../../interface/services/IGraphQlServices";

export enum GatewayResolverMethods {
  FILTER_GATEWAYS = "filterGateways"
}

export class GatewayGraphqlServices implements IGraphQlServices {
  getQuery(method: CrudMethod): IQueryType {
    switch (method) {
      case CrudMethod.GET_ONE:
        return {
          type: QueryType.QUERY,
          name: "getGateway",
          body: typesGraphql.queries.gateway.GET_GATEWAY
        };
      case CrudMethod.CREATE:
        return {
          type: QueryType.MUTATION,
          name: "createGateway",
          body: typesGraphql.mutations.gateway.CREATE_GATEWAY
        };
      case CrudMethod.UPDATE:
        return {
          type: QueryType.MUTATION,
          name: "updateGateway",
          body: typesGraphql.mutations.gateway.UPDATE_GATEWAY
        };
      case CrudMethod.DELETE:
        return {
          type: QueryType.MUTATION,
          name: "deleteGateway",
          body: typesGraphql.mutations.gateway.DELETE_GATEWAY
        };
      default:
        return {
          type: QueryType.QUERY,
          name: "getGateways",
          body: typesGraphql.queries.gateway.GET_GATEWAYS
        };
    }
  }

  resolveQuery(resolver: GatewayResolverMethods) {
    switch (resolver) {
      // case ResolverMethods.FILTER_GATEWAYS: return {
      //     type: QueryType.QUERY,
      //     name: 'deleteGateway',
      //     body: typesGraphql.queries.gateway.FILTER_GATEWAYS,
      // };
      default:
        return {
          type: QueryType.QUERY,
          name: GatewayResolverMethods.FILTER_GATEWAYS,
          body: typesGraphql.queries.gateway.FILTER_GATEWAYS
        };
    }
  }
}
