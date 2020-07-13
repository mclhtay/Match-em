export const gameTitle = `Match'em`;

export interface FormType {
  formTitle: string;
  formFields: Array<string>;
  formRequirements?: {
    [key: string]: {};
  };
  formSubmit: string;
}

export const signUpFormElements: FormType = {
  formTitle: 'Create a new user',
  formFields: ['Username'],
  formRequirements: {
    Username: {
      minLength: 5,
      maxLength: 15
    }
  },
  formSubmit: 'Create'
};
