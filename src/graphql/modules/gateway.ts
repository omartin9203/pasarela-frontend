import { gql } from "apollo-boost";
import {GATEWAY_FRAGMENT} from "../fragments/gateway/gateway.fragment";
import {PAGINATE_GATEWAY_FRAGMENT} from "../fragments/gateway/paginate.gateway";

// /* Gateway Queries */
const GET_GATEWAY = gql`
    query($id: ID!) {
        getGateway(id: $id) {
            ...GatewayFragment
        }
    }
    ${GATEWAY_FRAGMENT}
`;

const GET_GATEWAYS = gql`
    query($skip: Int, $limit: Int) {
        getGateways(skip: $skip, limit: $limit) {
            ...PaginateGatewayFragment
        }
    }
    ${PAGINATE_GATEWAY_FRAGMENT}
`;

const FILTER_GATEWAYS = gql`
    query($filter: GatewayFilterInput, $skip: Int, $limit: Int) {
        filterGateways(filter: $filter, skip: $skip, limit: $limit) {
            ...PaginateGatewayFragment
        }
    }
    ${PAGINATE_GATEWAY_FRAGMENT}
`;

//#region MUTATIONS
const CREATE_GATEWAY = gql`
    mutation($input: GatewayInput!) {
        createGateway(input: $input) {
            ...GatewayFragment
        }
    }
    ${GATEWAY_FRAGMENT}
`;

const UPDATE_GATEWAY = gql`
    mutation($id: ID!, $input: GatewayUpdate!) {
        updateGateway(id: $id, input: $input) {
            ...GatewayFragment
        }
    }
    ${GATEWAY_FRAGMENT}
`;

const DELETE_GATEWAY = gql`
    mutation($id: ID!) {
        deleteGateway(id: $id) {
            ...GatewayFragment
        }
    }
    ${GATEWAY_FRAGMENT}
`;

//#endregion

export default {
  queries: {
    GET_GATEWAY,
    GET_GATEWAYS,
    FILTER_GATEWAYS
  },
  mutations: {
    CREATE_GATEWAY,
    UPDATE_GATEWAY,
    DELETE_GATEWAY
  }
};
