import { graphql as typesGraphql} from "../../../graphql/index"
import {CrudMethod, IGraphQlServices, IQueryType, QueryType} from "../../../interface/services/IGraphQlServices";

export enum DeviceResolverMethods {
  FILTER_DEVICES = "filterDevices"
}

export class DeviceGraphqlServices implements IGraphQlServices {
  getQuery(method: CrudMethod): IQueryType {
    switch (method) {
      case CrudMethod.GET_ONE:
        return {
          type: QueryType.QUERY,
          name: "getDevice",
          body: typesGraphql.queries.device.GET_DEVICE
        };
      case CrudMethod.CREATE:
        return {
          type: QueryType.MUTATION,
          name: "createDevice",
          body: typesGraphql.mutations.device.CREATE_DEVICE
        };
      case CrudMethod.UPDATE:
        return {
          type: QueryType.MUTATION,
          name: "updateDevice",
          body: typesGraphql.mutations.device.UPDATE_DEVICE
        };
      case CrudMethod.DELETE:
        return {
          type: QueryType.MUTATION,
          name: "deleteDevice",
          body: typesGraphql.mutations.device.DELETE_DEVICE
        };
      default:
        return {
          type: QueryType.QUERY,
          name: "getDevices",
          body: typesGraphql.queries.device.GET_DEVICES
        };
    }
  }

  resolveQuery(resolver: DeviceResolverMethods) {
    switch (resolver) {
      // case ResolverMethods.FILTER_DEVICES: return {
      //     type: QueryType.QUERY,
      //     name: 'deleteDevice',
      //     body: typesGraphql.queries.device.FILTER_DEVICES,
      // };
      default:
        return {
          type: QueryType.QUERY,
          name: DeviceResolverMethods.FILTER_DEVICES,
          body: typesGraphql.queries.device.FILTER_DEVICES
        };
    }
  }
}
