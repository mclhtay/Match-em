import * as React from 'react';
import { CostButton } from '../CostButton';
import styled from 'styled-components';
import { ScoutBanner } from 'src/components/ScoutBanner';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { path, prop } from 'ramda';
import { StoreState } from 'src/store/store';
import { enterScoutAction, ScoutState } from 'src/store/reducers/scout';
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
  const scout = useSelector<StoreState, ScoutState>(prop('scout'));

  const handleScout = () => {
    dispatch(enterScoutAction());
  };

  return (
    <ScoutWrapper>
      {scout.isDone ? (
        <div>{scout.scouted.name}</div>
      ) : (
        <>
          <ScoutBanner
            animationIndex={scout.index}
            inScout={scout.inScout}
            finalIndex={scout.finalIndex}
          />
          {!scout.inScout && (
            <>
              <ScoutTitle>{scoutTitle}</ScoutTitle>
              <CostButton
                cost={cost}
                scout={handleScout}
                disabled={userDiamonds}
              />
            </>
          )}
        </>
      )}
    </ScoutWrapper>
  );
};
