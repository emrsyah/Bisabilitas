import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import React from 'react';

interface ControlProps {
  onClick: () => void;
  desc: string;
  children: React.ReactNode;
  currentState: number;
  wider?: boolean;
  normalState: number;
  increaseHandler: () => void;
  decreaseHandler: () => void;
}

export const ControlAccesibilityCard: React.FC<ControlProps> = ({
  desc,
  // onClick,
  decreaseHandler,
  increaseHandler,
  children,
  currentState,
  normalState,
  wider = false,
}) => {
  return (
    <div
      // onClick={onClick}
      aria-label={desc}
      className={`border-card flex flex-col gap-3 items-center justify-center text-sm font-medium px-3 py-4 ${wider ? 'col-span-2' : ''} ${normalState !== currentState ? 'border-blue-600 text-blue-600' : ''}`}>
      {children}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={decreaseHandler}
          className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-800">
          <IconChevronDown className="h-5 w-5 text-white" />
        </button>
        <p className="text-blue-600 font-medium">{currentState}%</p>
        <button
          onClick={increaseHandler}
          className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-800">
          <IconChevronUp className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
};
