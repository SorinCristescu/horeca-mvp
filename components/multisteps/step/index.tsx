"use client";

interface StepProps {
  children?: React.ReactNode;
}
export const Step: React.FC<StepProps> = ({ children }) => {
  return <div>{children}</div>;
};
