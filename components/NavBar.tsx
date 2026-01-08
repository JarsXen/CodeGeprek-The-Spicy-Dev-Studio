import React from 'react';
import { ViewState } from '../types';
import { Flame, Code2, UtensilsCrossed } from 'lucide-react';

interface NavBarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ currentView, setView }) => {
  const navItemClass = (view: ViewState) => 
    `relative flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full transition-all duration-300 font-bold overflow-hidden text-xs sm:text-base ${
      currentView === view 
        ? 'text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] transform scale-105' 
        : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`;

  const activeBackground = (view: ViewState) => currentView === view && (
    <div className="absolute inset-0 bg-gradient-to-r from-geprek-red to-geprek-orange opacity-100 -z-10 rounded-full"></div>
  );

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b-0">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group" onClick={() => setView('home')}>
          <div className="relative">
            <div className="absolute inset-0 bg-geprek-red blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-gradient-to-tr from-geprek-red to-geprek-orange p-1.5 sm:p-2 rounded-xl rotate-3 group-hover:rotate-12 transition-transform duration-300">
              <Flame className="text-white w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tighter text-white">
            Code<span className="text-transparent bg-clip-text bg-gradient-to-r from-geprek-red to-geprek-yellow">Geprek</span>
          </h1>
        </div>

        <div className="w-full sm:w-auto flex justify-center sm:justify-start bg-black/40 p-1 rounded-full border border-white/5 backdrop-blur-md">
          <div className="grid grid-cols-3 w-full sm:w-auto sm:flex sm:gap-1">
            <button onClick={() => setView('home')} className={navItemClass('home')}>
              {activeBackground('home')}
              <UtensilsCrossed size={14} className="sm:w-[18px] sm:h-[18px]" />
              <span>Menu</span>
            </button>
            <button onClick={() => setView('analyzer')} className={navItemClass('analyzer')}>
              {activeBackground('analyzer')}
              <Flame size={14} className="sm:w-[18px] sm:h-[18px]" />
              <span>Sambal</span>
            </button>
            <button onClick={() => setView('kitchen')} className={navItemClass('kitchen')}>
              {activeBackground('kitchen')}
              <Code2 size={14} className="sm:w-[18px] sm:h-[18px]" />
              <span>Dapur</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};