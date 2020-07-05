import * as React from 'react';
import autobind from 'autobind-decorator';
import { Select } from 'antd';
import {connect} from "redux-scaffolding-ts";
import {DevicesStoreSelector} from "../../stores/device-store";
import {IPaginateResponse} from "../../interface/dto/IPaginateResponse";
import {IDevice} from "../../interface/dto/device/IDevice";
const Option = Select.Option;

interface DeviceSelectorProps {
  value?: string[];
  onChange?: (item: string[]) => void;
}

interface DeviceSelectorState {
  searchQuery: string;
  value: string[];
}

@connect(["DevicesSelector", DevicesStoreSelector])
export class DeviceSelector extends React.Component<DeviceSelectorProps, DeviceSelectorState> {

  private get store() {
    return (this.props as any).DevicesSelector as DevicesStoreSelector;
  }

  constructor(props: DeviceSelectorProps) {
    super(props);
    this.state = {
      value: this.props.value ?? [],
      searchQuery: "",
    };
    this.reload()
  }

  componentDidUpdate(prevProps: DeviceSelectorProps, prevState: DeviceSelectorState, snapshot: any) {
    if (JSON.stringify(this.props.value || '""') !== JSON.stringify(prevProps.value || '""')) {
      this.setState({ value: this.props.value as any }, ()=>this.reload());
    }
  }

  @autobind
  private handleChange(value: string[] = []) {
    if(this.props.onChange) this.props.onChange(value);
    this.setState({
      value: value,
    })
  }

  @autobind
  private handleSearchChange(searchQuery: string) {
    if (this.state.searchQuery !== searchQuery) {
      this.setState({ searchQuery }, () => this.reload());
    }
  }

  @autobind
  private reload() {
    this.store.filterDevice({search: this.state.searchQuery}, 0, 10);
  }

  render() {
    return (
      <Select
        mode={'multiple'}
        value={this.props.value}
        placeholder={"select"}
        loading={this.store.state.isBusy}
        filterOption={false}
        autoClearSearchValue={true}
        showSearch={true}
        onChange={(o: any) => this.handleChange(o)}
        onDropdownVisibleChange={(open) => this.reload()}
        onSearch={this.handleSearchChange}
      >
        {(this.store.state.data!.result as IPaginateResponse<IDevice>).items.map(o =>
          <Option key={o.id} value={o.id}>
            <span>{o.uid}</span>
          </Option>)}
      </Select>
    );
  }
}
