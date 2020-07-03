import {IEntity} from "../IEntity";

export interface IDevice extends IEntity {
  uid: number;
  brand: string;
  status: 'active' | 'inactive';
  date: Date;
}
