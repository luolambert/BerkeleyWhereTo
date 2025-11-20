import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ElevationChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Calculate stats
  const minElevation = Math.min(...data.map(d => d.elevation));
  const maxElevation = Math.max(...data.map(d => d.elevation));
  const totalDistance = data[data.length - 1].distance;
  
  // Calculate total climb (sum of positive elevation changes)
  let totalClimb = 0;
  for (let i = 1; i < data.length; i++) {
    const diff = data[i].elevation - data[i-1].elevation;
    if (diff > 0) totalClimb += diff;
  }

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-lg rounded-lg text-xs">
          <p className="font-bold text-gray-700">{`${payload[0].value.toFixed(1)} m`}</p>
          <p className="text-gray-500">{`${label.toFixed(0)} m from start`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 w-full">
      <div className="flex justify-between items-end mb-2">
        <h3 className="text-sm font-bold text-gray-800">Elevation Profile</h3>
        <div className="text-xs text-gray-500 flex gap-3">
            <span><span className="font-semibold text-gray-700">↑ {totalClimb.toFixed(0)}m</span> Climb</span>
            <span><span className="font-semibold text-gray-700">{(maxElevation - minElevation).toFixed(0)}m</span> Range</span>
        </div>
      </div>
      
      <div className="h-32 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 0, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorElevation" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <XAxis 
                dataKey="distance" 
                type="number" 
                unit="m"
                tick={{fontSize: 10, fill: '#9CA3AF'}}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
            />
            <YAxis 
                domain={['auto', 'auto']} 
                tick={{fontSize: 10, fill: '#9CA3AF'}}
                tickLine={false}
                axisLine={false}
                width={30}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
                type="monotone" 
                dataKey="elevation" 
                stroke="#3B82F6" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorElevation)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ElevationChart;
