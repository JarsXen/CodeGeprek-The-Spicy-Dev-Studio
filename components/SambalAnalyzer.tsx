import React, { useState } from 'react';
import { analyzeErrorLog } from '../services/geminiService';
import { SambalAnalysis } from '../types';
import { Button } from './Button';
import { AlertTriangle, ChefHat, Copy, Check, Flame, GlassWater } from 'lucide-react';

export const SambalAnalyzer: React.FC = () => {
  const [errorLog, setErrorLog] = useState('');
  const [analysis, setAnalysis] = useState<SambalAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    if (!errorLog.trim()) return;
    setLoading(true);
    setAnalysis(null);
    try {
      const result = await analyzeErrorLog(errorLog);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
      alert("Waduh, cobeknya pecah! (API Error)");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setErrorLog('');
    setAnalysis(null);
  };

  const copyToClipboard = () => {
    if (analysis) {
      navigator.clipboard.writeText(analysis.recipeFix);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getSpicinessColor = (level: number) => {
    if (level <= 3) return 'text-green-400';
    if (level <= 6) return 'text-yellow-400';
    if (level <= 8) return 'text-orange-500';
    return 'text-red-600';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-black text-white">Sambal <span className="text-geprek-red">Debug</span> Analyzer</h2>
        <p className="text-gray-400">Paste error log kamu, Bang Jago akan racik solusinya.</p>
      </div>

      <div className="bg-geprek-paper rounded-2xl p-6 border border-white/10 shadow-xl relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-geprek-red/5 rounded-full blur-3xl pointer-events-none"></div>

        <textarea
          value={errorLog}
          onChange={(e) => setErrorLog(e.target.value)}
          placeholder="Paste error console / stack trace di sini..."
          className="w-full h-40 bg-black/50 rounded-xl p-4 font-mono text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-geprek-orange resize-none border border-white/5 placeholder:text-gray-600"
        />
        <div className="mt-4 flex justify-between items-center">
          <button 
            onClick={handleReset}
            className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg transition-all ${errorLog ? 'text-blue-300 hover:bg-blue-500/10' : 'text-gray-600 cursor-default'}`}
            disabled={!errorLog}
          >
            <GlassWater size={18} />
            <span className="hidden sm:inline">Pesen Es Teh (Reset)</span>
            <span className="sm:hidden">Reset</span>
          </button>
          
          <Button onClick={handleAnalyze} isLoading={loading}>
            {loading ? "Sedang Mengulek..." : "Analisa Kepedasan"}
          </Button>
        </div>
      </div>

      {analysis && (
        <div className="space-y-6 animate-fade-in">
          {/* Result Header Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 bg-geprek-charcoal border border-geprek-red/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-geprek-red/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-b from-geprek-red/10 to-transparent z-0"></div>
              <Flame className={`w-12 h-12 mb-2 ${getSpicinessColor(analysis.spicinessLevel)} drop-shadow-lg`} fill="currentColor" />
              <h3 className="text-lg font-bold text-gray-400 relative z-10">Level Pedas</h3>
              <div className={`text-5xl font-black ${getSpicinessColor(analysis.spicinessLevel)} relative z-10`}>
                {analysis.spicinessLevel}<span className="text-2xl opacity-50">/10</span>
              </div>
              <p className="text-sm font-bold mt-2 text-white relative z-10 bg-white/10 px-3 py-1 rounded-full">{analysis.spicinessLabel}</p>
            </div>

            <div className="col-span-1 md:col-span-2 bg-geprek-paper rounded-2xl p-6 border border-white/10 flex flex-col justify-center relative">
               <div className="absolute top-4 right-4 opacity-10">
                 <AlertTriangle size={80} />
               </div>
               <h3 className="text-xl font-bold text-geprek-yellow mb-2 flex items-center gap-2">
                 <AlertTriangle size={20} /> Flavor Profile
               </h3>
               <p className="text-gray-300 italic text-lg mb-4">"{analysis.flavorProfile}"</p>
               <div className="mt-auto bg-black/30 rounded-xl p-4 border border-white/5">
                 <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bahan Masalah (Root Causes):</h4>
                 <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                   {analysis.rootIngredients.map((ing, idx) => (
                     <li key={idx}>{ing}</li>
                   ))}
                 </ul>
               </div>
            </div>
          </div>

          {/* Solution Card */}
          <div className="bg-geprek-paper rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="bg-[#1e1e1e] p-4 border-b border-white/5 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2">
                <ChefHat className="text-geprek-orange" /> Resep Penawar
              </h3>
              <button 
                onClick={copyToClipboard}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 flex items-center gap-2"
              >
                <span className="text-xs font-medium">Salin</span>
                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
            </div>
            <div className="p-0 overflow-x-auto custom-scrollbar">
              <pre className="p-6 font-mono text-sm text-green-400 bg-[#0d1117] min-w-full">
                <code>{analysis.recipeFix}</code>
              </pre>
            </div>
            <div className="p-6 bg-gradient-to-r from-geprek-red/10 to-transparent border-t border-geprek-red/20">
              <div className="flex gap-4">
                 <div className="min-w-[40px] h-[40px] rounded-full bg-geprek-charcoal border border-geprek-red/50 flex items-center justify-center">
                   <span className="text-xl">👨‍🍳</span>
                 </div>
                 <div>
                    <p className="text-sm font-bold text-geprek-red mb-1">Catatan Bang Jago:</p>
                    <p className="text-geprek-offwhite font-sans text-sm leading-relaxed italic">
                      "{analysis.chefNotes}"
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};