import React from "react";

interface ButtonProps {
  children: React.ReactNode; 
  onClick?: () => void; 
  disabled?: boolean; 
  className?: string; 
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, disabled = false, className = "" }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};
