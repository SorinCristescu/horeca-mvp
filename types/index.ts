export interface Step {
  title?: string;
  component: React.ReactElement;
}

export interface NavButton {
  title?: string;
  style?: React.CSSProperties;
}

export interface MultiStepProps {
  stepCustomClass?: string;
  showNavigation?: boolean;
  showTitles?: boolean;
  direction?: "row" | "column";
  activeStep?: number;
  children?: React.ReactElement[];
  steps?: Step[];
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
