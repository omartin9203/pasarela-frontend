import { createStore, applyMiddleware, compose, combineReducers, Store } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { storeBuilder } from 'redux-scaffolding-ts';
import {configReducer} from "./stores/core/reducers";
import {GatewaysStore, GatewayStore} from "./stores/gateway-store";

export default function configureStore(history: History, initialState?: any) {
  // If devTools is installed, connect to it
  const composeEnhancers =
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        latency: 0
      }) : compose;

  // define middlewares
  const middlewares = [routerMiddleware(history)];

  const createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(...middlewares)
  )(createStore);

  // Add repositories
  storeBuilder.addRepository(new GatewaysStore() as any);
  storeBuilder.addRepository(new GatewayStore() as any);

  // Combine all reducers and instantiate the app-wide store instance
  const store = storeBuilder.getStore(initialState,
    combineReducers<any>({ config: configReducer, router: connectRouter(history) }) as any,
    createStoreWithMiddleware as any) as Store<any>;

  return store;
}
