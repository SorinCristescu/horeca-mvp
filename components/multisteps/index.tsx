"use client";

import React, { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { MultiStepProps, NavButton, Step } from "@/types";
import { Button } from "@/components/ui/button";

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

const getTopNavStyles = (indx: number, length: number): string[] => {
  const styles: string[] = [];
  for (let i = 0; i < length; i++) {
    if (i < indx) {
      styles.push("done");
    } else if (i === indx) {
      styles.push("doing");
    } else {
      styles.push("todo");
    }
  }
  return styles;
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
  activeStep,
  showNavigation,
  showTitles,
  prevButton,
  nextButton,
  direction,
  children,
}) => {
  let stepsArray = [] as Step[];

  if (!stepsArray && !children) {
    throw new Error(
      "You must provide steps or children to Multisteps component"
    );
  }

  const [childIsValid, setChildIsValid] = useState(true);
  const setIsChildInValidState = (isValid: boolean) => setChildIsValid(isValid);

  if (children) {
    let childrenWithProps = React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        signalIfValid: setIsChildInValidState,
      });
    });
    // for backward compatibility we preserve 'steps' with components array:
    stepsArray = childrenWithProps.map((childComponent) => ({
      title: childComponent.props.title,
      component: childComponent,
    }));
  }

  const numberOfSteps = stepsArray.length;
  const showNavButtons =
    typeof showNavigation === "undefined" ? true : showNavigation;
  const _showTitles = typeof showTitles === "undefined" ? true : showTitles;
  const [_activeStep, setActiveStep] = useState(
    getStep(0, activeStep!, numberOfSteps)
  );
  const [stylesState, setStyles] = useState(
    getTopNavStyles(activeStep!, numberOfSteps)
  );
  const [buttonsState, setButtons] = useState(
    getButtonsState(activeStep!, numberOfSteps, childIsValid)
  );

  useEffect(() => {
    setButtons(getButtonsState(_activeStep, numberOfSteps, childIsValid));
    // console.log(`From parent, child in valid state?: ${childIsValid}, button state: ${buttonsState.showNextBtn}`)
  }, [_activeStep, activeStep, childIsValid, numberOfSteps]);

  const setStepState = (indx: number, isValidState?: boolean) => {
    setStyles(getTopNavStyles(indx, numberOfSteps));
    setActiveStep(indx < numberOfSteps ? indx : _activeStep);
    setButtons(getButtonsState(indx, numberOfSteps, isValidState!));
  };

  const next = () => setStepState(_activeStep + 1);
  const previous = () =>
    setStepState(_activeStep > 0 ? _activeStep - 1 : _activeStep);

  const handleOnClick = (evt: { currentTarget: { value: number } }) => {
    if (!childIsValid) {
      console.log("Child not in valid state - no transition");
      return;
    }

    if (
      evt.currentTarget.value === numberOfSteps - 1 &&
      activeStep === numberOfSteps - 1
    ) {
      setStepState(numberOfSteps);
    } else {
      setStepState(evt.currentTarget.value);
    }
  };

  const renderTopNav = () =>
    stepsArray!.map((s, i) => {
      return (
        <li
          className={cn(
            "flex flex-row cursor-pointer py-0 px-[0.7rem] min-w-[6rem] text-center leading-loose border-b-[2px] border-solid border-silver-500 hover:text-[#0fa0ce] before:text-[#0fa0ce] after:content-[\\00a0\\00a0] before:relative before:left-[50%] before:float-left before:w-[1.3rem] before:leading-relaxed before:rounded-full before:-bottom-[3.99rem]",
            stylesState[i] === "todo"
              ? "before:bg-white before:text-silver-500 before:content-[\u039F]"
              : stylesState[i] === "doing"
              ? "before:bg-[#33c3f0] before:text-white before:content-[\u2022]"
              : "before:bg-[#33c3f0] before:text-white before:content-[\u2713]"
          )}
          onClick={handleOnClick}
          key={i}
          value={i}
        >
          {_showTitles && (
            <span className="whitespace-nowrap text-ellipsis overflow-hidden">
              {s.title ?? i + 1}
            </span>
          )}
        </li>
      );
    });

  const renderButtonsNav = (prevButton?: NavButton, nextButton?: NavButton) =>
    showNavButtons && (
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={previous}
          style={prevButton?.style}
          disabled={buttonsState.showPrevBtn ? false : true}
        >
          {prevButton && prevButton.title ? <>{prevButton.title}</> : <>Prev</>}
        </Button>
        <Button
          onClick={next}
          style={nextButton?.style}
          disabled={buttonsState.showNextBtn ? false : true}
        >
          {nextButton && nextButton.title ? <>{nextButton.title}</> : <>Next</>}
        </Button>
      </div>
    );

  return (
    <div className="flex flex-column">
      <ol className="flex pb-[2.2rem] m-0 list-none">{renderTopNav()}</ol>
      {stepsArray![activeStep!].component}
      <div>{renderButtonsNav(prevButton, nextButton)}</div>
    </div>
  );
};
