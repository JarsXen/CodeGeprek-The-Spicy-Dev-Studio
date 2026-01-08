import React from 'react';

export type ViewState = 'home' | 'analyzer' | 'kitchen';

export interface SambalAnalysis {
  spicinessLevel: number;
  spicinessLabel: string;
  flavorProfile: string;
  rootIngredients: string[];
  recipeFix: string;
  chefNotes: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  isLoading?: boolean;
}