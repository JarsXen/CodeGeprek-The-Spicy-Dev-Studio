import React, { useState, useEffect } from 'react';
import { NavBar } from './components/NavBar';
import { ViewState } from './types';
import { SambalAnalyzer } from './components/SambalAnalyzer';
import { ComponentKitchen } from './components/ComponentKitchen';
import { Flame, Code, ArrowRight, Zap } from 'lucide-react';

const FloatingChilies = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div 
          key={i}
          className="absolute text-4xl opacity-20 animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 1.5}s`,
            animationDuration: `${6 + i}s`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        >
          🌶️
        </div>
      ))}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-geprek-red/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-geprek-orange/10 rounded-full blur-[100px]"></div>
    </div>
  );
};

const HeroMascot = () => {
  const [impactText, setImpactText] = useState("PYARR!!");
  const [isCrushing, setIsCrushing] = useState(false);
  const [manualTrigger, setManualTrigger] = useState(0);

  // Auto animation text cycle
  useEffect(() => {
    const texts = ["PYARR!!", "AMBYAR!!", "DUAR!!", "GEPREK!!", "CRUSH!!", "BONCOS!!"];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      if (!isCrushing) { // Only update auto text if not manually crushing
          setImpactText(texts[index]);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [isCrushing]);

  const handleGeprekClick = () => {
      setIsCrushing(true);
      setManualTrigger(prev => prev + 1);
      setImpactText("ADUUH!!"); // Special text when clicked
      
      // Reset state after animation duration to allow re-trigger
      setTimeout(() => {
          setIsCrushing(false);
      }, 500);
  };

  return (
    <div className="relative group mx-auto mb-8 md:mb-12">
        <div 
            className={`relative w-56 h-56 md:w-72 md:h-72 flex items-center justify-center select-none transform scale-90 md:scale-100 cursor-pointer transition-transform active:scale-95 ${isCrushing ? 'animate-shake-impact' : 'animate-shake-impact'}`}
            onClick={handleGeprekClick}
            key={manualTrigger} // Re-renders to restart animation on click
        >
        <div className="absolute inset-0 bg-gradient-to-tr from-geprek-red to-geprek-yellow rounded-full opacity-20 blur-3xl group-hover:opacity-40 transition-opacity"></div>

        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-geprek-yellow z-0 ${isCrushing ? 'animate-impact' : 'animate-impact'}`}></div>

        {/* Fire Effect */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-25 text-6xl md:text-8xl pointer-events-none ${isCrushing ? 'animate-fire-pop' : 'animate-fire-pop'}`}>
            🔥
        </div>

        <div className={`absolute top-0 right-0 z-30 font-black text-2xl md:text-4xl text-white italic transform rotate-12 drop-shadow-[0_4px_0_#EF4444] whitespace-nowrap ${isCrushing ? 'animate-text-pop' : 'animate-text-pop'}`}>
            {impactText}
        </div>

        <div className={`absolute -top-12 -right-12 md:-top-16 md:-right-16 text-7xl md:text-9xl z-20 origin-bottom-right ${isCrushing ? 'animate-hammer-hit' : 'animate-hammer-hit'}`}>
            🔨
        </div>

        <div className="relative z-10 flex items-end justify-center h-full w-full pb-6 md:pb-8">
            <div className={`text-7xl md:text-9xl origin-bottom ${isCrushing ? 'animate-chicken-crush' : 'animate-chicken-crush'}`}>
            🍗
            </div>
        </div>
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 w-36 md:w-48 h-8 md:h-12 bg-black/40 blur-xl rounded-full"></div>
        
        {/* Click Hint */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-geprek-yellow text-xs font-bold whitespace-nowrap bg-black/50 px-3 py-1 rounded-full border border-geprek-yellow/30 pointer-events-none">
            KLIK BUAT GEPREK!
        </div>
        </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const renderContent = () => {
    switch (currentView) {
      case 'analyzer':
        return <SambalAnalyzer />;
      case 'kitchen':
        return <ComponentKitchen />;
      case 'home':
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6 md:space-y-8 animate-fade-in max-w-5xl mx-auto px-4 relative z-10">
            
            <HeroMascot />

            <div className="space-y-4 md:space-y-6 relative">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-geprek-red/20 to-geprek-orange/20 border border-geprek-red/30 px-4 py-1.5 md:px-6 md:py-2 rounded-full">
                <span className="animate-pulse w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-geprek-red"></span>
                <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-geprek-red">
                  Ayam Geprek x Coding x JarsDev
                </span>
              </div>
              
              <h1 className="text-4xl md:text-8xl font-black text-white leading-none tracking-tight">
                CODE
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-geprek-red via-geprek-orange to-geprek-yellow">
                   GEPREK
                </span>
              </h1>
              
              <p className="text-sm md:text-2xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed px-4">
                Coding error? <span className="text-geprek-red font-bold">Geprek aja!</span> <br className="hidden md:block" />
                Satu-satunya IDE dengan cita rasa sambal bawang.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-4xl mt-4 md:mt-8">
              {/* Card 1 */}
              <div 
                className="group glass-panel p-1 rounded-2xl md:rounded-3xl hover:bg-gradient-to-br hover:from-geprek-red hover:to-geprek-orange transition-all duration-500 cursor-pointer hover:-translate-y-2"
                onClick={() => setCurrentView('analyzer')}
              >
                <div className="bg-geprek-charcoal h-full rounded-[14px] md:rounded-[20px] p-6 md:p-8 flex flex-col items-start text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-geprek-red/20 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
                  
                  <div className="bg-gradient-to-br from-geprek-red to-geprek-darkred w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-geprek-red/30 group-hover:rotate-12 transition-transform duration-300">
                    <Flame className="text-white w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-geprek-red transition-colors">Sambal Debugger</h3>
                  <p className="text-xs md:text-base text-gray-400 mb-6 md:mb-8 z-10">Analisa error log, tentukan level pedasnya (1-10), dan dapatkan resep penawar bug.</p>
                  
                  <div className="mt-auto flex items-center text-white text-sm md:text-base font-bold group-hover:gap-3 transition-all">
                    Coba Sekarang <ArrowRight size={18} className="ml-2" />
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div 
                className="group glass-panel p-1 rounded-2xl md:rounded-3xl hover:bg-gradient-to-br hover:from-geprek-yellow hover:to-geprek-orange transition-all duration-500 cursor-pointer hover:-translate-y-2"
                onClick={() => setCurrentView('kitchen')}
              >
                <div className="bg-geprek-charcoal h-full rounded-[14px] md:rounded-[20px] p-6 md:p-8 flex flex-col items-start text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-geprek-yellow/20 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
                  
                  <div className="bg-gradient-to-br from-geprek-yellow to-geprek-orange w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-geprek-yellow/30 group-hover:rotate-12 transition-transform duration-300">
                    <Zap className="text-black w-6 h-6 md:w-8 md:h-8" fill="currentColor" />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-geprek-yellow transition-colors">Dapur Component</h3>
                  <p className="text-xs md:text-base text-gray-400 mb-6 md:mb-8 z-10">Request component UI sesukamu. AI kami akan menggoreng kodingannya dadakan.</p>
                  
                  <div className="mt-auto flex items-center text-white text-sm md:text-base font-bold group-hover:gap-3 transition-all">
                    Mulai Masak <ArrowRight size={18} className="ml-2" />
                  </div>
                </div>
              </div>
            </div>
            
            <footer className="pt-12 md:pt-16 pb-8 text-center text-gray-500 text-xs md:text-sm font-mono space-y-2">
              <p>Dibuat dengan ❤️ dan 🌶️ x Fajar Irwansah</p>
              <p className="opacity-75">Website ini Terinspirasi dari Pashya Putry ✨</p>
            </footer>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-geprek-orange selection:text-white bg-[#101012] text-white">
      <FloatingChilies />
      <NavBar currentView={currentView} setView={setCurrentView} />
      <main className="p-4 md:p-8 relative z-10">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;