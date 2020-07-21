import * as React from 'react';
import { CostButton } from '../CostButton';
import styled from 'styled-components';
import { ScoutBanner } from 'src/components/ScoutBanner';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { path } from 'ramda';
import { StoreState } from 'src/store/store';

interface Props {
  scoutTitle: string;
  cost: number;
}

const ScoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ScoutTitle = styled.h1`
  text-transform: capitalize;
  color: white;
`;

export const Scout: React.FC<Props> = ({ scoutTitle, cost }: Props) => {
  const dispatch = useDispatch();
  const userDiamondSelector = createSelector(
    path<number>(['user', 'diamonds']),
    (diamonds: number) => diamonds >= cost
  );
  const userDiamonds = useSelector<StoreState, boolean>(userDiamondSelector);
  const [inScout, setInScout] = React.useState<boolean>(false);

  const handleScout = () => {
    // make reducer for scout
    // animation
  };

  return (
    <ScoutWrapper>
      <ScoutBanner />
      <ScoutTitle>{scoutTitle}</ScoutTitle>
      <CostButton cost={cost} scout={handleScout} disabled={userDiamonds} />
    </ScoutWrapper>
  );
};
