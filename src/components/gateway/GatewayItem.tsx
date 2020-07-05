import {connect} from "redux-scaffolding-ts";
import * as React from "react";
import autobind from "autobind-decorator";
import {IGateway} from "../../interface/dto/gateway/IGateway";
import {IGatewayInput} from "../../interface/dto/gateway/IGatewayInput";
import {IGatewayUpdate} from "../../interface/dto/gateway/IGatewayUpdate";
import {GatewayStore} from "../../stores/gateway-store";
import {Alert, Form, Modal, Spin} from "antd";
import {GatewayForm} from "./GatewayForm";
import {FormComponentProps} from "antd/lib/form";

interface GatewayItemProps {
  item: IGateway | IGatewayInput;
  mode: "new" | 'edit';
  onSave: () => void;
  onCancel?: () => void;
}
interface GatewayItemState {
  mode: 'show' | "new" | 'edit';
  changes: IGatewayUpdate;
  itemEditing: IGatewayInput;
}

@connect(["Gateway", GatewayStore])
class GatewayItem extends React.Component<
  GatewayItemProps & FormComponentProps,
  GatewayItemState
  > {
  private get store() {
    return (this.props as any).Gateway as GatewayStore;
  }

  constructor(props: GatewayItemProps & FormComponentProps) {
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
    var self = this;
    return new Promise((resolve, reject) => {
      self.props.form.validateFields((event: any) => {
        var values = self.props.form.getFieldsValue();
        if (!event) {
          (this.state.mode === "new"
            ? self.store.createAsync(values as IGatewayInput)
            : self.store.updateAsync((this.props.item as IGateway).id, values as IGatewayUpdate))
            .then(result => {
            if (result) {
              self.props.onSave();
              resolve();
            } else {
              reject();
            }
          });
        }
      });
    });
  }

  @autobind
  private async onCancel() {
    if (this.props.onCancel)
      this.props.onCancel();
    this.setState({ changes: {}})
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        maskClosable={false}
        visible
        onCancel={this.onCancel}
        onOk={this.onSave}
        closable={false}
        width='800px'
        okText={"Ok"}
        cancelText={"Cancel"}
        title={"New gateway"}>
        {this.store.state.data?.message && !this.store.state.data?.success &&
        <Alert type='error'
           message={"Error"}
           description={this.store.state.data?.message}
           closable={true}
        />
        }
        <Spin spinning={this.store.state.isBusy}>
          <GatewayForm item={this.state.itemEditing} getFieldDecorator={getFieldDecorator} onSave={this.onSave} isBusy={this.store.state.isBusy} />
        </Spin>
      </Modal>
    );
  }
}
// @ts-ignore
export default (Form.create({ })(GatewayItem as any) as any) as any as React.ComponentClass<GatewayItemProps>
