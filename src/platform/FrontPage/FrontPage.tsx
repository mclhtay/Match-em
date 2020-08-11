import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import title from '../../assets/components/title.png';
import { gameTitle } from '../constants';
import { Link } from 'react-router-dom';
import { useSize } from 'src/hooks/useSize';
const FPWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const FPUX = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  height: 100%;
  width: 100%;
  color: white;
  text-align: center;
`;

const GameTitle = styled.h1<{ size: number }>`
  font-size: ${({ size }) => (size ? `${size}px` : `500%`)};
  color: rgb(188, 211, 231);
`;

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const flash = keyframes`
  0%{
    opacity: 1
  }
  50%{
    opacity: 0
  }
  100%{
    opacity: 1
  }
`;

const Login = styled.h4`
  opacity: 1;
  animation: ${flash} 2s infinite;
  cursor: pointer;
  font-size: 2rem;
  .no-decor {
    text-decoration: none;
    color: white;
  }
`;

export const FrontPage: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { width } = useSize(ref);
  return (
    <FPWrapper>
      <img src={title} width="100%" height="100%" alt="frontpage" />
      <FPUX ref={ref}>
        <GameTitle size={width * 0.1}>{gameTitle}</GameTitle>
        <LoginWrapper>
          <Login>
            <Link className="no-decor" to="/Match-em/login">
              Start
            </Link>
          </Login>
        </LoginWrapper>
      </FPUX>
    </FPWrapper>
  );
};
