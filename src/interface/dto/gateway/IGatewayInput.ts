export interface IGatewayInput {
  serialNumber: string;
  name: string;
  ipv4: {
    value: string,
    validated?: boolean,
  };
  devices: string[];
}
