export interface NavButton {
  title?: string;
  variant?: string;
  classname?: string;
}

export interface MultiStepProps {
  showNavigation?: boolean;
  defaultActiveStep?: number;
  children?: React.ReactElement[];
  prevButton?: NavButton;
  nextButton?: NavButton;
}

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
}

export interface LoginUserParams {
  email: string;
  password: string;
}
