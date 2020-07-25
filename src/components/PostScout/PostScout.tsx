import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { portraits } from 'src/assets/portraits';
import { rem } from 'polished';
import { Link } from 'react-router-dom';

interface Props {
  scouted: {
    name: string;
    code: string;
  };
  onConfirm: () => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const Text = styled.h1<{ animation: boolean }>`
  text-transform: capitalize;
  font-size: ${rem('40px')};
  color: white;
  opacity: ${props => (props.animation ? 0 : 1)};
`;

const ImgZoom = keyframes`
  from{
    transform: scale(0.1);
    opacity: 0;
  }
  to{
    transform: scale(1);
    opacity: 1;
  }
`;

const ImgWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  animation: ${ImgZoom} 2s linear;
  display: flex;
  justify-content: center;
`;

const Button = styled.div<{ animation: boolean }>`
  text-transform: capitalize;
  background-color: #ade498;
  color: black;
  border: 5px;
  opacity: ${props => (props.animation ? 0 : 1)};
  width: ${rem('200px')};
  text-align: center;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  a {
    text-decoration: none;
  }
`;

export const PostScout: React.FC<Props> = ({ scouted, onConfirm }: Props) => {
  const [animation, setAnimation] = React.useState<boolean>(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAnimation(!animation);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Wrapper>
      <Text animation={animation}>
        Congratulations on getting {scouted.name}
      </Text>
      <ImgWrapper>
        <img src={portraits[scouted.code].src} alt={scouted.name} />
      </ImgWrapper>
      <ButtonWrapper>
        <Link to="/main">
          <Button animation={animation} onClick={onConfirm}>
            confirm
          </Button>
        </Link>
      </ButtonWrapper>
    </Wrapper>
  );
};
