import {connect} from "redux-scaffolding-ts";
import {GatewaysStore} from "../../stores/gateway-store";
import * as React from "react"
import {IQuery} from "../../interface/IQuery";
import autobind from "autobind-decorator";
import {Box, Button, CircularProgress} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import {IPaginateResponse} from "../../interface/dto/IPaginateResponse";
import {IGateway} from "../../interface/dto/gateway/IGateway";
import {GatewayItem} from "../../components/GatewayItem";
import {RouteComponentProps, withRouter} from "react-router";
import {IGatewayInput} from "../../interface/dto/gateway/IGatewayInput";

interface GatewaysViewProps extends RouteComponentProps {

}
interface GatewaysViewState {
  query: IQuery<any>;
  showNew: boolean;
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
      showNew: false
    } as GatewaysViewState;
  }

  async componentWillMount() {
    await this.load();
  }

  @autobind
  private async load() {
    return await this.store.filterGateway(this.state.query.filter, this.state.query.skip, this.state.query.limit);
  }

  @autobind
  private onQueryChanged(query: IQuery<any>) {
    this.setState({ query }, () => this.load());
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
        this.onQueryChanged({
          ...this.state.query,
          skip: 0,
          limit: 10,
        });
      })
      .catch((error) => { console.log(error) });
  }

  @autobind
  private onNewItem() {
    this.setState({ showNew: true });
  }

  @autobind
  private async onNewItemClosed(id?: string) {
    this.setState({ showNew: false });
    await this.onRefresh();
  }

  @autobind
  private async onRefresh() {
    await this.load();
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

  public render() {
    return (
      <Box flexDirection="row">
        {this.store.state.isBusy && <CircularProgress color="primary" />}
        {
          !this.store.state.isBusy && this.store.state.data?.message &&
          <Alert severity="error">{this.store.state.data?.message}</Alert>
        }
        {
          !this.store.state.isBusy && this.store.state.data?.success && this.store.state.data?.result &&
          (this.store.state.data.result as IPaginateResponse<IGateway>).items.map(item => (
            <Box p={2} m={2} key={item.id} >
              <GatewayItem
                item={item}
                mode={"show"}
                onSave={this.load}
                onDeleteItem={this.onDeleteRow}
                onCancel={() => this.setState({...this.state, showNew: false})}
              />
            </Box>
          ))

        }
        {
          this.state.showNew
            ? <GatewayItem
              item={this.newItem}
              mode={"new"}
              onSave={this.load}
              onCancel={() => this.setState({...this.state, showNew: false})}
            />
            : <Button onClick={() => this.setState({showNew: true})}>Add</Button>
        }
      </Box>
    );
  }
}

export default (withRouter(GatewayListView) as any);
