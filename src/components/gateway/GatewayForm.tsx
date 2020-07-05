import * as React from 'react'
import { Form, Spin, Input, Checkbox, Modal, Row, Col, Alert, InputNumber } from 'antd';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import {IGatewayInput} from "../../interface/dto/gateway/IGatewayInput";
import {DeviceSelector} from "../device/DeviceSelector";
let FormItem = Form.Item;

interface ClassFormBodyProps {
  item?: IGatewayInput,
  onSave?: () => Promise<any>;
  getFieldDecorator<T extends Object = {}>(id: keyof T, options?: GetFieldDecoratorOptions): (node: React.ReactNode) => React.ReactNode;
  isBusy: boolean;
}
interface ClassFormBodyState {
}

export class GatewayForm extends React.Component<ClassFormBodyProps, ClassFormBodyState> {
  constructor(props: ClassFormBodyProps) {
    super(props);
    this.state = {
    };
  }

  render() {
    var item = this.props.item!;
    if (this.props.isBusy) {
      return <Spin spinning />;
    }
    return <Form id="modalForm" onSubmit={() => { if (this.props.onSave) { this.props.onSave(); } }}>
      <Row gutter={24}>
        <Col span={12}>
          <FormItem label={"Name"}>
            {this.props.getFieldDecorator<IGatewayInput>("name", {
              initialValue: item.name,
              rules: [{ required: true, message: 'Name required' }],
            })(
              <Input placeholder={"Name"} type="text"/>
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={"Serial Number"}>
            {this.props.getFieldDecorator<IGatewayInput>("serialNumber", {
              initialValue: item.serialNumber,
              rules: [{ required: true, message: 'Serial Number required' }],
            })(
              <Input placeholder={"Serial Number"} type="text" />
            )}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <FormItem label={"IPv4"}>
            {this.props.getFieldDecorator('ipv4.value', {
              initialValue: item.ipv4.value,
              rules: [{ required: true, message: 'IPv4 required' }],
            })(
              <Input placeholder={'IPv4'} type="text" />
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={"Validate IPv4"}>
            {this.props.getFieldDecorator('ipv4.validated', {
              rules: [{required: false}],
              initialValue: item.ipv4.validated
            })(
              <Checkbox defaultChecked={item.ipv4.validated} />
            )}
          </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="center" gutter={24}>
        <Col span={12}>
          <FormItem label={"Devices"}>
            {this.props.getFieldDecorator('devices', {
              initialValue: item.devices ?? [],
              rules: [
                {
                  validator: (rule, value: string[]) => (value && value.length <= 10),
                  message: 'Max 10 devices'
                }
              ]
            })(
              <DeviceSelector />
            )}
          </FormItem>
        </Col>
      </Row>
    </Form>
  }
}
