import React from 'react';
import {
    ComposedChart,
    Line,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Bar,
    Legend
} from 'recharts';

const StockChart = ({ data, symbol }) => {
    if (!data || data.length === 0) {
        return (
            <div className="h-[500px] flex items-center justify-center text-gray-400">
                Veri bekleniyor...
            </div>
        );
    }

    return (
        <div className="w-full h-[600px] flex flex-col gap-4">
            <div className="h-[400px] w-full">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Fiyat & Bollinger Bantları</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data}>
                        <defs>
                            <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis
                            dataKey="Date"
                            tickFormatter={(date) => new Date(date).toLocaleDateString("tr-TR")}
                            stroke="#666"
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis stroke="#666" domain={['auto', 'auto']} tick={{ fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#171717', border: '1px solid #333' }}
                            itemStyle={{ color: '#fff' }}
                            labelStyle={{ color: '#aaa' }}
                            labelFormatter={(date) => new Date(date).toLocaleDateString("tr-TR")}
                        />
                        <Legend />
                        <Area type="monotone" dataKey="Close" stroke="#3b82f6" fillOpacity={1} fill="url(#colorClose)" name="Fiyat" />
                        <Line type="monotone" dataKey="SMA_20" stroke="#f59e0b" dot={false} strokeWidth={1} name="SMA 20" />
                        <Line type="monotone" dataKey="SMA_50" stroke="#10b981" dot={false} strokeWidth={1} name="SMA 50" />

                        {/* Bollinger Bands */}
                        <Line type="monotone" dataKey="BB_High" stroke="#6366f1" strokeDasharray="5 5" dot={false} strokeWidth={1} name="BB High" />
                        <Line type="monotone" dataKey="BB_Low" stroke="#6366f1" strokeDasharray="5 5" dot={false} strokeWidth={1} name="BB Low" />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            <div className="h-[180px] w-full grid grid-cols-2 gap-4">
                <div className="glass-panel p-2">
                    <h3 className="text-xs font-medium text-gray-400 mb-1">RSI (14)</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="Date" hide />
                            <YAxis domain={[0, 100]} stroke="#666" tick={{ fontSize: 10 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#171717', border: '1px solid #333' }}
                                labelFormatter={() => ''}
                            />
                            <Line type="monotone" dataKey="RSI" stroke="#a855f7" dot={false} strokeWidth={2} />
                            {/* RSI Levels */}
                            <Line type="monotone" dataKey={() => 70} stroke="#ef4444" strokeDasharray="3 3" strokeWidth={1} dot={false} />
                            <Line type="monotone" dataKey={() => 30} stroke="#22c55e" strokeDasharray="3 3" strokeWidth={1} dot={false} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
                <div className="glass-panel p-2">
                    <h3 className="text-xs font-medium text-gray-400 mb-1">MACD</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="Date" hide />
                            <YAxis stroke="#666" tick={{ fontSize: 10 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#171717', border: '1px solid #333' }}
                                labelFormatter={() => ''}
                            />
                            <Line type="monotone" dataKey="MACD" stroke="#3b82f6" dot={false} strokeWidth={1.5} />
                            <Line type="monotone" dataKey="MACD_Signal" stroke="#f97316" dot={false} strokeWidth={1.5} />
                            <Bar dataKey="MACD_Diff" fill="#10b981" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default StockChart;
