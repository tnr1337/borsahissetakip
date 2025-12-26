from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from backend.analysis import get_stock_data, get_company_info
import uvicorn
import os

app = FastAPI(
    title="Borsa Hisse Takip API",
    description="Professional Stock Tracking API with Technical Analysis",
    version="1.0.0"
)

# CORS Configuration
origins = [
    "http://localhost:5173",  # Vite default port
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"message": "Borsa Hisse Takip API is running. Go to /docs for Swagger UI."}

@app.get("/api/stock/{symbol}")
async def read_stock(symbol: str, period: str = "1y", interval: str = "1d"):
    """
    Get stock data with technical indicators.
    """
    try:
        data = get_stock_data(symbol, period, interval)
        if not data:
            raise HTTPException(status_code=404, detail=f"Stock data not found for symbol: {symbol}")
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/company/{symbol}")
async def read_company(symbol: str):
    """
    Get company profile information.
    """
    try:
        info = get_company_info(symbol)
        if not info:
             raise HTTPException(status_code=404, detail=f"Company info not found for symbol: {symbol}")
        return info
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
