import {CrudServices} from "./core/crud.service";
import {IGateway} from "../interface/dto/gateway/IGateway";
import {IGatewayInput} from "../interface/dto/gateway/IGatewayInput";
import {IGatewayUpdate} from "../interface/dto/gateway/IGatewayUpdate";
import {GatewayGraphqlServices, GatewayResolverMethods} from "./graphql/modules/gateway.graphql.service";
import {IPaginateResponse} from "../interface/dto/IPaginateResponse";
import {IQueryType} from "../interface/services/IGraphQlServices";

export class GatewayServices extends CrudServices<
  IGateway,
  IGatewayInput,
  IGatewayUpdate
  > {
  constructor() {
    super(new GatewayGraphqlServices());
  }
  async filter(
    filter: any,
    skip: number,
    limit: number
  ): Promise<IPaginateResponse<IGateway>> {
    const util: IQueryType = this._graphqlServices.resolveQuery(
      GatewayResolverMethods.FILTER_GATEWAYS
    );
    const { data } = await this.apollo.query({
      query: util.body,
      variables: {
        filter,
        skip,
        limit
      },
      fetchPolicy: "no-cache"
    });
    return data[util.name];
  }
}
