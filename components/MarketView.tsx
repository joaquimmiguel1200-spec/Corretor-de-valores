
import React, { useState, useMemo } from 'react';
import { Asset, AssetType } from '../types';

interface MarketViewProps {
  assets: Asset[];
  onSelectAsset: (asset: Asset) => void;
}

type SortOption = 'DEFAULT' | 'HIGHEST_GAIN' | 'HIGHEST_LOSS' | 'MOST_TRADED' | 'HIGHEST_DIVIDEND';

const MarketView: React.FC<MarketViewProps> = ({ assets, onSelectAsset }) => {
  const [typeFilter, setTypeFilter] = useState<AssetType | 'ALL'>('ALL');
  const [sortOption, setSortOption] = useState<SortOption>('DEFAULT');
  const [search, setSearch] = useState('');

  const processedAssets = useMemo(() => {
    let result = assets.filter(asset => {
      const matchesType = typeFilter === 'ALL' || asset.type === typeFilter;
      const matchesSearch = asset.symbol.toLowerCase().includes(search.toLowerCase()) || 
                            asset.name.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesSearch;
    });

    switch (sortOption) {
      case 'HIGHEST_GAIN':
        result = [...result].sort((a, b) => b.change24h - a.change24h);
        break;
      case 'HIGHEST_LOSS':
        result = [...result].sort((a, b) => a.change24h - b.change24h);
        break;
      case 'MOST_TRADED':
        result = [...result].sort((a, b) => b.volumeValue - a.volumeValue);
        break;
      case 'HIGHEST_DIVIDEND':
        result = [...result].sort((a, b) => (b.dividendYield || 0) - (a.dividendYield || 0));
        break;
      default:
        break;
    }

    return result;
  }, [assets, typeFilter, sortOption, search]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Mercado</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-3">
          <div className="relative min-w-[200px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
            <input 
              type="text" 
              placeholder="Buscar ativo..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 w-full focus:ring-2 focus:ring-blue-600 outline-none transition-all"
            />
          </div>
          <select 
            className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
            onChange={(e) => setTypeFilter(e.target.value as any)}
            value={typeFilter}
          >
            <option value="ALL">Todos os Tipos</option>
            {Object.values(AssetType).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select 
            className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
            onChange={(e) => setSortOption(e.target.value as any)}
            value={sortOption}
          >
            <option value="DEFAULT">Ordenação Padrão</option>
            <option value="HIGHEST_GAIN">Maior Alta</option>
            <option value="HIGHEST_LOSS">Maior Queda</option>
            <option value="MOST_TRADED">Mais Negociados</option>
            <option value="HIGHEST_DIVIDEND">Maior Dividend Yield</option>
          </select>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Ativo</th>
                <th className="px-6 py-4">Preço</th>
                <th className="px-6 py-4">Variação (24h)</th>
                <th className="px-6 py-4">Volume</th>
                <th className="px-6 py-4">DY (%)</th>
                <th className="px-6 py-4">Risco</th>
                <th className="px-6 py-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {processedAssets.map((asset) => (
                <tr 
                  key={asset.id} 
                  className="hover:bg-slate-800/30 transition-colors cursor-pointer group"
                  onClick={() => onSelectAsset(asset)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center font-bold text-xs">
                        {asset.symbol.substring(0, 2)}
                      </div>
                      <div>
                        <p className="font-bold text-white group-hover:text-blue-400 transition-colors">{asset.symbol}</p>
                        <p className="text-xs text-slate-500">{asset.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono font-medium">
                    {asset.type === AssetType.CRYPTO ? `$${asset.price.toLocaleString('en-US')}` : `R$ ${asset.price.toLocaleString('pt-BR')}`}
                  </td>
                  <td className={`px-6 py-4 font-bold ${asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {asset.change24h > 0 ? '+' : ''}{asset.change24h}%
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">
                    {asset.volume}
                  </td>
                  <td className="px-6 py-4 text-slate-300 text-sm">
                    {asset.dividendYield ? `${asset.dividendYield}%` : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      asset.risk === 'Baixo' ? 'bg-green-500/10 text-green-500' : 
                      asset.risk === 'Médio' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {asset.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-all transform active:scale-95">
                      Negociar
                    </button>
                  </td>
                </tr>
              ))}
              {processedAssets.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500 italic">
                    Nenhum ativo encontrado para os filtros selecionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarketView;
