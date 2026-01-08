import React, { useState } from 'react';
import { cookComponent } from '../services/geminiService';
import { Button } from './Button';
import { Code2, Copy, Check, Terminal, ChefHat, Flame, Receipt } from 'lucide-react';

const PAKET_HEMAT = [
  {
    id: 'login',
    name: 'Paket Login Crispy',
    desc: 'Form login modern glassmorphism + validasi',
    prompt: 'Buatin form login modern dengan gaya glassmorphism. Ada input email, password, tombol "Masuk", dan "Lupa Password". Pake validasi sederhana dan icon Lucide.'
  },
  {
    id: 'card',
    name: 'Paket Card Balado',
    desc: 'Product card dengan badge diskon & rating',
    prompt: 'Buatin component Product Card e-commerce. Ada gambar placeholder, judul produk, harga coret, harga asli, rating bintang, dan tombol "Tambah ke Keranjang" warna oranye.'
  },
  {
    id: 'nav',
    name: 'Paket Navbar Spesial',
    desc: 'Responsive navbar + mobile menu',
    prompt: 'Buatin Responsive Navbar. Logo di kiri, menu di kanan. Kalau di mobile jadi hamburger menu yang bisa di-toggle. Warnanya dark theme elegan.'
  },
  {
    id: 'table',
    name: 'Paket Tabel Dashboard',
    desc: 'Tabel data user dengan status badge',
    prompt: 'Buatin component Tabel Dashboard untuk data user. Kolom: Nama, Email, Role, dan Status (Active/Inactive pake badge warna). Design minimalis bersih.'
  }
];

type SpiceLevel = 'cupu' | 'sedang' | 'setan';

export const ComponentKitchen: React.FC = () => {
  const [order, setOrder] = useState('');
  const [spiceLevel, setSpiceLevel] = useState<SpiceLevel>('sedang');
  const [resultCode, setResultCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleCook = async () => {
    if (!order.trim()) return;
    setLoading(true);
    setResultCode('');
    setOrderId(`ORD-${Math.floor(Math.random() * 10000)}`);
    try {
      const result = await cookComponent(order, spiceLevel);
      setResultCode(result);
    } catch (error) {
      console.error(error);
      setResultCode("// Maaf, gas habis. Gagal generate code.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(resultCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
       <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-black text-white">Dapur <span className="text-geprek-yellow">Coding</span></h2>
        <p className="text-gray-400">Mau bikin component apa hari ini? Tentukan level pedasnya!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-geprek-paper p-6 rounded-2xl border border-white/10 h-full flex flex-col">
            
            {/* Level Pedas Selector */}
            <div className="mb-6 p-4 bg-black/30 rounded-xl border border-white/5">
              <label className="flex items-center gap-2 text-sm font-bold text-geprek-red mb-3 uppercase tracking-wide">
                <Flame size={16} /> Pilih Level Pedas (Complexity)
              </label>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSpiceLevel('cupu')}
                  className={`flex-1 p-2 rounded-lg text-xs font-bold transition-all border ${spiceLevel === 'cupu' ? 'bg-green-900/50 border-green-500 text-green-400' : 'bg-transparent border-white/10 text-gray-500 hover:bg-white/5'}`}
                >
                  🌶️ Cupu<br/><span className="text-[10px] font-normal opacity-70">Simple</span>
                </button>
                <button 
                  onClick={() => setSpiceLevel('sedang')}
                  className={`flex-1 p-2 rounded-lg text-xs font-bold transition-all border ${spiceLevel === 'sedang' ? 'bg-orange-900/50 border-orange-500 text-orange-400' : 'bg-transparent border-white/10 text-gray-500 hover:bg-white/5'}`}
                >
                  🌶️🌶️ Sedang<br/><span className="text-[10px] font-normal opacity-70">Standard</span>
                </button>
                <button 
                  onClick={() => setSpiceLevel('setan')}
                  className={`flex-1 p-2 rounded-lg text-xs font-bold transition-all border ${spiceLevel === 'setan' ? 'bg-red-900/50 border-red-500 text-red-400 animate-pulse' : 'bg-transparent border-white/10 text-gray-500 hover:bg-white/5'}`}
                >
                  🌶️🌶️🌶️ Setan<br/><span className="text-[10px] font-normal opacity-70">Advanced</span>
                </button>
              </div>
            </div>

            {/* Menu Paket Hemat */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-bold text-geprek-yellow mb-3 uppercase tracking-wide">
                <ChefHat size={16} /> Menu Paket Hemat (Templates)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PAKET_HEMAT.map((paket) => (
                  <button
                    key={paket.id}
                    onClick={() => setOrder(paket.prompt)}
                    className="group text-left p-3 rounded-xl bg-black/30 border border-white/5 hover:border-geprek-orange/50 hover:bg-white/5 transition-all active:scale-95"
                  >
                    <div className="font-bold text-white text-xs group-hover:text-geprek-orange">{paket.name}</div>
                    <div className="text-[10px] text-gray-500 line-clamp-1">{paket.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Custom Order</label>
            <textarea 
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              placeholder="Contoh: Buatin component Card untuk menampilkan menu ayam geprek, lengkap dengan harga, tombol beli, dan badge level pedas. Pake warna merah dominan."
              className="w-full flex-grow min-h-[150px] bg-black/50 rounded-xl p-4 font-sans text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-geprek-yellow resize-none border border-white/5 placeholder:text-gray-600"
            />
            <div className="mt-4">
               <Button onClick={handleCook} isLoading={loading} className="w-full">
                 {loading ? "Sedang Menggoreng..." : "Masak Component (Cook)"}
               </Button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-7 relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-geprek-yellow/20 to-geprek-red/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
          <div className="relative bg-[#1e1e1e] rounded-2xl border border-white/10 overflow-hidden flex flex-col h-[600px] lg:h-[700px]">
            
            {/* Struk Header */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-b-4 border-dashed border-gray-300 relative">
               <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-black font-mono font-bold text-sm">
                    <Receipt size={16} /> STRUK ORDERAN
                  </div>
                  <div className="text-[10px] font-mono text-gray-600">
                    ID: {orderId || '---'} | KASIR: BANG JAGO
                  </div>
               </div>
               {resultCode && (
                <button 
                  onClick={copyToClipboard}
                  className="text-black hover:text-geprek-red transition-colors flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded border border-gray-300 hover:bg-white"
                >
                  <span className="text-xs font-bold font-mono">SALIN RESEP</span>
                  {copied ? <Check size={14} className="text-green-600"/> : <Copy size={14} />}
                </button>
              )}
            </div>

            <div className="flex-grow overflow-auto p-4 custom-scrollbar bg-[#1e1e1e]">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-geprek-orange blur-xl opacity-20 animate-pulse"></div>
                    <Code2 className="animate-spin w-12 h-12 text-geprek-orange relative z-10" />
                  </div>
                  <p className="font-mono text-sm animate-pulse text-geprek-yellow">Sedang meracik syntax...</p>
                </div>
              ) : resultCode ? (
                <div className="relative">
                    <div className="absolute top-0 right-0 p-2 opacity-50 pointer-events-none">
                        <ChefHat className="text-white w-24 h-24 opacity-5 rotate-12" />
                    </div>
                    <pre className="font-mono text-xs sm:text-sm text-blue-300 whitespace-pre">
                    <code>{resultCode}</code>
                    </pre>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-600 font-mono text-sm gap-2">
                  <Terminal size={40} className="opacity-20" />
                  <p>// Code result will appear here...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};