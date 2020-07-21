import * as React from 'react';
import styled from 'styled-components';
import { Scout } from 'src/components/Scout';
import { ConfirmationButton } from 'src/components/ConfirmationButton';
const FrameWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  text-transform: capitalize;
`;

const Description = styled.h2`
  color: white;
`;

const diamondCost = 0;

export const NewUser: React.FC = () => {
  const [confirm, setConfirm] = React.useState<boolean>(false);

  const onConfirm = () => {
    setConfirm(!confirm);
  };

  return (
    <FrameWrapper>
      {confirm ? (
        <Scout cost={diamondCost} scoutTitle="Free Scout" />
      ) : (
        <>
          <Title>Welcome!</Title>
          <Description>let's unlock your first hero!</Description>
          <ConfirmationButton onConfirm={onConfirm} />
        </>
      )}
    </FrameWrapper>
  );
};
