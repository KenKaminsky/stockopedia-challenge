import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { ICurrency } from '../../../apollo_client/types';
import useAltCurrency from '../hooks/useAltCurrency';
import useSubscription from '../hooks/useSubscription';
import { currencySymbols } from '../hooks/useAltCurrency';
import Select from './select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'grid',
      justifyItems: 'center',
      gridTemplateRows: '50px auto 150px',
    },
    container: {
      padding: theme.spacing(2),
      width: '100%',
    },
    summary: {
      width: '100%',
      color: 'black',
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
      backgroundColor: '#EFF2F9',
    },
  }),
);

interface ICurrencyProps {
  currencies: ICurrency[];
}

const Comfirm: React.FC<ICurrencyProps> = ({ currencies }) => {
  const styles = useStyles();

  const { state } = useSubscription();

  const [total, setTotal] = useState(0);

  const { updateCurrency, error, isLoading } = useAltCurrency();

  useEffect(() => {
    const billing: 'annualCost' | 'monthlyCost' =
      state.billing === 'Annually' ? 'annualCost' : 'monthlyCost';

    const costGBP = state.plans
      .map((plan) => plan[billing] * state.currency.rate)
      .reduce((acc, curr) => acc + curr, 0);

    setTotal(Math.round(costGBP));
  }, [state.plans, state.billing, state.currency]);

  return (
    <Box className={styles.root}>
      <Box>
        <h3>3. Confirm Your Plan</h3>
      </Box>
      <Box className={styles.container}>
        <Select
          state={state.currency}
          options={currencies}
          initialIndex={currencies.findIndex(
            (cur) => cur.name === state.currency.name,
          )}
          onChange={(selected) => updateCurrency(selected)}
        />
      </Box>
      <Box className={styles.summary}>
        <Typography variant={'subtitle1'} color='textSecondary'>
          Total:
        </Typography>
        <Typography variant={'h4'} color='textSecondary'>
          {`${currencySymbols[state.currency.name]} ${total}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default Comfirm;
