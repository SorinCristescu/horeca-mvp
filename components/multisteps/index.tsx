"use client";

import React, { useState, useEffect } from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MultiStepProps, NavButton } from "@/types";

const getStep = (
  defaultIndex: number,
  newIndex: number,
  length: number
): number => {
  if (newIndex <= length) {
    return newIndex;
  }
  return defaultIndex;
};

const getButtonsState = (
  indx: number,
  length: number,
  isValidState: boolean
) => {
  if (indx > 0 && indx < length - 1) {
    return {
      showPrevBtn: true,
      showNextBtn: isValidState ? true : false,
    };
  } else if (indx === 0) {
    return {
      showPrevBtn: false,
      showNextBtn: isValidState ? true : false,
    };
  } else {
    return {
      showPrevBtn: true,
      showNextBtn: false,
    };
  }
};

export const Multisteps: React.FC<MultiStepProps> = ({
  defaultActiveStep,
  showNavigation,
  prevButton,
  nextButton,
  children,
}) => {
  const steps = React.Children.toArray(children);
  const [stepState, setStepState] = useState(defaultActiveStep || 0);

  const showNavButtons =
    typeof showNavigation === "undefined" ? true : showNavigation;

  const next = () => setStepState(stepState + 1);
  const previous = () =>
    setStepState(stepState > 0 ? stepState - 1 : stepState);

  const renderButtonsNav = (prevButton?: NavButton, nextButton?: NavButton) =>
    showNavButtons && (
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={previous}
          className={prevButton?.classname}
          disabled={buttonsState.showPrevBtn ? false : true}
        >
          {prevButton && prevButton.title ? <>{prevButton.title}</> : <>Prev</>}
        </Button>
        <Button
          onClick={next}
          className={prevButton?.classname}
          disabled={buttonsState.showNextBtn ? false : true}
        >
          {nextButton && nextButton.title ? <>{nextButton.title}</> : <>Next</>}
        </Button>
      </div>
    );

  return (
    <div>
      <ProgressBar percent={75}>
        {steps.map((step: any, i: number) => {
          return (
            <Step key={i}>
              {({
                accomplished,
                index,
              }: {
                accomplished: boolean;
                index: number;
              }) => (
                <div
                  className={`indexedStep ${
                    accomplished ? "accomplished" : ""
                  }`}
                >
                  {index + 1}
                </div>
              )}
            </Step>
          );
        })}
      </ProgressBar>
      {children}
      <div>{renderButtonsNav(prevButton, nextButton)}</div>
    </div>
  );
};
