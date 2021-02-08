import {
  Box,
  Button,
  ButtonGroup,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React from 'react';
import { IBillingCycle, IPlan } from '../../../apollo_client/types';
import useSubscription from '../hooks/useSubscription';
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
  }),
);

interface IPlansProps {
  plans: IPlan[];
}

const billingCycles: Array<IBillingCycle> = ['Annually', 'Monthly'];

const Choose: React.FC<IPlansProps> = ({ plans }) => {
  const styles = useStyles();
  const { state, changeBilling, changePlans } = useSubscription();

  return (
    <Box className={styles.root}>
      <Box>
        <h3>1. Choose a Region</h3>
      </Box>
      <Box className={styles.container}>
        <Select
          state={state.plans[0]}
          options={plans}
          onChange={(selected) => changePlans(selected)}
        />
      </Box>
      <Box className={styles.container}>
        <Box>
          <h3>Billing period:</h3>
        </Box>
        <Box>
          <ButtonGroup
            disableElevation
            variant='contained'
            color='primary'
            style={{ display: 'flex' }}
          >
            {billingCycles.map((cycle) => (
              <Button
                key={cycle}
                variant={cycle === state.billing ? 'contained' : 'outlined'}
                style={{ flexGrow: 1 }}
                onClick={() => changeBilling(cycle)}
              >
                {cycle}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default Choose;
