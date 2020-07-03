import { gql } from "apollo-boost";

export const DEVICE_FRAGMENT = gql`
    fragment DeviceFragment on DeviceDto {
        id
        createdAt
        updatedAt
        brand
        uid
        date
        status
    }
`;
