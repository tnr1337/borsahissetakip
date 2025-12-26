import yfinance as yf
import pandas as pd
import ta

def get_stock_data(symbol: str, period: str = "1y", interval: str = "1d"):
    """
    Fetches stock data from Yahoo Finance and calculates technical indicators.
    """
    try:
        # Add .IS suffix for Borsa Istanbul if not present
        ticker_symbol = symbol.upper()
        if not ticker_symbol.endswith(".IS"):
            ticker_symbol += ".IS"
        
        # Download data
        df = yf.download(ticker_symbol, period=period, interval=interval, auto_adjust=True)
        
        if df.empty:
            return None
            
        # Ensure flat index if multi-level
        if isinstance(df.columns, pd.MultiIndex):
            df.columns = df.columns.get_level_values(0)

        # Drop rows with NaN in Close
        df.dropna(subset=['Close'], inplace=True)

        # Calculate Technical Indicators
        
        # 1. RSI (Relative Strength Index)
        df['RSI'] = ta.momentum.rsi(df['Close'], window=14)
        
        # 2. MACD (Moving Average Convergence Divergence)
        macd = ta.trend.MACD(df['Close'])
        df['MACD'] = macd.macd()
        df['MACD_Signal'] = macd.macd_signal()
        df['MACD_Diff'] = macd.macd_diff()
        
        # 3. SMA (Simple Moving Average) - 20, 50, 200
        df['SMA_20'] = ta.trend.sma_indicator(df['Close'], window=20)
        df['SMA_50'] = ta.trend.sma_indicator(df['Close'], window=50)
        df['SMA_200'] = ta.trend.sma_indicator(df['Close'], window=200)

        # 4. Bollinger Bands
        bollinger = ta.volatility.BollingerBands(df['Close'])
        df['BB_High'] = bollinger.bollinger_hband()
        df['BB_Low'] = bollinger.bollinger_lband()
        
        # Fill NaN values that result from indicator calculations (e.g. first 14 days for RSI)
        df.fillna(0, inplace=True)
        
        # Reset index to make Date a column
        df.reset_index(inplace=True)
        
        # Format for frontend
        data = df.to_dict(orient="records")
        return data

    except Exception as e:
        print(f"Error fetching data for {symbol}: {e}")
        return None

def get_company_info(symbol: str):
    """
    Fetches company profile information.
    """
    try:
        ticker_symbol = symbol.upper()
        if not ticker_symbol.endswith(".IS"):
            ticker_symbol += ".IS"
            
        ticker = yf.Ticker(ticker_symbol)
        info = ticker.info
        
        return {
            "name": info.get("longName", symbol),
            "sector": info.get("sector", "N/A"),
            "industry": info.get("industry", "N/A"),
            "summary": info.get("longBusinessSummary", "No description available."),
            "website": info.get("website", ""),
            "logo_url": info.get("logo_url", ""),
            "marketCap": info.get("marketCap", 0),
            "peRatio": info.get("trailingPE", 0),
            "dividendYield": info.get("dividendYield", 0)
        }
    except Exception as e:
        print(f"Error fetching info for {symbol}: {e}")
        return {}
