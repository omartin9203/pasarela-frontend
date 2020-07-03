export interface IQuery<T extends any> {
  skip: number;
  limit: number;
  filter?: T;
  search: string
}
