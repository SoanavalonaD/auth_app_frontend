import React from 'react';
import { Loader2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
}


export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
    isLoading = false, 
    children, 
    disabled, 
    className = "", 
    ...props 
}) => {
  return (
    <button
        type="submit"
        disabled={isLoading || disabled}
        // Utilisation de twMerge pour combiner proprement les classes Tailwind
        className={twMerge(`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed`, className)}
        {...props}
    >
        {isLoading ? <Loader2 className="animate-spin mr-3" size={24} /> : children}
    </button>
  );
};