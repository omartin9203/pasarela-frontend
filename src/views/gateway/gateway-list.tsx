import {connect} from "redux-scaffolding-ts";
import {GatewaysStore} from "../../stores/gateway-store";
import * as React from "react"
import {IQuery} from "../../interface/IQuery";
import autobind from "autobind-decorator";
import {IPaginateResponse} from "../../interface/dto/IPaginateResponse";
import {IGateway} from "../../interface/dto/gateway/IGateway";
import GatewayItem from "../../components/gateway/GatewayItem";
import {RouteComponentProps, withRouter} from "react-router";
import {IGatewayInput} from "../../interface/dto/gateway/IGatewayInput";
import {Alert, Col, Modal, Row, Spin, Button, Checkbox, Tag, Table, Popconfirm, Divider, Typography, Input} from "antd";
import {IDevice} from "../../interface/dto/device/IDevice";
import {DeleteTwoTone, EditTwoTone} from "@material-ui/icons";

interface GatewaysViewProps extends RouteComponentProps {

}
interface GatewaysViewState {
  query: IQuery<any>;
  showNew: boolean;
  itemToEdit?: IGateway;
  activePage: number;
}

@connect(["Gateways", GatewaysStore])
class GatewayListView extends React.Component<
  GatewaysViewProps,
  GatewaysViewState
  > {
  private get store() {
    return (this.props as any).Gateways as GatewaysStore;
  }

  constructor(props: GatewaysViewProps) {
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
    } as GatewaysViewState;
  }

  componentWillMount() {
    this.load();
  }

  @autobind
  private load() {
    return this.store.filterGateway({search: this.state.query.search}, this.state.query.skip, this.state.query.limit);
  }

  // @autobind
  // private async onSaveItem(item: IGatewayInput) {
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
  private onShowItemModal(item: IGateway) {
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
      <GatewayItem
        item={this.state.itemToEdit ?? this.newItem}
        mode={this.state.itemToEdit ? 'edit' : 'new'}
        onSave={this.onSave}
        onCancel={this.onCancelItemModal}
      />
      )
  }

  get newItem(): IGatewayInput {
    return {
      name: "",
      ipv4: {
        value: "",
      },
      serialNumber: "",
      devices: []
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
    const style = { padding: '8px 8px 8px 8px' };
    const onDelete = this.onDeleteRow;
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Serial Number',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
      },
      {
        title: 'IPv4 Value',
        dataIndex: 'ipv4.value',
        key: 'ipv4.value',
      },
      {
        title: 'IPv4 Validated',
        key: 'ipv4.validated',
        dataIndex: 'ipv4.validated',
        render: (value: boolean) => (
          <Checkbox checked={value}></Checkbox>
        ),
      },
      {
        title: 'Devices',
        key: 'devicesObjects',
        dataIndex: 'devicesObjects',
        render: (value: IDevice[]) => {
          return <span>
            {
              value.map((device) => (
                  <Tag color={'green'} key={device.id}>
                    {device.uid}
                  </Tag>
                )
              )
            }
          </span>
        },
      },
      {
        title: 'Action',
        key: 'operation',
        width: 100,
        fixed: 'right' as "right",
        render: (text: any, item: IGateway) => (
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
      total: (this.store.state.data!.result as IPaginateResponse<IGateway>).total,
    };
    return (
      <Row type="flex" justify="center" align="middle">
        <Col style={{padding: '25px'}} span={18}>
          <Row type="flex" justify="center" style={{paddingBottom: '25px', width: '100%' }}>
            <Typography.Title level={2} >Gategaway</Typography.Title>
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
                      dataSource={(this.store.state.data!.result as IPaginateResponse<IGateway>).items}
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

export default (withRouter(GatewayListView) as any);
