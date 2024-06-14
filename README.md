# Cryptocurrency Arbitrage Bot

This project is a cryptocurrency arbitrage bot that monitors BTC/USD prices on Binance and Coinbase Pro. When it detects an arbitrage opportunity, it executes trades to exploit the price differences.

## Prerequisites

- Node.js (v12.x or higher)
- NPM (v6.x or higher)

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/arbitrage-bot.git
cd arbitrage-bot
```

```bash
npm install
```
#create .env file and add API keys

```plaintext
BINANCE_API_KEY=your_binance_api_key
BINANCE_API_SECRET=your_binance_api_secret
COINBASE_API_KEY=your_coinbase_api_key
COINBASE_API_SECRET=your_coinbase_api_secret
COINBASE_API_PASSPHRASE=your_coinbase_api_passphrase
```

#Run Bot

```bash
node scriptX.js
```
#Configuration
You can adjust the following parameters in the scriptX.js file:

symbol: The trading pair to monitor (default: 'BTC/USD').
type: The type of order to place (default: 'limit').
tradeAmount: The amount of BTC to trade (default: 0.001).
profitThreshold: The minimum price difference to trigger an arbitrage trade (default: 10).

#Important Notes
Use at your own risk: Cryptocurrency trading is highly volatile and can result in significant losses.
API Key Security: Keep your API keys secure and do not share them publicly.
Fees: Consider exchange fees when setting your profitThreshold to ensure trades are profitable after accounting for fees.


