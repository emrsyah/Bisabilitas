import React from 'react';

interface FullDisplayProps {
  onClick: () => void;
  desc: string;
  children: React.ReactNode;
  currentState: string;
  wider?: boolean;
  turnOnState: string;
}

export const FullDisplayAccesibilityCard: React.FC<FullDisplayProps> = ({
  desc,
  onClick,
  children,
  currentState,
  turnOnState,
  wider = false,
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={desc}
      className={`border-card flex flex-col gap-2 items-center justify-center text-sm font-medium p-3 hover:border-blue-600 hover:text-blue-600 ${wider ? 'col-span-2' : ''} ${turnOnState === currentState ? 'border-blue-600 text-blue-600' : ''}`}>
      {children}
    </button>
  );
};
