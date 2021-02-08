import { Box, createStyles, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { IPlansProps } from '..';
import Plan from './plan';

const useStyles = makeStyles(() =>
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
    selected: {
      background: '#00B67A',
    },
  }),
);

const Addons: React.FC<IPlansProps> = ({ plans }) => {
  const styles = useStyles();

  return (
    <Paper className={styles.root} square>
      <Box>
        <h3>2. Select Add-ons</h3>
      </Box>
      <Box className={styles.container}>
        {plans && plans.map((plan) => <Plan key={plan.id} plan={plan} />)}
      </Box>
    </Paper>
  );
};

export default Addons;
