import {CrudServices} from "./core/crud.service";
import {IPaginateResponse} from "../interface/dto/IPaginateResponse";
import {IQueryType} from "../interface/services/IGraphQlServices";
import {IDeviceInput} from "../interface/dto/device/IDeviceInput";
import {IDeviceUpdate} from "../interface/dto/device/IDeviceUpdate";
import {IDevice} from "../interface/dto/device/IDevice";
import {DeviceGraphqlServices, DeviceResolverMethods} from "./graphql/modules/device.graphql.service";

export class DeviceServices extends CrudServices<
  IDevice,
  IDeviceInput,
  IDeviceUpdate
  > {
  constructor() {
    super(new DeviceGraphqlServices());
  }
  async filter(
    filter: any,
    skip: number,
    limit: number
  ): Promise<IPaginateResponse<IDevice>> {
    const util: IQueryType = this._graphqlServices.resolveQuery(
      DeviceResolverMethods.FILTER_DEVICES
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
