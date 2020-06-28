import * as React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { rem } from 'polished';

const FormWrapper = styled.section`
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
  padding: ${rem('30px')} ${rem('30px')};
`;

const FormTitle = styled.h3`
  font-size: 4rem;
`;

interface Props {
  formElements: {
    formTitle: string;
    formFields: Array<string>;
  };
  submitAction: (formItems: { [key: string]: string }) => void;
}

export const SignUpForm: React.FC<Props> = ({
  formElements,
  submitAction
}: Props) => {
  const dispatch = useDispatch();

  return <FormWrapper></FormWrapper>;
};
