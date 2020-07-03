import * as React from "react";
import {IPaginateResponse} from "../interface/dto/IPaginateResponse";
import {IDevice} from "../interface/dto/device/IDevice";
import {DeviceServices} from "../services/device.service";

interface DevicesViewProp {

}

interface DevicesViewState {
  paginated: IPaginateResponse<IDevice>;
  loading: boolean;
}

export class Devices extends React.Component<DevicesViewProp, DevicesViewState>{
  private service = new DeviceServices();
  private paginated: IPaginateResponse<IDevice> = {
    total: 0,
    hasMore: false,
    items: new Array<IDevice>()
  };
  constructor(props: DevicesViewProp) {
    super(props);
    this.setState({
      paginated: {
        total: 0,
        hasMore: false,
        items: new Array<IDevice>()
      },
      loading: true
    })
  }

  async load() {
    try {
      this.setState({loading: true});
      this.paginated = await this.service.filter({}, 0, 10);
      this.setState({loading: false})
    } catch (e) {
      console.log(e);
    }
  }

  async componentWillMount() {
    await this.load();
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
        <div>
          <span>Total: {this.paginated?.total ?? 0}</span>
          {
            this.paginated && this.paginated.items.map(device => (
              <div key={device.id}>
                <span>UID: {device.uid}</span>
                <br/>
                <span>BRAND: {device.brand}</span>
                <br/>
                <span>DATE: {device.date}</span>
                <br/>
                <span>STATUS: {device.status}</span>
              </div>
            ))
          }
        </div>
    );
  }
}
