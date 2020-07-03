import {connect} from "redux-scaffolding-ts";
import * as React from "react";
import autobind from "autobind-decorator";
import {IGateway} from "../interface/dto/gateway/IGateway";
import {IGatewayInput} from "../interface/dto/gateway/IGatewayInput";
import {IGatewayUpdate} from "../interface/dto/gateway/IGatewayUpdate";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  TextField,
  Switch,
  FormControlLabel,
  CardActions
} from "@material-ui/core";
import {GatewayStore} from "../stores/gateway-store";
import {makeStyles} from "@material-ui/core/styles";

interface GatewayItemProps {
  item: IGateway | IGatewayInput;
  mode: 'show' | "new" | 'edit';
  onSave: () => void;
  onDeleteItem?: (id: string) => Promise<void>;
  onCancel?: () => void;
}
interface GatewayItemState {
  mode: 'show' | "new" | 'edit';
  changes: IGatewayUpdate;
  itemEditing: IGatewayInput;
}

@connect(["Gateway", GatewayStore])
export class GatewayItem extends React.Component<
  GatewayItemProps,
  GatewayItemState
  > {
  private get store() {
    return (this.props as any).Gateway as GatewayStore;
  }

  constructor(props: GatewayItemProps) {
    super(props);
    this.state = {
      mode: props.mode,
      changes: {},
      itemEditing: {
        ...(props.item as IGatewayInput)
      }
    } as GatewayItemState;
  }

  @autobind
  private async onSave() {
    this.state.mode === "new"
      ? await this.store.createAsync(this.state.itemEditing)
      : await this.store.updateAsync((this.props.item as IGateway).id, this.state.changes);
    this.props.onSave();
    this.setState({mode: "show", changes: {}})
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
  private async onDelete() {
    if(this.props.onDeleteItem) await this.props.onDeleteItem((this.props.item as IGateway).id)
  }

  @autobind
  private async onCancel() {
    if (this.props.onCancel)
      this.props.onCancel();
    this.setState({mode: "show", changes: {}})
  }

  changeField<T>(field: keyof IGatewayInput, value: T) {
    this.setState({
      changes: {
        ...this.state.changes,
        [field]: value,
      },
      itemEditing: {
        ...this.state.itemEditing,
        [field]: value,
      }
    })
  }

  public render() {
    const item: IGatewayInput = this.props.item as IGatewayInput;
    return (
      <Card elevation={2} style={{maxWidth: 300}}>
        <CardContent>
          <FormControl>
            <TextField
              label={"Serial Number"}
              InputProps={{
                readOnly: this.state.mode === 'show',
              }}
              value={this.state.itemEditing.serialNumber}
              required={true}
              onChange={(value) => this.changeField("serialNumber", value.target.value)}
            />
            <TextField
              label={"Name"}
              InputProps={{
                readOnly: this.state.mode === 'show',
              }}
              value={this.state.itemEditing.name}
              required={true}
              onChange={(value) => this.changeField("name", value.target.value)}

            />
            <TextField
              label={"IPv4"}
              InputProps={{
                readOnly: this.state.mode === 'show',
              }}
              value={this.state.itemEditing.ipv4.value}
              onChange={(value) => this.changeField("ipv4", { ...item.ipv4, value: value.target.value })}
              required={true}
            />
            <FormControlLabel
              control={
                <Switch
                  value={this.state.itemEditing.ipv4.validated}
                  disabled={this.state.mode === 'show'}
                  onChange={(value) => this.changeField("ipv4", { ...item.ipv4, validated: Boolean(value.target.value) })}
                  color="primary"
                />
              }
              label="Validated"
            />
          </FormControl>
        </CardContent>
        <CardActions style={{justifyContent: "end"}}>
          {
            this.state.mode !== 'show' &&
            <div>
              <Button
                onClick={this.onCancel}
              >
                Cancel
              </Button>
              <Button color={"primary"} onClick={this.onSave}>
                Save
              </Button>
            </div>
          }
          {
            this.state.mode === 'show' &&
            <div>
              <Button
                onClick={() => this.setState({mode: "edit"})}
              >
                Edit
              </Button>
              <Button
                color={"primary"}
                onClick={this.onDelete}
              >
                Delete
              </Button>
            </div>
          }
        </CardActions>
      </Card>
    );
  }
}
