import {connect} from "redux-scaffolding-ts";
import * as React from "react";
import autobind from "autobind-decorator";
import {Alert, Form, Modal, Spin} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {IDeviceInput} from "../../interface/dto/device/IDeviceInput";
import {IDevice} from "../../interface/dto/device/IDevice";
import {IDeviceUpdate} from "../../interface/dto/device/IDeviceUpdate";
import {DeviceStore} from "../../stores/device-store";
import {DeviceForm} from "./DeviceForm";

interface DeviceItemProps {
  item: IDevice | IDeviceInput;
  mode: "new" | 'edit';
  onSave: () => void;
  onCancel?: () => void;
}
interface DeviceItemState {
  mode: "new" | 'edit';
  changes: IDeviceUpdate;
  itemEditing: IDeviceInput;
}

@connect(["Device", DeviceStore])
class DeviceItem extends React.Component<
  DeviceItemProps & FormComponentProps,
  DeviceItemState
  > {
  private get store() {
    return (this.props as any).Device as DeviceStore;
  }

  constructor(props: DeviceItemProps & FormComponentProps) {
    super(props);
    this.state = {
      mode: props.mode,
      changes: {},
      itemEditing: {
        ...(props.item as IDeviceInput)
      }
    } as DeviceItemState;
  }

  @autobind
  private async onSave() {
    var self = this;
    return new Promise((resolve, reject) => {
      self.props.form.validateFields((event: any) => {
        var values = self.props.form.getFieldsValue();
        if (!event) {
          (this.state.mode === "new"
            ? self.store.createAsync(values as IDeviceInput)
            : self.store.updateAsync((this.props.item as IDevice).id, values as IDeviceUpdate))
            .then((result) => {
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
        title={"New Device"}>
        {this.store.state.data?.message && !this.store.state.data?.success &&
        <Alert type='error'
               message={"Error"}
               description={this.store.state.data?.message}
               closable
        />
        }
        <Spin spinning={this.store.state.isBusy}>
          <DeviceForm item={this.state.itemEditing} getFieldDecorator={getFieldDecorator} onSave={this.onSave} isBusy={this.store.state.isBusy} />
        </Spin>
      </Modal>
    );
  }
}
// @ts-ignore
export default (Form.create({ })(DeviceItem as any) as any) as any as React.ComponentClass<DeviceItemProps>
