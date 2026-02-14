
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uvicorn

app = FastAPI(title="NexTrade Pro Backend", version="1.0.0")

# Models
class Asset(BaseModel):
    id: str
    symbol: str
    name: str
    price: float
    change24h: float
    type: str
    volume: str
    dividend_yield: Optional[float] = None

class Order(BaseModel):
    asset_id: str
    quantity: int
    order_type: str  # BUY or SELL
    is_demo: bool = False

class Alert(BaseModel):
    asset_id: str
    target_price: float
    condition: str # ABOVE or BELOW

# Mock Database
mock_user_balance = {"real": 5240.50, "demo": 1000000.00}
alerts_db = []
orders_history = []

@app.get("/market/assets")
async def get_assets():
    """Retorna os ativos do mercado com dados de simulação em tempo real."""
    return {"status": "success", "data": "MOCK_ASSETS_DATA"}

@app.post("/trade/execute")
async def execute_order(order: Order):
    """Motor de execução de ordens."""
    balance_type = "demo" if order.is_demo else "real"
    # Lógica de validação de saldo e execução
    if mock_user_balance[balance_type] < 0: # Exemplo de verificação
         raise HTTPException(status_code=400, detail="Saldo insuficiente")
    
    orders_history.append({
        "timestamp": datetime.now(),
        **order.dict(),
        "status": "COMPLETED"
    })
    return {"status": "success", "message": "Ordem executada no motor Python"}

@app.post("/alerts/create")
async def create_alert(alert: Alert):
    """Criação de alertas de preço monitorados pelo servidor."""
    alerts_db.append(alert.dict())
    return {"status": "success", "alert_id": len(alerts_db)}

@app.get("/user/portfolio")
async def get_portfolio(is_demo: bool = False):
    """Análise de portfólio e rentabilidade."""
    return {"balance": mock_user_balance["demo" if is_demo else "real"]}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
