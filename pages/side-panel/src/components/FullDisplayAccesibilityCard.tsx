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
      className={`border-card flex flex-col gap-2 items-center justify-center text-sm font-medium p-3 hover:border-yellow-800 hover:text-yellow-800 ${wider ? 'col-span-2' : ''} ${turnOnState === currentState ? 'border-yellow-800 text-yellow-800' : ''}`}>
      {children}
    </button>
  );
};
