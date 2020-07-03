import gateway from "./modules/gateway";
import device from "./modules/device";

export const graphql = {
  queries: {
    gateway: gateway.queries,
    device: device.queries,
  },
  mutations: {
    gateway: gateway.mutations,
    device: device.mutations,
  }
};
