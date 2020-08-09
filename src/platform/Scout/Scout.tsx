import * as React from 'react';
import { CostButton } from '../../components/CostButton';
import styled from 'styled-components';
import { ScoutBanner } from 'src/components/ScoutBanner';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { path, prop } from 'ramda';
import { StoreState } from 'src/store/store';
import {
  enterScoutAction,
  ScoutState,
  resetScoutAction
} from 'src/store/reducers/scout';
import { PostScout } from '../../components/PostScout';
import { userExistAction } from 'src/store/reducers/user';
import { Link } from 'react-router-dom';

interface Props {
  scoutTitle: string;
  cost: number;
}

const ScoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: black;
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
    dispatch(enterScoutAction(cost));
  };

  const handleConfirm = () => {
    dispatch(resetScoutAction());
    dispatch(userExistAction());
  };

  return (
    <ScoutWrapper>
      {scout.isDone ? (
        <PostScout scouted={scout.scouted} onConfirm={handleConfirm} />
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

              <Link type="button" to="/main">
                Cancel
              </Link>
            </>
          )}
        </>
      )}
    </ScoutWrapper>
  );
};
