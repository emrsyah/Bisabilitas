import { ChevronUpIcon } from '@heroicons/react/16/solid';
import React, { useState, useRef, useEffect } from 'react';

interface PopoverProps {
  children: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({  children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const togglePopover = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
        <button onClick={togglePopover} className="bg-white flex items-center justify-center text-blue-800 border-2 border-blue-600 font-bold h-12 w-12 rounded-full">
            <ChevronUpIcon className='h-5 w-5' />
        </button>
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute z-10"
          style={{
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '8px', // Add some space between trigger and popover
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Popover;