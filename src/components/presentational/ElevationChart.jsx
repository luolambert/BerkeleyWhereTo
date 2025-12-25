import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AnimatedText } from '../common';
import { useNavigation } from '../../context/NavigationContext';
import useTranslation from '../../hooks/useTranslation';

const ElevationChart = ({ data }) => {
  const { language } = useNavigation();
  const { t } = useTranslation(language);
  
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
        <div className="glass-pro p-3 text-xs shadow-glass-md border border-white/60">
          <p className="font-bold text-indigo-600 mb-1">{`${payload[0].value.toFixed(1)} m`}</p>
          <p className="text-neutral-500 font-medium">{`${label.toFixed(0)} m from start`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, height: 0 }}
      animate={{ opacity: 1, y: 0, height: 'auto' }}
      exit={{ opacity: 0, y: 20, height: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="glass-liquid p-6 w-full overflow-hidden"
    >
      <div className="flex justify-between items-end mb-4">
        <h3 className="text-sm font-bold text-neutral-700/80 uppercase tracking-wide">
          <AnimatedText textKey={`elevProfile-${language}`}>
            {t('map.elevationProfile')}
          </AnimatedText>
        </h3>
        <div className="text-xs text-neutral-500 flex gap-4">
            <span className="bg-white/50 px-2 py-1 rounded-lg backdrop-blur-sm">
              <span className="font-bold text-indigo-600">↑ {totalClimb.toFixed(0)}m</span>{' '}
              <AnimatedText textKey={`climb-${language}`}>{t('map.climb')}</AnimatedText>
            </span>
            <span className="bg-white/50 px-2 py-1 rounded-lg backdrop-blur-sm">
              <span className="font-bold text-indigo-600">{(maxElevation - minElevation).toFixed(0)}m</span>{' '}
              <AnimatedText textKey={`range-${language}`}>{t('map.range')}</AnimatedText>
            </span>
        </div>
      </div>
      
      <div className="h-32 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorElevation" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <XAxis 
                dataKey="distance" 
                type="number" 
                unit="m"
                tick={{fontSize: 10, fill: '#94a3b8'}}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
            />
            <YAxis 
                domain={['auto', 'auto']} 
                tick={{fontSize: 10, fill: '#94a3b8'}}
                tickLine={false}
                axisLine={false}
                width={30}
            />
            <Tooltip 
                cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '3 3' }}
                content={<CustomTooltip />} 
            />
            <Area 
                type="monotone" 
                dataKey="elevation" 
                stroke="#6366f1" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorElevation)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default React.memo(ElevationChart);
