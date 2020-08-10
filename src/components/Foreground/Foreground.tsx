import * as React from 'react';
import styled from 'styled-components';
import { foregroundSize as size } from '../constants';

interface Props {
  children: React.ReactNode;
  isMobile: boolean;
}

const ForegroundWrapper = styled.div<{
  height: string;
  width: string;
  isMobile: boolean;
}>`
  height: ${({ height, isMobile }) => (isMobile ? '100%' : height)};
  width: ${({ width, isMobile }) => (isMobile ? '100%' : width)};
  background-color: #c0c0c0;
  color: white;
`;

export const Foreground: React.FC<Props> = ({ children, isMobile }: Props) => (
  <>
    <ForegroundWrapper {...size} isMobile={isMobile}>
      {children}
    </ForegroundWrapper>
  </>
);
