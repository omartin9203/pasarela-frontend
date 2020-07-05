import * as React from 'react'
import { Form, Spin, Input, Checkbox, Modal, Row, Col, Alert, InputNumber, Select } from 'antd';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import {IDeviceInput} from "../../interface/dto/device/IDeviceInput";
let FormItem = Form.Item;

interface ClassFormBodyProps {
  item?: IDeviceInput,
  onSave?: () => Promise<any>;
  getFieldDecorator<T extends Object = {}>(id: keyof T, options?: GetFieldDecoratorOptions): (node: React.ReactNode) => React.ReactNode;
  isBusy: boolean;
}
interface ClassFormBodyState {
}

export class DeviceForm extends React.Component<ClassFormBodyProps, ClassFormBodyState> {
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
          <Row type="flex" justify="center">
            <FormItem label={"UID"}>
              {this.props.getFieldDecorator<IDeviceInput>("uid", {
                initialValue: item.uid,
                rules: [{ required: true, message: 'UID required' }],
              })(
                <InputNumber placeholder={"UID"} type="number"/>
              )}
            </FormItem>
          </Row>
        </Col>
        <Col span={12}>
          <Row type="flex" justify="center">
            <FormItem label={"Brand"}>
              {this.props.getFieldDecorator<IDeviceInput>("brand", {
                initialValue: item.brand,
                rules: [{ required: true, message: 'Brand required' }],
              })(
                <Input placeholder={"Brand"} type="text" />
              )}
            </FormItem>
          </Row>
        </Col>
      </Row>
      <Row type={"flex"} justify="center" gutter={24}>
        <Col span={12}>
          <FormItem label={"Status"}>
            {this.props.getFieldDecorator('status', {
              initialValue: item.status,
              rules: [{ required: true, message: 'Status required' }],
            })(
              <Select>
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
              </Select>
            )}
          </FormItem>
        </Col>
      </Row>
    </Form>
  }
}
