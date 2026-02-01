
import React from 'react';
import {
  BarChart, Bar, LineChart, Line, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie, Legend
} from 'recharts';
import { AnalyticsResult } from '../types';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

interface Props {
  result: AnalyticsResult;
}

const ChartRenderer: React.FC<Props> = ({ result }) => {
  const { query, data, timestamp } = result;
  
  const renderChart = () => {
    // Unique key per result forces Recharts to recalculate scales correctly
    const chartKey = `chart-${timestamp}`;

    switch (query.chartType) {
      case 'line':
        return (
          <LineChart data={data} key={chartKey}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis 
              dataKey={query.xAxisKey} 
              stroke="#94a3b8" 
              fontSize={11} 
              tickLine={false}
              axisLine={false}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: 'white' }}
              itemStyle={{ color: 'white' }}
            />
            <Line 
              type="monotone" 
              dataKey={query.yAxisKey} 
              stroke="#6366f1" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#6366f1', strokeWidth: 2 }} 
              activeDot={{ r: 6, strokeWidth: 0 }} 
            />
          </LineChart>
        );

      case 'scatter':
        return (
          <ScatterChart key={chartKey}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis type="category" dataKey={query.xAxisKey} name="Player" stroke="#94a3b8" fontSize={11} />
            <YAxis type="number" dataKey={query.yAxisKey} name="Value" stroke="#94a3b8" fontSize={11} />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: 'white' }}
              itemStyle={{ color: 'white' }}
            />
            <Scatter name="Stats" data={data} fill="#6366f1" />
          </ScatterChart>
        );

      case 'pie':
        return (
          <PieChart key={chartKey}>
            <Pie
              data={data}
              dataKey={query.yAxisKey}
              nameKey={query.xAxisKey}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={60}
              paddingAngle={5}
              label={({ name, value }) => `${name}`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: 'white' }}
              itemStyle={{ color: 'white' }}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        );

      case 'bar':
      default:
        return (
          <BarChart 
            data={data} 
            layout="vertical" 
            key={chartKey}
            margin={{ left: 20, right: 40, top: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
            <XAxis 
              type="number" 
              stroke="#94a3b8" 
              fontSize={11} 
              domain={[0, 'auto']} 
              hide={data.length === 0}
            />
            <YAxis 
              dataKey={query.xAxisKey} 
              type="category" 
              stroke="#94a3b8" 
              fontSize={11} 
              width={100}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: 'white' }}
              itemStyle={{ color: 'white' }}
            />
            <Bar 
              dataKey={query.yAxisKey} 
              radius={[0, 4, 4, 0]} 
              barSize={24}
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        );
    }
  };

  return (
    <div className="w-full bg-slate-900/40 p-6 rounded-3xl border border-slate-800/60 shadow-2xl backdrop-blur-md">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white tracking-tight">{query.insightTitle}</h3>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed max-w-2xl">{query.explanation}</p>
      </div>
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartRenderer;
