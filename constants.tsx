
import { Asset, AssetType } from './types';

export const MOCK_ASSETS: Asset[] = [
  { id: '1', symbol: 'PETR4', name: 'Petrobras', type: AssetType.STOCK, price: 34.52, change24h: 1.25, volume: '2.1B', volumeValue: 2100000000, dividendYield: 14.5, risk: 'Médio', liquidity: 'Alta' },
  { id: '2', symbol: 'VALE3', name: 'Vale SA', type: AssetType.STOCK, price: 68.12, change24h: -0.45, volume: '1.8B', volumeValue: 1800000000, dividendYield: 8.2, risk: 'Médio', liquidity: 'Alta' },
  { id: '3', symbol: 'BTC', name: 'Bitcoin', type: AssetType.CRYPTO, price: 64230.15, change24h: 3.12, volume: '45B', volumeValue: 45000000000, risk: 'Alto', liquidity: 'Alta' },
  { id: '4', symbol: 'ETH', name: 'Ethereum', type: AssetType.CRYPTO, price: 3450.20, change24h: 2.15, volume: '15B', volumeValue: 15000000000, risk: 'Alto', liquidity: 'Alta' },
  { id: '5', symbol: 'MXRF11', name: 'Maxi Renda', type: AssetType.FII, price: 10.45, change24h: 0.05, volume: '12M', volumeValue: 12000000, dividendYield: 12.8, risk: 'Baixo', liquidity: 'Alta' },
  { id: '6', symbol: 'HGLG11', name: 'CGHG Logística', type: AssetType.FII, price: 165.30, change24h: -0.12, volume: '8M', volumeValue: 8000000, dividendYield: 9.1, risk: 'Baixo', liquidity: 'Alta' },
  { id: '7', symbol: 'TESOURO_SELIC', name: 'Tesouro Selic 2029', type: AssetType.FIXED_INCOME, price: 14520.30, change24h: 0.01, volume: 'N/A', volumeValue: 0, risk: 'Baixo', liquidity: 'Diária' },
  { id: '8', symbol: 'SOL', name: 'Solana', type: AssetType.CRYPTO, price: 145.67, change24h: 5.82, volume: '3B', volumeValue: 3000000000, risk: 'Alto', liquidity: 'Alta' },
  { id: '9', symbol: 'AAPL', name: 'Apple Inc', type: AssetType.STOCK, price: 192.32, change24h: 0.85, volume: '5B', volumeValue: 5000000000, dividendYield: 0.5, risk: 'Médio', liquidity: 'Alta' },
  { id: '10', symbol: 'TSLA', name: 'Tesla Inc', type: AssetType.STOCK, price: 175.40, change24h: -2.30, volume: '4B', volumeValue: 4000000000, risk: 'Alto', liquidity: 'Alta' },
  { id: '11', symbol: 'USDBRL', name: 'Dólar Comercial', type: AssetType.FOREX, price: 4.98, change24h: 0.15, volume: '20B', volumeValue: 20000000000, risk: 'Médio', liquidity: 'Alta' },
  { id: '12', symbol: 'EURBRL', name: 'Euro', type: AssetType.FOREX, price: 5.40, change24h: -0.10, volume: '15B', volumeValue: 15000000000, risk: 'Médio', liquidity: 'Alta' },
  { id: '13', symbol: 'MGLU3', name: 'Magazine Luiza', type: AssetType.STOCK, price: 1.85, change24h: -4.50, volume: '300M', volumeValue: 300000000, risk: 'Alto', liquidity: 'Alta' },
  { id: '14', symbol: 'XPML11', name: 'XP Malls', type: AssetType.FII, price: 118.40, change24h: 0.22, volume: '5M', volumeValue: 5000000, dividendYield: 8.8, risk: 'Baixo', liquidity: 'Alta' },
];

export const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'market', label: 'Mercado', icon: '📈' },
  { id: 'portfolio', label: 'Minha Carteira', icon: '💼' },
  { id: 'alerts', label: 'Alertas', icon: '🔔' },
  { id: 'fixed', label: 'Renda Fixa', icon: '🏦' },
  { id: 'crypto', label: 'Cripto', icon: '₿' },
  { id: 'settings', label: 'Configurações', icon: '⚙️' },
];
