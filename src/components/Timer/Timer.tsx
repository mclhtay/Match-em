import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { rem } from 'polished';
import { useDispatch } from 'react-redux';
import { bonusSuccessAction } from 'src/store/reducers/game';

interface Props {
  hasWon: boolean;
}

const InitialTime = 6;


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  max-height: 25px;
  max-width: 80%;
`;

const TextComponent = styled.h1`
  font-size: ${rem("20px")};
  font-weight: bolder;
`;


const Flash = keyframes`
  0%{
    opacity: 1;
  }
  50%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;

const TimerComponent = styled.time`
  font-size: ${rem("20px")};
  animation: ${Flash} 1s infinite;
`;

export const Timer: React.FC<Props> = ({ hasWon }: Props) => {
  const dispatch = useDispatch();
  const [timeRemain, setTimeRemain] = React.useState<number>(InitialTime);
  const [bonusWon, setBonusWon] = React.useState<boolean>(false);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemain(prev => prev < 0 || hasWon ? prev : prev - 1);
    }, 1000);
    if (timeRemain >= 0 && hasWon) {
      setBonusWon(true);
    }

    if (!hasWon && timeRemain == 0) {
      setTimeRemain(-1);
    }


    return () => clearInterval(interval);
  }, [timeRemain]);

  if (timeRemain <= 0 || hasWon) {
    if (hasWon && bonusWon) {
      dispatch(bonusSuccessAction());
    } else
      return <> Bonus Time Out! </>;
  }
  return (
    <Wrapper>
      <TextComponent>Bonus Reward Time!</TextComponent>
      <TimerComponent>0:0{timeRemain >= 0 ? timeRemain : 0}</TimerComponent>
    </Wrapper>
  )

}