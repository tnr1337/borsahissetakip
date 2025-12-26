import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, TrendingUp, BarChart2, Briefcase, Globe, Activity } from 'lucide-react';
import StockChart from './components/StockChart';
import { cn } from './lib/utils';

const API_URL = "http://localhost:8000/api";

function App() {
  const [symbol, setSymbol] = useState("ASELS");
  const [inputSymbol, setInputSymbol] = useState("ASELS");
  const [stockData, setStockData] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [stockRes, infoRes] = await Promise.all([
        axios.get(`${API_URL}/stock/${symbol}`),
        axios.get(`${API_URL}/company/${symbol}`)
      ]);
      setStockData(stockRes.data);
      setCompanyInfo(infoRes.data);
    } catch (err) {
      console.error(err);
      setError("Veri alınırken hata oluştu. Sembolü kontrol edin veya backend'in çalıştığından emin olun.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [symbol]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputSymbol.trim()) {
      setSymbol(inputSymbol.toUpperCase());
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a0a] text-gray-100 font-sans selection:bg-brand-primary/30">

      {/* Sidebar */}
      <aside className="w-64 border-r border-dark-border bg-dark-card/30 flex flex-col p-4 hidden md:flex">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center">
            <TrendingUp className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            BorsaPro
          </h1>
        </div>

        <nav className="space-y-2">
          <div className="px-4 py-2 rounded-lg bg-brand-primary/10 text-brand-primary font-medium flex items-center gap-3">
            <Activity size={18} />
            Dashboard
          </div>
          <div className="px-4 py-2 rounded-lg text-gray-400 hover:text-gray-100 hover:bg-dark-card/50 transition-colors flex items-center gap-3 cursor-not-allowed">
            <BarChart2 size={18} />
            Portföy (Yakında)
          </div>
        </nav>

        <div className="mt-auto p-4 rounded-xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/10">
          <h4 className="text-sm font-semibold text-blue-200 mb-1">PRO Üyelik</h4>
          <p className="text-xs text-blue-300/60 mb-3">AI analizleri ve limitsiz veri için yükseltin.</p>
          <button className="w-full py-1.5 rounded-lg bg-brand-primary text-xs font-semibold hover:bg-blue-600 transition-colors">
            Yükselt
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-dark-border bg-dark-bg/50 backdrop-blur-md flex items-center justify-between px-6 z-10">
          <form onSubmit={handleSearch} className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              value={inputSymbol}
              onChange={(e) => setInputSymbol(e.target.value)}
              placeholder="Hisse ara (örn: THYAO, GARAN)..."
              className="w-full bg-dark-card border border-dark-border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-primary transition-all text-gray-200 placeholder:text-gray-600"
            />
          </form>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-400">Piyasa Durumu</p>
              <p className="text-sm font-medium text-green-400 flex items-center gap-1">
                ● Açık
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500" />
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Main Chart Section */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  {companyInfo?.name || symbol}
                  <span className="text-sm font-normal text-gray-500 px-2 py-0.5 rounded border border-dark-border">
                    {symbol}
                  </span>
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  {companyInfo?.sector} • {companyInfo?.industry}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg bg-dark-card border border-dark-border text-sm hover:bg-dark-border transition-colors">1G</button>
                <button className="px-3 py-1.5 rounded-lg bg-brand-primary text-white text-sm">1Y</button>
                <button className="px-3 py-1.5 rounded-lg bg-dark-card border border-dark-border text-sm hover:bg-dark-border transition-colors">5Y</button>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
                {error}
              </div>
            )}

            <div className="glass-panel p-4 h-[650px]">
              {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
                </div>
              ) : (
                <StockChart data={stockData} symbol={symbol} />
              )}
            </div>
          </div>

          {/* Right Panel: Company Info */}
          <div className="space-y-6">
            <div className="glass-panel p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-200">
                <Briefcase className="w-4 h-4 text-brand-accent" />
                Şirket Özeti
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed line-clamp-[10]">
                {companyInfo?.summary}
              </p>

              <div className="mt-4 pt-4 border-t border-dark-border space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Piyasa Değeri</span>
                  <span className="text-gray-200">{companyInfo?.marketCap?.toLocaleString()} ₺</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">F/K Oranı</span>
                  <span className="text-gray-200">{companyInfo?.peRatio?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Temettü</span>
                  <span className="text-gray-200">{(companyInfo?.dividendYield * 100)?.toFixed(2)}%</span>
                </div>
              </div>

              {companyInfo?.website && (
                <a href={companyInfo.website} target="_blank" rel="noreferrer" className="mt-4 block w-full py-2 text-center rounded-lg bg-dark-card hover:bg-brand-primary/10 hover:text-brand-primary border border-dark-border transition-all text-sm">
                  Web Sitesi
                </a>
              )}
            </div>

            <div className="glass-panel p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Activity size={100} />
              </div>
              <h3 className="font-semibold mb-2 text-gray-200">AI Analizi</h3>
              <div className="space-y-2">
                <div className="p-2 rounded bg-green-500/10 border border-green-500/20">
                  <span className="text-xs font-bold text-green-400">GÜÇLÜ AL</span>
                  <p className="text-xs text-gray-400 mt-1">RSI ve MACD pozitif uyumsuzluk gösteriyor.</p>
                </div>
                <div className="p-2 rounded bg-blue-500/10 border border-blue-500/20">
                  <span className="text-xs font-bold text-blue-400">HEDEF: 65.00 TL</span>
                  <p className="text-xs text-gray-400 mt-1">Teknik formasyon hedefi.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
