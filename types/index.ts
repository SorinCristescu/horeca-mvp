export interface NavButton {
  title?: string;
  variant?: string;
  classname?: string;
  onClick?: () => void;
}

export interface MultiStepProps {
  activeStep: number;
  steps: number[];
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

export interface useModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
