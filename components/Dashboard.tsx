
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { User, Asset } from '../types';

interface DashboardProps {
  user: User;
  assets: Asset[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, assets }) => {
  const chartData = [
    { name: 'Renda Variável', value: user.invested * 0.45, color: '#3b82f6' },
    { name: 'Cripto', value: user.invested * 0.25, color: '#8b5cf6' },
    { name: 'Renda Fixa', value: user.invested * 0.30, color: '#10b981' },
  ];

  const historyData = [
    { name: 'Jan', value: user.invested * 0.85 },
    { name: 'Fev', value: user.invested * 0.92 },
    { name: 'Mar', value: user.invested * 0.88 },
    { name: 'Abr', value: user.invested * 0.95 },
    { name: 'Mai', value: user.invested * 1.05 },
    { name: 'Jun', value: user.invested },
  ];

  // Determine chart color based on trend
  const isTrendUp = historyData[historyData.length - 1].value >= historyData[0].value;
  const chartColor = isTrendUp ? '#10b981' : '#ef4444';

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Resumo Financeiro</h1>
          <p className="text-slate-400">Dados processados em tempo real.</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95">Depositar</button>
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all border border-slate-700 active:scale-95">Relatórios</button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl hover:border-slate-700 transition-colors">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Patrimônio Investido</p>
          <h3 className="text-3xl font-bold text-white">R$ {user.invested.toLocaleString('pt-BR')}</h3>
          <div className={`mt-3 flex items-center text-xs font-bold ${isTrendUp ? 'text-green-500' : 'text-red-500'}`}>
            <span className="mr-1">{isTrendUp ? '▲' : '▼'}</span> +R$ 2.450,20 (2.4%) este mês
          </div>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl hover:border-slate-700 transition-colors">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Poder de Compra</p>
          <h3 className="text-3xl font-bold text-white">R$ {user.balance.toLocaleString('pt-BR')}</h3>
          <p className="text-slate-500 text-xs mt-3 underline cursor-pointer hover:text-slate-300 transition-colors">Gerenciar contas e PIX</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl hover:border-slate-700 transition-colors">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Performance Global</p>
          <h3 className="text-3xl font-bold text-blue-500">+12.4%</h3>
          <p className="text-slate-500 text-xs mt-3 italic">Alpha vs IBOV: +4.2%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Area Chart */}
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <h4 className="font-bold text-lg">Histórico de Rentabilidade</h4>
            <div className="flex bg-slate-800 rounded-lg p-1">
              <button className="px-3 py-1 text-xs font-bold rounded-md bg-slate-700 text-white">1M</button>
              <button className="px-3 py-1 text-xs font-bold rounded-md text-slate-400">6M</button>
              <button className="px-3 py-1 text-xs font-bold rounded-md text-slate-400">1A</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historyData}>
                <defs>
                  <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColor} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#475569" fontSize={11} axisLine={false} tickLine={false} />
                <YAxis hide domain={['dataMin - 5000', 'dataMax + 5000']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={chartColor} 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorTrend)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <h4 className="font-bold text-lg mb-8">Composição da Carteira</h4>
          <div className="h-[220px] w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {chartData.map((item, i) => (
              <div key={i} className="flex items-center justify-between group cursor-default">
                <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 rounded-full shadow-lg" style={{ backgroundColor: item.color }}></div>
                  <span className="text-slate-400 group-hover:text-slate-200 transition-colors">{item.name}</span>
                </div>
                <span className="font-mono text-sm font-bold">R$ {(item.value / 1000).toFixed(1)}k</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
