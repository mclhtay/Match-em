import * as React from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import { path } from 'ramda';
import { portraits } from 'assets/portraits';

export const NewUser: React.FC = () => {
  const userName = useSelector<StoreState, string>(path(['user', 'username']));

  return (
    <div>
      <img src={portraits.aSinon} />
    </div>
  );
};
