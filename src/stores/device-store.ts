import {repository} from "redux-scaffolding-ts";
import {DataState, DataStore} from "./core/generic-store";
import {IPaginateResponse} from "../interface/dto/IPaginateResponse";
import {IDevice} from "../interface/dto/device/IDevice";
import {IDeviceInput} from "../interface/dto/device/IDeviceInput";
import {IDeviceUpdate} from "../interface/dto/device/IDeviceUpdate";
import {DeviceServices} from "../services/device.service";

@repository("@@Device", "Devices")
export class DevicesStore extends DataStore<IDevice, IDeviceInput, IDeviceUpdate> {
  public ENTITY_FILTER?: string;
  private get _service() {
    return new DeviceServices()
  } ;
  constructor() {
    super('Devices', {
      isBusy: false,
      data: {
        success: true,
        result: {
          total: 0,
          hasMore: false,
          items: new Array<IDevice>()
        } as IPaginateResponse<IDevice>
      }
    } as DataState<IDevice>, new DeviceServices());
    this.ENTITY_FILTER = "Devices_FILTER";
    this.addReducer(this.ENTITY_FILTER, (): any => {
      return {
        onStart: () => ({ ...this.state, isBusy: true } as DataState<IDevice>),
        onSuccess: (value: IPaginateResponse<IDevice>) => {
          return {
            ...this.state,
            data: {
              success: true,
              result: value,
            },
            isBusy: false
          } as DataState<IDevice>;
        },
        onError: (error: any) => ({
          ...this.state,
          data: {
            success: false,
            message: error.toString(),
          },
          isBusy: false
        } as DataState<IDevice>)
      };
    }, 'AsyncAction');
  }

  async filterDevice(filter: any = {}, skip = 0, limit = 10) {
    try {
      await this.dispatchAsync(this.ENTITY_FILTER as string, this._service.filter(filter, skip, limit));
    } catch (e) {
      console.log(e);
    }
  }
}

@repository("@@Device", "DevicesSelector")
export class DevicesStoreSelector extends DataStore<IDevice, IDeviceInput, IDeviceUpdate> {
  public ENTITY_FILTER?: string;
  private get _service() {
    return new DeviceServices()
  } ;
  constructor() {
    super('DeviceSelector', {
      isBusy: false,
      data: {
        success: true,
        result: {
          total: 0,
          hasMore: false,
          items: new Array<IDevice>()
        } as IPaginateResponse<IDevice>
      }
    } as DataState<IDevice>, new DeviceServices());
    this.ENTITY_FILTER = "DeviceSelector_FILTER";
    this.addReducer(this.ENTITY_FILTER, (): any => {
      return {
        onStart: () => ({ ...this.state, isBusy: true } as DataState<IDevice>),
        onSuccess: (value: IPaginateResponse<IDevice>) => {
          return {
            ...this.state,
            data: {
              success: true,
              result: value,
            },
            isBusy: false
          } as DataState<IDevice>;
        },
        onError: (error: any) => ({
          ...this.state,
          data: {
            success: false,
            message: error.toString(),
          },
          isBusy: false
        } as DataState<IDevice>)
      };
    }, 'AsyncAction');
  }

  async filterDevice(filter: any = {}, skip = 0, limit = 10) {
    try {
      await this.dispatchAsync(this.ENTITY_FILTER as string, this._service.filter(filter, skip, limit));
    } catch (e) {
      console.log(e);
    }
  }
}

@repository("@@Device", "Device")
export class DeviceStore extends DataStore<IDevice, IDeviceInput, IDeviceUpdate> {
  constructor() {
    super('Device', {
      isBusy: false,
      data: {
        success: true,
        result: undefined,
      }
    } as DataState<IDevice>, new DeviceServices());
  }
}
