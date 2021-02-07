import {
  Box,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';
import React, { useState } from 'react';
import { IPlan } from '../../../apollo_client/types';
import Plan from './plan';
import useSubscription from '../hooks/useSubscription';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'grid',
      justifyItems: 'center',
      gridTemplateRows: '50px auto',
      borderRight: '1px solid rgba(0, 0, 0, 0.12)',
      borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
    },
    container: {
      width: '100%',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: 'red',
    },
    selected: {
      background: '#00B67A',
    },
  }),
);

interface IPlansProps {
  plans: IPlan[];
}

const Addons: React.FC<IPlansProps> = ({ plans }) => {
  const styles = useStyles();
  const { state, changePlans } = useSubscription();

  return (
    <Paper className={styles.root} square>
      <Box>
        <h3>2. Select Add-ons</h3>
      </Box>
      <Box className={styles.container}>
        {plans &&
          plans.map((plan) => (
            <Plan
              key={plan.id}
              className={
                state.plans.includes(plan) ? styles.selected : styles.container
              }
              plan={plan}
              onClick={() => changePlans(plan)}
            />
          ))}
      </Box>
    </Paper>
  );
};

export default Addons;
