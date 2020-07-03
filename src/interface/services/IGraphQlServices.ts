/* eslint-disable @typescript-eslint/interface-name-prefix */
export enum CrudMethod {
  GET_ALL = "getAll",
  GET_ONE = "getOne",
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete"
}

export enum QueryType {
  QUERY = "query",
  MUTATION = "mutation"
}

export interface IQueryType {
  type: "query" | "mutation";
  name: string;
  body: any;
}

export interface IGraphQlServices {
  getQuery(metod: CrudMethod): IQueryType;
  resolveQuery(method: string): IQueryType;
}
