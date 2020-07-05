import {IEntity} from "../IEntity";
import {IDevice} from "../device/IDevice";

export interface IGateway extends IEntity {
  serialNumber: string;
  name: string;
  ipv4: {
    value: string,
    validated: boolean,
  };
  devices: string[];
  devicesObjects: IDevice[];
}
