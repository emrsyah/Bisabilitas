import React from "react";

interface ToggleProps {
    initialState?: boolean;
    onToggle?: (isOn: boolean) => void;
  }
  
const Toggle: React.FC<ToggleProps> = ({ initialState = false, onToggle }) => {
    const [isOn, setIsOn] = React.useState(initialState);
  
    const handleToggle = () => {
      const newState = !isOn;
      setIsOn(newState);
      if (onToggle) {
        onToggle(newState);
      }
    };
  
    return (
      <button
        onClick={handleToggle}
        className={`
          w-10 h-5 flex items-center rounded-full p-1 cursor-pointer
          ${isOn ? 'bg-yellow-800 justify-end' : 'bg-gray-300 justify-start'}
        `}>
        <div
          className={`
          bg-white w-3 h-3 rounded-full shadow-md transform duration-300 ease-in-out
         
        `}
        />
      </button>
    );
  };
  

  export default Toggle