import { gql } from "apollo-boost";
import {DEVICE_FRAGMENT} from "./device.fragment";

export const PAGINATE_DEVICE_FRAGMENT = gql`
    fragment PaginateDeviceFragment on PaginatedDeviceResponse {
        hasMore
        total
        items {
            ...DeviceFragment
        }
    }
    ${DEVICE_FRAGMENT}
`;
