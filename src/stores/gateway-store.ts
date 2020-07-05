import {repository} from "redux-scaffolding-ts";
import {DataState, DataStore} from "./core/generic-store";
import {IGateway} from "../interface/dto/gateway/IGateway";
import {IGatewayInput} from "../interface/dto/gateway/IGatewayInput";
import {IGatewayUpdate} from "../interface/dto/gateway/IGatewayUpdate";
import {GatewayServices} from "../services/gateway.service";
import {IPaginateResponse} from "../interface/dto/IPaginateResponse";

@repository("@@Gateway", "Gateways")
export class GatewaysStore extends DataStore<IGateway, IGatewayInput, IGatewayUpdate> {
  public ENTITY_FILTER?: string;
  private get _service() {
    return new GatewayServices()
  } ;
  constructor() {
    super('Gateway', {
      isBusy: false,
      data: {
        success: true,
        result: {
          total: 0,
          hasMore: false,
          items: new Array<IGateway>()
        } as IPaginateResponse<IGateway>
      }
    } as DataState<IGateway>, new GatewayServices());
    this.ENTITY_FILTER = "Gateway_FILTER";
    this.addReducer(this.ENTITY_FILTER, (): any => {
      return {
        onStart: () => ({ ...this.state, isBusy: true } as DataState<IGateway>),
        onSuccess: (value: IPaginateResponse<IGateway>) => {
          return {
            ...this.state,
            data: {
              success: true,
              result: value,
            },
            isBusy: false
          } as DataState<IGateway>;
        },
        onError: (error: any) => ({
          ...this.state,
          data: {
            success: false,
            message: error.toString(),
          },
          isBusy: false
        } as DataState<IGateway>)
      };
    }, 'AsyncAction');
  }

  async filterGateway(filter: any = {}, skip = 0, limit = 10) {
    try {
      await this.dispatchAsync(this.ENTITY_FILTER as string, this._service.filter(filter, skip, limit));
    } catch (e) {
      console.log(e);
    }
  }
}

@repository("@@Gateway", "Gateway")
export class GatewayStore extends DataStore<IGateway, IGatewayInput, IGatewayUpdate> {
  constructor() {
    super('Gateway', {
      isBusy: false,
      data: {
        success: true,
        result: undefined,
      }
    } as DataState<IGateway>, new GatewayServices());
  }
}

@repository("@@Gateway", "NewGateway")
export class NewGatewayStore extends DataStore<IGateway, IGatewayInput, IGatewayUpdate> {
  constructor() {
    super('Gateway', {
      isBusy: false,
      data: {
        success: true,
        result: undefined,
      }
    } as DataState<IGateway>, new GatewayServices());
  }
}
