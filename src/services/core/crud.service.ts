import { ApolloServices } from "../graphql/apollo.services";
import { ApolloQueryResult } from "apollo-boost";
import {ICrudServices} from "../../interface/services/ICrudServices";
import {CrudMethod, IGraphQlServices, IQueryType} from "../../interface/services/IGraphQlServices";
import {IPaginateResponse} from "../../interface/dto/IPaginateResponse";

export class CrudServices<Titem, Tinput, Tupdate> extends ApolloServices
  implements ICrudServices<Titem, Tinput, Tupdate> {
  constructor(readonly _graphqlServices: IGraphQlServices) {
    super();
  }
  async getAll(skip: number, limit: number): Promise<IPaginateResponse<Titem>> {
    const util: IQueryType = this._graphqlServices.getQuery(CrudMethod.GET_ALL);
    const { data }: ApolloQueryResult<any> = await this.apollo.query({
      query: util.body,
      variables: {
        skip,
        limit
      },
      fetchPolicy: "no-cache"
    });
    return data[util.name];
  }
  async getOne(id: string): Promise<Titem> {
    const util: IQueryType = this._graphqlServices.getQuery(CrudMethod.GET_ONE);
    const { data } = await this.apollo.query({
      query: util.body,
      variables: {
        id
      },
      fetchPolicy: "no-cache"
    });
    return data[util.name];
  }
  async create(input: Tinput): Promise<Titem> {
    const util: IQueryType = this._graphqlServices.getQuery(CrudMethod.CREATE);
    const { data } = await this.apollo.mutate({
      mutation: util.body,
      variables: {
        input
      },
      fetchPolicy: "no-cache"
    });
    return data[util.name];
  }
  async update(id: string, input: Tupdate): Promise<Titem> {
    const util: IQueryType = this._graphqlServices.getQuery(CrudMethod.UPDATE);
    const { data } = await this.apollo.mutate({
      mutation: util.body,
      variables: {
        id,
        input
      },
      fetchPolicy: "no-cache"
    });
    return data[util.name];
  }
  async delete(id: string): Promise<Titem> {
    const util: IQueryType = this._graphqlServices.getQuery(CrudMethod.DELETE);
    const { data } = await this.apollo.mutate({
      mutation: util.body,
      variables: {
        id
      },
      fetchPolicy: "no-cache"
    });
    return data[util.name];
  }
}
