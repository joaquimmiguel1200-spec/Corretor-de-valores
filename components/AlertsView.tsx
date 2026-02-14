
import React, { useState } from 'react';
import { Alert, Asset } from '../types';

interface AlertsViewProps {
  alerts: Alert[];
  assets: Asset[];
  onAddAlert: (alert: Omit<Alert, 'id' | 'createdAt'>) => void;
  onRemoveAlert: (id: string) => void;
}

const AlertsView: React.FC<AlertsViewProps> = ({ alerts, assets, onAddAlert, onRemoveAlert }) => {
  const [selectedAssetId, setSelectedAssetId] = useState(assets[0]?.id || '');
  const [targetPrice, setTargetPrice] = useState('');
  const [condition, setCondition] = useState<'ABOVE' | 'BELOW'>('ABOVE');

  const handleAdd = () => {
    const asset = assets.find(a => a.id === selectedAssetId);
    if (!asset || !targetPrice) return;

    onAddAlert({
      assetId: asset.id,
      symbol: asset.symbol,
      targetPrice: parseFloat(targetPrice),
      condition,
      active: true,
    });
    setTargetPrice('');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Alertas</h2>
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
        <h3 className="font-semibold text-slate-300">Novo Alerta de Preço</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col space-y-1">
            <label className="text-xs text-slate-500 uppercase font-bold">Ativo</label>
            <select 
              value={selectedAssetId}
              onChange={(e) => setSelectedAssetId(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600"
            >
              {assets.map(asset => (
                <option key={asset.id} value={asset.id}>{asset.symbol} - {asset.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-xs text-slate-500 uppercase font-bold">Condição</label>
            <select 
              value={condition}
              onChange={(e) => setCondition(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="ABOVE">Acima de (≥)</option>
              <option value="BELOW">Abaixo de (≤)</option>
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-xs text-slate-500 uppercase font-bold">Preço Alvo</label>
            <input 
              type="number" 
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              placeholder="0,00"
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="flex items-end">
            <button 
              onClick={handleAdd}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl transition-all"
            >
              Criar Alerta
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alerts.map(alert => (
          <div key={alert.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex justify-between items-center group">
            <div>
              <p className="font-bold text-lg">{alert.symbol}</p>
              <p className="text-sm text-slate-400">
                {alert.condition === 'ABOVE' ? 'Preço ≥ ' : 'Preço ≤ '} 
                <span className="text-white font-mono">R$ {alert.targetPrice.toLocaleString('pt-BR')}</span>
              </p>
              <p className="text-[10px] text-slate-500 mt-1 uppercase">Criado em {new Date(alert.createdAt).toLocaleDateString()}</p>
            </div>
            <button 
              onClick={() => onRemoveAlert(alert.id)}
              className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
            >
              🗑️
            </button>
          </div>
        ))}
        {alerts.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 border-2 border-dashed border-slate-800 rounded-2xl">
            Nenhum alerta configurado.
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsView;
