import { ActionCreator, Action } from 'redux';


export interface ApplicationState {
  router: any,
  config: any,
}

interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

export function configReducer(state = {}, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
