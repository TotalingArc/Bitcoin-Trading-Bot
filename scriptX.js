require('dotenv').config();
const ccxt = require('ccxt');

// Initialize exchanges
const binance = new ccxt.binance({
    apiKey: process.env.BINANCE_API_KEY,
    secret: process.env.BINANCE_API_SECRET
});

const coinbase = new ccxt.coinbasepro({
    apiKey: process.env.COINBASE_API_KEY,
    secret: process.env.COINBASE_API_SECRET
});

// Trade Parameters
const symbol = 'BTC/USD';
const type = 'limit';
const tradeAmount = '0.001'; // BTC amount
const profitThreshold = 10;

const checkArbitrageOpportunity = async () => {
    try {
        // Fetch order books asynchronously
        const [binanceOrderBook, coinbaseOrderBook] = await Promise.all([
            binance.fetchOrderBook(symbol),
            coinbase.fetchOrderBook(symbol)
        ]);

        const binanceBestAsk = binanceOrderBook.asks[0][0];
        const binanceBestBid = binanceOrderBook.bids[0][0];
        const coinbaseBestAsk = coinbaseOrderBook.asks[0][0];
        const coinbaseBestBid = coinbaseOrderBook.bids[0][0];

        console.log('Binance order book');
        console.log(binanceOrderBook.asks);

        console.log(`Best bid on Binance: ${binanceBestBid}`);
        console.log(`Best ask on Binance: ${binanceBestAsk}`);
        console.log(`Best bid on Coinbase: ${coinbaseBestBid}`);
        console.log(`Best ask on Coinbase: ${coinbaseBestAsk}`);

        // Check for arbitrage opportunity
        if (coinbaseBestBid - binanceBestAsk > profitThreshold) {
            console.log(`Arbitrage opportunity found: Buy on Binance at ${binanceBestAsk} and sell on Coinbase at ${coinbaseBestBid}`);
            await executeArbitrageTrade(binance, coinbaseBestAsk, coinbase, binanceBestBid);
        } else if (binanceBestBid - coinbaseBestAsk > profitThreshold) {
            console.log(`Arbitrage opportunity found: Buy on Coinbase at ${coinbaseBestAsk} and sell on Binance at ${binanceBestBid}`);
            await executeArbitrageTrade(coinbase, coinbaseBestAsk, binance, binanceBestBid);
        }
    } catch (error) {
        console.error('Error during arbitrage check:', error);
    }
}

const executeArbitrageTrade = async (buyExchange, buyPrice, sellExchange, sellPrice) => {
    try {
        // Place buy and sell orders asynchronously
        const [buyOrder, sellOrder] = await Promise.all([
            buyExchange.createOrder(symbol, type, 'buy', tradeAmount, buyPrice),
            sellExchange.createOrder(symbol, type, 'sell', tradeAmount, sellPrice)
        ]);
        console.log('Arbitrage trade executed successfully:', buyOrder, sellOrder);
    } catch (error) {
        console.error('Error executing arbitrage trade:', error);
    }
}

// Interval for checking arbitrage opportunities
setInterval(checkArbitrageOpportunity, 60000); // Check every minute
