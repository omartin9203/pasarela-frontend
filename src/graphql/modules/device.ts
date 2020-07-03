import { gql } from "apollo-boost";
import {PAGINATE_DEVICE_FRAGMENT} from "../fragments/devices/paginate.device";
import {DEVICE_FRAGMENT} from "../fragments/devices/device.fragment";

// /* Device Queries */
const GET_DEVICE = gql`
    query($id: ID!) {
        getDevice(id: $id) {
            ...DeviceFragment
        }
    }
    ${DEVICE_FRAGMENT}
`;

const GET_DEVICES = gql`
    query($skip: Int, $limit: Int) {
        getDevices(skip: $skip, limit: $limit) {
            ...PaginateDeviceFragment
        }
    }
    ${PAGINATE_DEVICE_FRAGMENT}
`;

const FILTER_DEVICES = gql`
    query($filter: DeviceFilterInput, $skip: Int, $limit: Int) {
        filterDevices(filter: $filter, skip: $skip, limit: $limit) {
            ...PaginateDeviceFragment
        }
    }
    ${PAGINATE_DEVICE_FRAGMENT}
`;

//#region MUTATIONS
const CREATE_DEVICE = gql`
    mutation($input: DeviceInput!) {
        createDevice(input: $input) {
            ...DeviceFragment
        }
    }
    ${DEVICE_FRAGMENT}
`;

const UPDATE_DEVICE = gql`
    mutation($id: ID!, $input: DeviceUpdate!) {
        updateDevice(id: $id, input: $input) {
            ...DeviceFragment
        }
    }
    ${DEVICE_FRAGMENT}
`;

const DELETE_DEVICE = gql`
    mutation($id: ID!) {
        deleteDevice(id: $id) {
            ...DeviceFragment
        }
    }
    ${DEVICE_FRAGMENT}
`;

//#endregion

export default {
  queries: {
    GET_DEVICE,
    GET_DEVICES,
    FILTER_DEVICES
  },
  mutations: {
    CREATE_DEVICE,
    UPDATE_DEVICE,
    DELETE_DEVICE
  }
};
