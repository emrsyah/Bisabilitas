import React, { useState } from 'react';
import { IconUserScan } from '@tabler/icons-react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <div className=" rounded-md">
      <button
        onClick={toggleAccordion}
        className="w-full py-2 text-left flex justify-between items-center"
      >
        <div className='flex items-center gap-2'>
            <IconUserScan className='h-6 w-6' />
        <p className="font-semibold text-base">{title}</p>
        </div>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="py-1 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;