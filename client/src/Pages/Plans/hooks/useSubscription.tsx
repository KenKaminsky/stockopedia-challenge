import { useContext } from 'react';
import { IBillingCycle, ICurrency, IPlan } from '../../../apollo_client/types';
import {
  ISubscriptionProvider,
  SubscriptionContext,
} from '../providers/subbscriptionProvider';
import {
  CHANGE_BILLING_CYCLE,
  CHANGE_CURRENCY,
  CHANGE_PLAN,
} from '../reducers/subscriptionReducer';

export interface IUseSubscription extends ISubscriptionProvider {
  changePlans: (plan: IPlan) => void;
  changeCurrency: (currency: ICurrency) => void;
  changeBilling: (selected: IBillingCycle) => void;
}

const useSubscription = (): IUseSubscription => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      `useSubscription must be used within a SubscriptionProvider`,
    );
  }
  const { state, dispatch } = context;

  const changeCurrency = (currency: ICurrency) =>
    dispatch({ type: CHANGE_CURRENCY, payload: currency });

  const changeBilling = (selected: IBillingCycle) => {
    dispatch({ type: CHANGE_BILLING_CYCLE, payload: selected });
  };

  const changePlans = (plan: IPlan) =>
    dispatch({ type: CHANGE_PLAN, payload: plan });

  return { state, dispatch, changePlans, changeBilling, changeCurrency };
};

export default useSubscription;
