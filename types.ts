
export enum AssetType {
  STOCK = 'Ação',
  CRYPTO = 'Criptomoeda',
  FII = 'FII',
  FIXED_INCOME = 'Renda Fixa',
  FOREX = 'Forex',
  ETF = 'ETF'
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: AssetType;
  price: number;
  change24h: number;
  volume: string;
  volumeValue: number; // For sorting
  dividendYield?: number; // In percentage
  risk: 'Baixo' | 'Médio' | 'Alto';
  liquidity: string;
  description?: string;
}

export interface Alert {
  id: string;
  assetId: string;
  symbol: string;
  targetPrice: number;
  condition: 'ABOVE' | 'BELOW';
  active: boolean;
  createdAt: Date;
}

export interface PortfolioItem {
  assetId: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  invested: number;
  demoBalance: number;
  demoInvested: number;
  profile: 'Conservador' | 'Moderado' | 'Arrojado';
}

export interface Order {
  id: string;
  assetId: string;
  type: 'BUY' | 'SELL';
  price: number;
  quantity: number;
  timestamp: Date;
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED';
  isDemo?: boolean;
}
