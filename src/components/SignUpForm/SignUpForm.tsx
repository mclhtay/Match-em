import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { useDispatch } from 'react-redux';
import { rem } from 'polished';
import { FormType } from '../../platform/constants';

const FormWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: white;
  position: relative;
`;

const popUp = keyframes`
  from{
    top: 500px;
  }
  to{
    top: 0;
  }
`;

const buttonFlash = keyframes`
  0%,70%{
    opacity: 1;
  }
  80%{
    opacity: 0.4;
  }
  100%{
    opacity: 1;
  }
`;

const FormInnerWrapper = styled.form`
  position: relative;
  color: black;
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${popUp} 1s ease-in;
`;

const FormLabel = styled.label`
  width: 100%;
`;

const FormInput = styled.input`
  width: ${rem('300px')};
  height: ${rem('100px')};
  font-size: ${rem('40px')};
  margin: ${rem('10px')};
`;

const FormButton = styled.button`
  width: ${rem('200px')};
  height: ${rem('75px')};
  background-color: #162447;
  border: none;
  border-radius: 5px;
  color: #f0f0f0;
  cursor: pointer;
  font-size: ${rem('20px')};
  animation: ${buttonFlash} 5s infinite ease-in-out;
`;

const FormTitle = styled.h3`
  font-size: ${rem('80px')};
`;

interface Props {
  formElements: FormType;
  submitAction: (formItems: { [key: string]: string }) => void;
}

export const SignUpForm: React.FC<Props> = ({
  formElements,
  submitAction
}: Props) => {
  const initialFormFields = formElements.formFields.reduce(
    (acc, i) => ({ ...acc, [i]: '' }),
    {}
  );
  const dispatch = useDispatch();
  const [elements, setElements] = React.useState<{ [key: string]: string }>(
    initialFormFields
  );
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(submitAction(elements));
  };

  const handleChange = e => {
    setElements({
      ...elements,
      [e.target.name]: e.target.value
    });
  };

  const { formRequirements } = formElements;
  const getSpec = o => {
    const spec = {};
    Object.keys(o).forEach(i => {
      spec[i] = o[i];
    });
    return spec;
  };
  return (
    <FormWrapper>
      <FormInnerWrapper onSubmit={handleSubmit}>
        <FormTitle>{formElements.formTitle}</FormTitle>
        {formElements.formFields.map((f, i) => (
          <FormLabel key={i} htmlFor={f}>
            <FormInput
              placeholder={f}
              name={f}
              type="text"
              value={elements[f]}
              onChange={e => handleChange(e)}
              {...getSpec(formRequirements ? formRequirements[f] : {})}
            />
          </FormLabel>
        ))}
        <FormButton type="submit">{formElements.formSubmit}</FormButton>
      </FormInnerWrapper>
    </FormWrapper>
  );
};
