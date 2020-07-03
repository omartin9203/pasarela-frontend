import { gql } from "apollo-boost";
import {DEVICE_FRAGMENT} from "../devices/device.fragment";

export const GATEWAY_FRAGMENT = gql`
  fragment GatewayFragment on GatewayDto {
    id
    createdAt
    updatedAt
    ipv4{
        validated
        value
    }
    name
    serialNumber
    devices
    devicesObjects{
        ...DeviceFragment
    }
  }
  ${DEVICE_FRAGMENT}
`;
