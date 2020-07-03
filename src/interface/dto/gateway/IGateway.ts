import {IEntity} from "../IEntity";

export interface IGateway extends IEntity {
  serialNumber: string;
  name: string;
  ipv4: {
    value: string,
    validated: boolean,
  };
  devices: string[];
}
