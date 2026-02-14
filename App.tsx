
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MarketView from './components/MarketView';
import AlertsView from './components/AlertsView';
import { MOCK_ASSETS } from './constants';
import { User, Asset, Alert } from './types';
import { getInvestmentAdvice } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [aiAdvice, setAiAdvice] = useState<any>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  
  const [user, setUser] = useState<User>({
    id: 'user-123',
    name: 'Davi Silva',
    email: 'davi@example.com',
    balance: 5240.50,
    invested: 102450.00,
    demoBalance: 1000000.00,
    demoInvested: 0.00,
    profile: 'Arrojado'
  });

  useEffect(() => {
    const fetchAdvice = async () => {
      setLoadingAdvice(true);
      const advice = await getInvestmentAdvice(user, MOCK_ASSETS);
      setAiAdvice(advice);
      setLoadingAdvice(false);
    };
    fetchAdvice();
  }, []);

  const handleTrade = (type: 'BUY' | 'SELL', amount: number) => {
    if (!selectedAsset) return;
    const totalCost = selectedAsset.price * amount;

    if (isDemoMode) {
      if (type === 'BUY' && user.demoBalance < totalCost) {
        window.alert('Saldo insuficiente na conta Demo!');
        return;
      }
      setUser(prev => ({
        ...prev,
        demoBalance: type === 'BUY' ? prev.demoBalance - totalCost : prev.demoBalance + totalCost,
        demoInvested: type === 'BUY' ? prev.demoInvested + totalCost : prev.demoInvested - totalCost
      }));
    } else {
      if (type === 'BUY' && user.balance < totalCost) {
        window.alert('Saldo insuficiente na conta Real!');
        return;
      }
      setUser(prev => ({
        ...prev,
        balance: type === 'BUY' ? prev.balance - totalCost : prev.balance + totalCost,
        invested: type === 'BUY' ? prev.invested + totalCost : prev.invested - totalCost
      }));
    }

    window.alert(`Ordem de ${type === 'BUY' ? 'Compra' : 'Venda'} enviada: ${amount}x ${selectedAsset.symbol} na conta ${isDemoMode ? 'DEMO' : 'REAL'}`);
    setSelectedAsset(null);
  };

  const addAlert = (newAlert: Omit<Alert, 'id' | 'createdAt'>) => {
    const alertData: Alert = {
      ...newAlert,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    setAlerts(prev => [...prev, alertData]);
    window.alert(`Alerta de preço configurado para ${alertData.symbol}!`);
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const currentBalance = isDemoMode ? user.demoBalance : user.balance;
  const currentInvested = isDemoMode ? user.demoInvested : user.invested;

  return (
    <div className={`flex min-h-screen ${isDemoMode ? 'bg-slate-950 border-4 border-orange-500/20' : 'bg-slate-950'} text-slate-200 transition-all duration-500`}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 flex flex-col min-h-0 overflow-y-auto pb-20 md:pb-0">
        <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-10 px-6 flex items-center justify-between">
          <div className="flex items-center md:hidden">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold mr-2">N</div>
            <span className="font-bold text-lg">NexTrade</span>
          </div>

          <div className="flex items-center space-x-4">
             {/* Demo Mode Toggle */}
             <div className="flex items-center bg-slate-900 border border-slate-800 rounded-full px-3 py-1.5 space-x-3 shadow-inner">
                <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${!isDemoMode ? 'text-green-500' : 'text-slate-500'}`}>Conta Real</span>
                <button 
                  onClick={() => setIsDemoMode(!isDemoMode)}
                  className={`relative inline-flex h-5 w-10 items-center rounded-full transition-all duration-300 focus:outline-none ${isDemoMode ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'bg-slate-700'}`}
                >
                  <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-300 ${isDemoMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
                <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isDemoMode ? 'text-orange-500' : 'text-slate-500'}`}>Modo Demo</span>
             </div>

             <div className="hidden lg:flex items-center space-x-4 px-3 py-1 bg-slate-900 rounded-full border border-slate-800">
                <span className="text-xs text-slate-500 uppercase font-bold">Status:</span>
                <span className={`flex items-center text-xs ${isDemoMode ? 'text-orange-400' : 'text-green-500'}`}>
                  <span className={`w-2 h-2 ${isDemoMode ? 'bg-orange-400' : 'bg-green-500'} rounded-full mr-2 animate-pulse`}></span> 
                  {isDemoMode ? 'Simulação' : 'Mercado Aberto'}
                </span>
             </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && <Dashboard user={{...user, balance: currentBalance, invested: currentInvested}} assets={MOCK_ASSETS} />}
          {activeTab === 'market' && <MarketView assets={MOCK_ASSETS} onSelectAsset={setSelectedAsset} />}
          {activeTab === 'alerts' && <AlertsView alerts={alerts} assets={MOCK_ASSETS} onAddAlert={addAlert} onRemoveAlert={removeAlert} />}
          
          {activeTab === 'dashboard' && (
            <section className="px-6 py-4">
              <div className="bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-blue-900/10 rounded-2xl border border-blue-500/20 p-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-all"></div>
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-2">🤖</span>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Análise NexTrade IA (Python Engine)</h3>
                </div>
                
                {loadingAdvice ? (
                  <div className="flex items-center space-x-2 animate-pulse py-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-slate-500 text-sm ml-2">Analisando tendências com Python ML...</span>
                  </div>
                ) : aiAdvice ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {aiAdvice.advice?.map((item: any, idx: number) => (
                      <div key={idx} className="bg-slate-900/60 p-4 rounded-xl border border-white/5 hover:border-blue-500/40 transition-all cursor-default hover:translate-y-[-2px] shadow-lg">
                        <div className="flex justify-between items-start mb-2">
                           <h4 className="font-bold text-white text-sm">{item.title}</h4>
                           <span className="text-[10px] px-2 py-0.5 bg-blue-600/20 text-blue-400 rounded-full border border-blue-500/20">{item.riskLevel}</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">Inteligência não disponível no momento.</p>
                )}
              </div>
            </section>
          )}
        </div>

        <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 flex justify-around p-3 md:hidden z-20">
          <button onClick={() => setActiveTab('dashboard')} className={`p-2 rounded-lg ${activeTab === 'dashboard' ? 'text-blue-500 bg-blue-500/10' : 'text-slate-400'}`}>📊</button>
          <button onClick={() => setActiveTab('market')} className={`p-2 rounded-lg ${activeTab === 'market' ? 'text-blue-500 bg-blue-500/10' : 'text-slate-400'}`}>📈</button>
          <button onClick={() => setActiveTab('alerts')} className={`p-2 rounded-lg ${activeTab === 'alerts' ? 'text-blue-500 bg-blue-500/10' : 'text-slate-400'}`}>🔔</button>
          <button onClick={() => setActiveTab('settings')} className={`p-2 rounded-lg ${activeTab === 'settings' ? 'text-blue-500 bg-blue-500/10' : 'text-slate-400'}`}>⚙️</button>
        </nav>
      </main>

      {selectedAsset && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-slate-900 w-full max-w-md rounded-2xl border border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
              <div className={`p-4 ${isDemoMode ? 'bg-orange-600/20' : 'bg-blue-600/10'} border-b border-slate-800 flex justify-center items-center`}>
                  <span className={`text-[10px] font-bold tracking-widest uppercase ${isDemoMode ? 'text-orange-500' : 'text-green-500'}`}>
                    Executando em Conta {isDemoMode ? 'DEMO (Simulada)' : 'REAL'}
                  </span>
              </div>
              <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                 <div>
                    <h3 className="text-xl font-bold">Negociar {selectedAsset.symbol}</h3>
                    <p className="text-xs text-slate-500">{selectedAsset.name}</p>
                 </div>
                 <button onClick={() => setSelectedAsset(null)} className="text-slate-500 hover:text-white transition-colors">✕</button>
              </div>
              <div className="p-6 space-y-6">
                 <div className="flex items-center justify-between text-2xl font-bold">
                    <span className="text-slate-400">R$ {selectedAsset.price.toLocaleString('pt-BR')}</span>
                    <span className={selectedAsset.change24h > 0 ? 'text-green-500' : 'text-red-500'}>
                      {selectedAsset.change24h > 0 ? '▲' : '▼'} {Math.abs(selectedAsset.change24h)}%
                    </span>
                 </div>
                 <div className="flex p-1 bg-slate-800 rounded-xl">
                    <button className="flex-1 py-3 rounded-lg bg-green-600 font-bold text-white shadow-lg transition-transform active:scale-95">COMPRA</button>
                    <button className="flex-1 py-3 rounded-lg text-slate-400 hover:text-white font-bold transition-all">VENDA</button>
                 </div>
                 <div className="space-y-4">
                    <div>
                       <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Quantidade</label>
                       <input 
                        type="number" 
                        id="order-amount"
                        defaultValue={1} 
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 font-mono text-lg" 
                       />
                    </div>
                    <div className="flex justify-between text-sm bg-slate-800/30 p-3 rounded-xl border border-white/5">
                       <span className="text-slate-400">Disponível:</span>
                       <span className={`font-bold ${isDemoMode ? 'text-orange-400' : 'text-white'}`}>
                        R$ {currentBalance.toLocaleString('pt-BR')}
                       </span>
                    </div>
                 </div>
                 <button 
                  onClick={() => {
                    const val = (document.getElementById('order-amount') as HTMLInputElement).value;
                    handleTrade('BUY', parseInt(val));
                  }}
                  className={`w-full ${isDemoMode ? 'bg-orange-600 hover:bg-orange-700 shadow-orange-500/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'} text-white font-bold py-4 rounded-xl transition-all shadow-xl transform active:scale-95 flex items-center justify-center space-x-2`}
                 >
                    <span>{isDemoMode ? 'Confirmar Simulação' : 'Confirmar Investimento'}</span>
                 </button>
                 <p className="text-[10px] text-center text-slate-500 px-4">
                   Ao confirmar, sua ordem será processada pelo motor de liquidação NexTrade Pro. Taxas de corretagem: zero.
                 </p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
