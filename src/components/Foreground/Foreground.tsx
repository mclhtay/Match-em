import * as React from 'react';
import styled from 'styled-components';
import { foregroundSize as size } from '../constants';
import { isMobile } from 'react-device-detect';

interface Props {
  children: React.ReactNode;
}

const ForegroundWrapper = styled.div<{ height: string; width: string }>`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  background-color: #c0c0c0;
  color: white;
`;

export const Foreground: React.FC<Props> = ({ children }: Props) => (
  <>
    {isMobile ? (
      <div>
        <p>
          Mobile support is currently not available{' '}
          <span role="img" aria-label="emoji">
            😩
          </span>
        </p>
      </div>
    ) : (
      <ForegroundWrapper {...size}>{children}</ForegroundWrapper>
    )}
  </>
);
