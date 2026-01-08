import React from 'react';
import { ButtonProps } from '../types';
import { Loader2 } from 'lucide-react';

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-geprek-red to-geprek-orange text-white shadow-lg shadow-geprek-red/30 hover:shadow-geprek-orange/40 hover:-translate-y-0.5",
    secondary: "bg-geprek-paper text-white border border-white/10 hover:bg-white/10",
    danger: "bg-red-900/50 text-red-200 border border-red-500/30 hover:bg-red-900/80",
    ghost: "text-gray-400 hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <Loader2 className="animate-spin" size={20} /> : null}
      {children}
    </button>
  );
};