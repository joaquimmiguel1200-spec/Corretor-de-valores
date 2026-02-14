
# NexTrade Pro - Documentação Técnica (Corretora Digital)

NexTrade Pro é uma plataforma de corretagem digital moderna, escalável e segura, projetada para oferecer uma experiência de investimento de alto nível (estilo XP/Binance). O "coração" da plataforma é um motor financeiro desenvolvido em **Python**.

## 1. Arquitetura do Sistema

A plataforma segue uma arquitetura de microsserviços desacoplada:

- **Backend (Core)**: Desenvolvido em **Python 3.10+** utilizando **FastAPI**.
  - Responsável pelo motor de ordens (Order Matching Engine).
  - Gestão de riscos e validação de saldo (Real e Demo).
  - Monitoramento de alertas de preço via daemon assíncrono.
  - Integração com IA (Google Gemini) para análise preditiva.
- **Frontend**: Desenvolvido em **React 18** com **TypeScript**.
  - Interface reativa com Tailwind CSS.
  - Gráficos inteligentes com Recharts.
  - Estado global para gerenciamento de Conta Demo vs Real.

## 2. Funcionalidades Detalhadas

### 🐍 Motor Python (main.py)
O backend processa as transações financeiras com foco em baixa latência:
- `POST /trade/execute`: Processa ordens de compra/venda.
- `POST /alerts/create`: Registra triggers de preço no servidor.
- `GET /market/assets`: Provê dados de mercado simulados ou via API externa.

### 🧠 Inteligência NexTrade IA
Utiliza o modelo **Gemini 2.5 Flash** para:
- Analisar o perfil do investidor (Conservador a Arrojado).
- Sugerir rebalanceamento de carteira.
- Gerar sumários de mercado baseados em tendências de Python ML.

### 🎮 Modo Simulação (Conta Demo)
- Saldo virtual de **R$ 1.000.000,00**.
- Espelhamento de preços reais em ambiente isolado.
- Interface com feedback visual (Orange Theme) para evitar confusão com conta real.

## 3. Guia de Instalação e Execução

### Pré-requisitos
- Python 3.10 ou superior.
- Node.js & NPM (para o frontend).

### Executando o Backend (Python)
```bash
pip install fastapi uvicorn pydantic
python main.py
```
O servidor iniciará em `http://localhost:8000`.

### Executando o Frontend
O frontend é carregado automaticamente via `index.html`. Em ambiente de desenvolvimento, certifique-se de que o `process.env.API_KEY` está configurado para o funcionamento da IA.

## 4. Requisitos para Play Store (App Nativo)

Para transformar o NexTrade Pro em um app nativo da Play Store via **TWA (Trusted Web Activity)** ou **Capacitor**, os seguintes requisitos foram implementados:

1.  **Responsividade Total**: Layout adaptável para smartphones, tablets e desktops.
2.  **Manifesto PWA**: Arquivo `manifest.json` incluído para definição de ícones e cores de sistema.
3.  **Segurança HTTPS**: Preparado para execução sob SSL (obrigatório para Play Store).
4.  **Performance**: Carregamento assíncrono de módulos e assets otimizados.
5.  **Iconografia**: Preparado para ícones adaptativos de 192px e 512px.

---

## 5. Modelo SaaS (White-Label)
A plataforma suporta multi-tenancy:
- **Tenant Isolation**: Dados de cada corretora parceira são isolados via `tenant_id` no banco de dados.
- **Custom UI**: Configurações de cores e logos via API dinâmica.
- **Pricing Plans**:
    - *Starter*: Taxas fixas, suporte padrão.
    - *Pro*: Taxas customizáveis, API pública.
    - *Enterprise*: Infra dedicada e auditoria completa.

---
*Aviso Legal: NexTrade Pro é um simulador tecnológico. Não constitui oferta pública de valores mobiliários.*
