import {connect} from "redux-scaffolding-ts";
import * as React from "react"
import {IQuery} from "../../interface/IQuery";
import autobind from "autobind-decorator";
import {IPaginateResponse} from "../../interface/dto/IPaginateResponse";
import {RouteComponentProps, withRouter} from "react-router";
import {Alert, Col, Modal, Row, Spin, Button, Checkbox, Tag, Table, Popconfirm, Divider, Typography, Input} from "antd";
import {IDevice} from "../../interface/dto/device/IDevice";
import {DevicesStore} from "../../stores/device-store";
import DeviceItem from "../../components/device/DeviceItem";
import {IDeviceInput} from "../../interface/dto/device/IDeviceInput";
import {IGateway} from "../../interface/dto/gateway/IGateway";

interface DevicesViewProps extends RouteComponentProps {

}
interface DevicesViewState {
  query: IQuery<any>;
  showNew: boolean;
  itemToEdit?: IDevice;
  activePage: number;
}

@connect(["Devices", DevicesStore])
class DeviceListView extends React.Component<
  DevicesViewProps,
  DevicesViewState
  > {
  private get store() {
    return (this.props as any).Devices as DevicesStore;
  }

  constructor(props: DevicesViewProps) {
    super(props);
    this.state = {
      query: {
        skip: 0,
        limit: 10,
        filter: {},
        search: ""
      },
      showNew: false,
      activePage: 1
    } as DevicesViewState;
  }

  componentWillMount() {
    this.load();
  }

  @autobind
  private load() {
    return this.store.filterDevice({search: this.state.query.search}, this.state.query.skip, this.state.query.limit);
  }

  // @autobind
  // private async onSaveItem(item: IDeviceInput) {
  //   var result = await this.OtherExpensesStore.saveAsync(
  //     `${item.id}`,
  //     item,
  //     state
  //   );
  //   await this.load(this.state.query);
  //   return result;
  // }

  @autobind
  private async onDeleteRow(
    id: string
  ) {
    this.store.deleteAsync(id)
      .then( result => {
        this.setState({
          activePage: 1,
          query: {
            ...this.state.query,
            skip: 0,
          }
        }, () => { this.load() });
      })
      .catch((error) => { console.log(error) });
  }

  @autobind
  private onShowItemModal(item: IDevice) {
    this.setState({ showNew: true, itemToEdit: item });
  }

  @autobind
  private onCancelItemModal() {
    this.setState({ showNew: false, itemToEdit: undefined });
  }
  @autobind
  onSave() {
    this.setState({
      showNew: false,
      itemToEdit: undefined,
      activePage: 1,
      query: {
        ...this.state.query,
        skip: 0,
      }
    }, () => {this.load()});
  }

  getItemModal() {
    return (
      <DeviceItem
        item={this.state.itemToEdit ?? this.newItem}
        mode={this.state.itemToEdit ? 'edit' : 'new'}
        onSave={this.onSave}
        onCancel={this.onCancelItemModal}
      />
    )
  }

  get newItem(): IDeviceInput {
    return {
      status: "active",
      brand: "",
      uid: ((this.store.state.data?.result as IPaginateResponse<IDevice>).total  ?? 0) + 1,
    }
  }

  @autobind
  private handlePaginationChange(currentPage: number) {
    if (currentPage !== this.state.activePage) {
      this.setState({
        activePage: currentPage,
        query: {
          ...this.state.query,
          skip: (currentPage - 1) * this.state.query.limit
        }
      }, () => { this.load() });
    }
  }

  @autobind
  private onSearch(text: string) {
    this.setState({
      query: {
        ...this.state.query,
        skip: 0,
        search: text,
      },
      activePage: 1,
      showNew: false,
      itemToEdit: undefined
    }, this.load);
  }

  public render() {
    const onDelete = this.onDeleteRow;
    const columns = [
      {
        title: 'UID',
        dataIndex: 'uid',
        key: 'uid',
      },
      {
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (value: "active"|"inactive") => (
          <Tag color={value === "inactive" ? "#f50" : "#87d068"}>{value}</Tag>
        ),
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (value: any) => (
          <span>{value.toString().slice(0, 10)}</span>
        ),
      },
      {
        title: 'Action',
        key: 'operation',
        width: 100,
        fixed: 'right' as "right",
        render: (text: any, item: IDevice) => (
          <span>
            <Button
              type="primary"
              icon="edit"
              loading={this.store.state.isBusy}
              shape="circle"
              size={"small"}
              onClick={() => this.onShowItemModal(item)}
            />
            <Divider type="vertical" />
            <Popconfirm title="Sure to delete?" onConfirm={() => onDelete(item.id)}>
              <Button
                type="primary"
                icon="delete"
                shape="circle"
                size={"small"}
                loading={this.store.state.isBusy}
              />
            </Popconfirm>
          </span>
        ),
      },
    ];
    let pagination = {
      onChange: this.handlePaginationChange,
      pageSize: this.state.query.limit,
      showTotal: (total: number, range: any) => `${range[0]} ${'to'} ${range[1]} ${'of'} ${total}`,
      current: this.state.activePage,
      total: (this.store.state.data!.result as IPaginateResponse<IDevice>).total,
    };
    return (
      <Row type="flex" justify="center" align="middle">
        <Col style={{padding: '25px'}} span={18}>
          <Row type="flex" justify="center" style={{paddingBottom: '25px', width: '100%' }}>
            <Typography.Title level={2} >Devices</Typography.Title>
          </Row>
          <Spin spinning={this.store.state.isBusy}>
            <Col>
              <Row type="flex" justify="center">
                {
                  !this.store.state.isBusy && this.store.state.data?.message &&
                  <Alert type="error" message={this.store.state.data?.message ?? ""} closable />
                }
                {
                  !this.store.state.isBusy && this.store.state.data?.success &&
                  this.store.state.data?.result &&
                  <Col span={24}>
                    <Row>
                      <Button
                        onClick={() => this.setState({showNew: true})}
                        type="primary"
                        icon="plus"
                        shape="circle"
                        disabled={this.state.showNew}
                      />
                      <Col span={6} style={{paddingRight: '10px'}}>
                        <Input.Search defaultValue={this.state.query.search} placeholder="search" onSearch={this.onSearch} enterButton />
                      </Col>
                    </Row>
                    <Divider />
                    <Table
                      columns={columns}
                      rowKey={record => record.id}
                      dataSource={(this.store.state.data!.result as IPaginateResponse<IDevice>).items}
                      pagination={pagination}
                    />
                  </Col>
                }
                {
                  this.state.showNew &&
                  this.getItemModal()
                  //
                }
              </Row>
            </Col>
          </Spin>
        </Col>
      </Row>
    );
  }
}

export default (withRouter(DeviceListView) as any);
