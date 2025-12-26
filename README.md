# BorsaPro

Modern, profesyonel borsa takip uygulaması.

## Özellikler
- **Backend**: Python, FastAPI, Pandas, TA-Lib (Teknik Analiz).
- **Frontend**: React, Vite, TailwindCSS, Recharts.
- **Analiz**: RSI, MACD, Bollinger Bantları, SMA.
- **UI**: Glassmorphism, Dark Mode, Responsive.

## Kurulum ve Çalıştırma

### Otomatik
Ana dizindeki `run_app.bat` dosyasına çift tıklayın.

### Manuel
1. **Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Mimari
- `backend/analysis.py`: Teknik analiz motoru.
- `frontend/src/components/StockChart.jsx`: Profesyonel grafik bileşeni.
