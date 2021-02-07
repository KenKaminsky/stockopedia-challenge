import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import { ICurrency } from '../../../apollo_client/types';
import Select from './select';
import useSubscription from '../hooks/useSubscription';
import currencySymbols from '../styles/currencySymbols';

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

type IRates = Record<string, number>;

interface IApiResponse {
  quotes: IRates;
}

const response: IApiResponse = {
  quotes: {
    USDEUR: 0.829941,
    USDGBP: 0.727987,
    USDJPY: 105.355504,
    USDUSD: 1,
  },
};

const adjustToGBP = (usdRelativeRates: IRates): IRates => {
  const GBP = 1 / usdRelativeRates.USDGBP;
  return Object.fromEntries(
    Object.entries(usdRelativeRates).map(([key, val]) => [
      key.replace(/^USD/, ''),
      key === 'USDGBP' ? 1 : GBP * val,
    ]),
  );
};

const Comfirm: React.FC<ICurrencyProps> = ({ currencies }) => {
  const styles = useStyles();
  const { state, changeCurrency } = useSubscription();
  const [total, setTotal] = useState(0);

  const updateCurrency = async (currency: ICurrency) => {
    const currencySyms = currencies.map((cur) => cur.name).join(',');
    // const rates = await fetch(
    //   `http://api.currencylayer.com/live?access_key=35e1b8f614fb85ebd42495420c724509&currencies=${currencySyms}&format=1`,
    // ).then((res) => res.json());
    const rates = adjustToGBP(response.quotes);

    console.log(rates);
    changeCurrency({ ...currency, rate: rates[currency.name] });
  };

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
          options={currencies}
          initialIndex={currencies.findIndex((cur) => cur.name === 'GBP')}
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
