import * as React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingRippleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingRipple = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
`;

const LoadingMsg = styled.h3`
  font-size: 4rem;
`;

interface Props {
  loadingMsg: string;
}

export const Loading: React.FC<Props> = ({ loadingMsg }: Props) => (
  <LoadingRippleWrapper>
    <LoadingRipple />
    <LoadingMsg>{loadingMsg}</LoadingMsg>
  </LoadingRippleWrapper>
);
