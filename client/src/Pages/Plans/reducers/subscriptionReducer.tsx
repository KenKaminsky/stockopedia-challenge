import { IBillingCycle, ICurrency, IPlan } from '../../../apollo_client/types';

export interface ISubscriptionState {
  plans: IPlan[];
  currency: ICurrency;
  billing: IBillingCycle;
}

export const CHANGE_PLAN = 'CHANGE_PLAN';
export const CHANGE_CURRENCY = 'CHANGE_CURRENCY';
export const CHANGE_BILLING_CYCLE = 'CHANGE_BILLING_CYCLE';

export type Action =
  | { type: typeof CHANGE_PLAN; payload: IPlan }
  | { type: typeof CHANGE_CURRENCY; payload: ICurrency }
  | { type: typeof CHANGE_BILLING_CYCLE; payload: IBillingCycle };

export const subscriptionReducer = (
  state: ISubscriptionState,
  action: Action,
): ISubscriptionState => {
  switch (action.type) {
    case CHANGE_PLAN:
      console.log(state.plans);
      const index = state.plans.findIndex(
        (plan: IPlan) => plan.id === action.payload.id,
      );
      return {
        ...state,
        plans:
          index === -1
            ? [...state.plans, action.payload]
            : [...state.plans.slice(0, index), ...state.plans.slice(index + 1)],
      };
    case CHANGE_CURRENCY:
      return { ...state, currency: action.payload };
    case CHANGE_BILLING_CYCLE:
      return { ...state, billing: action.payload };
    default:
      return state;
  }
};
