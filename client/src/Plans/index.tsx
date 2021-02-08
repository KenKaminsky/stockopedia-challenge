import { useQuery } from '@apollo/client';
import { Box, createStyles, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { GET_DATA } from '../apollo_client/queries';
import { IData, IPlan } from '../apollo_client/types';
import Addons from './components/addons';
import Choose from './components/choose';
import Confirm from './components/confirm';
import { SubscriptionProvider } from './providers/subbscriptionProvider';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100vh',
    },
    container: {
      display: 'grid',
      maxWidth: '900px',
      justifyItems: 'center',
      gridTemplateColumns: '1fr 2fr 1fr',
    },
  }),
);

export interface IPlansProps {
  plans: IPlan[];
}

const Plans = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery<IData>(GET_DATA);

  return (
    <SubscriptionProvider>
      <div className={classes.root}>
        <Box
          height='100%'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Box>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error :(</p>
            ) : (
              data && (
                <Paper className={classes.container} variant='outlined'>
                  <Choose plans={data.plans} />
                  <Addons plans={data.plans} />
                  <Confirm />
                </Paper>
              )
            )}
          </Box>
        </Box>
      </div>
    </SubscriptionProvider>
  );
};

export default Plans;
