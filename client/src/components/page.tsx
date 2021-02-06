import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { GET_CURRENCIES } from '../apollo_client/queries';
import { Currency } from '../apollo_client/types';

const Page: React.FC = () => {
  const { loading, error, data } = useQuery<{ currencies: Currency[] }>(
    GET_CURRENCIES,
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      {data &&
        data.currencies.map(({ id, name, rate }) => (
          <div key={id}>
            <p>
              {name}: {rate}
            </p>
          </div>
        ))}
    </>
  );
};

export default Page;
