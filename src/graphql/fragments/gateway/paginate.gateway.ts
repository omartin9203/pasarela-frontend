import { gql } from "apollo-boost";
import {GATEWAY_FRAGMENT} from "./gateway.fragment";

export const PAGINATE_GATEWAY_FRAGMENT = gql`
    fragment PaginateGatewayFragment on PaginatedGatewayResponse {
        hasMore
        total
        items {
            ...GatewayFragment
        }
    }
    ${GATEWAY_FRAGMENT}
`;
