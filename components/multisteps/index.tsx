"use client";

import React, { useState, useEffect } from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

import { cn } from "@/lib/utils";
import { MultiStepProps } from "@/types";

export const Multisteps: React.FC<MultiStepProps> = ({ activeStep, steps }) => {
  return (
    <div className="my-4 px-2">
      <ProgressBar
        percent={(activeStep * 100) / 2}
        unfilledBackground="rgba(0, 0, 0, 0.1)"
        filledBackground="black"
        height={2}
      >
        {steps.map((step: any, i: number) => {
          return (
            <Step key={i} transition="scale">
              {({
                accomplished,
                index,
              }: {
                accomplished: boolean;
                index: number;
              }) => (
                <div
                  className={cn(
                    "text-black w-[20px] h-[20px] text-[12px] bg-gray-200 rounded-full flex justify-center items-center",
                    accomplished ? "bg-black text-white" : ""
                  )}
                >
                  {index + 1}
                </div>
              )}
            </Step>
          );
        })}
      </ProgressBar>
    </div>
  );
};
