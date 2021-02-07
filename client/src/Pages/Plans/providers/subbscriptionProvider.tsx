import { createContext, ReactNode, useMemo, useReducer } from 'react';
import {
  Action,
  ISubscriptionState,
  subscriptionReducer,
} from '../reducers/subscriptionReducer';

const initState: ISubscriptionState = {
  plans: [],
  billing: 'Annually',
  currency: { id: '1', name: 'GBP', rate: 1 },
};

export interface ISubscriptionProvider {
  state: ISubscriptionState;
  dispatch: React.Dispatch<Action>;
}

export const SubscriptionContext = createContext<ISubscriptionProvider | null>(
  null,
);

export type ProviderProps = {
  children: ReactNode;
};

export const SubscriptionProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(subscriptionReducer, initState);
  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state],
  );
  return <SubscriptionContext.Provider value={value} children={children} />;
};
