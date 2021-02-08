import { Box, createStyles, Icon, makeStyles, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { IPlan } from '../../apollo_client/types';
import useSubscription from '../hooks/useSubscription';
import { FLAGS } from '../../constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      background: '#EFF2F9',
      gridTemplateColumns: '1fr 2fr 1fr',
      margin: theme.spacing(2),
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    icon: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      color: '#00B67A',
    },
  }),
);

interface IPlanProps {
  plan: IPlan;
}

const Plan: React.FC<IPlanProps> = ({ plan }) => {
  const classes = useStyles();
  const {
    state: { billing, plans, currency },
    changePlans,
  } = useSubscription();

  const price =
    (billing === 'Annually' ? plan.annualCost : plan.monthlyCost) *
    currency.rate;

  return (
    <Card
      variant='outlined'
      className={classes.root}
      onClick={() => changePlans(plan)}
    >
      <CardMedia
        className={classes.cover}
        image={FLAGS[plan.code]}
        title={plan.name}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component='h6' variant='h6'>
            {plan.name}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {currency.symbol} {price.toFixed(0)}
          </Typography>
        </CardContent>
      </div>
      <Box className={classes.icon}>
        {plans.includes(plan) && <Icon fontSize={'large'}>done</Icon>}
      </Box>
    </Card>
  );
};

export default Plan;
