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
        <div className="glass-pro p-2.5 text-xs shadow-glass-md border border-white/60">
          <p className="font-bold text-indigo-600 mb-0.5">{`${payload[0].value.toFixed(1)} m`}</p>
          <p className="text-neutral-500 font-medium">{`${label.toFixed(0)} m from start`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, height: 0 }}
      animate={{ opacity: 1, y: 0, height: 'auto' }}
      exit={{ opacity: 0, y: 10, height: 0 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} // smooth easeOutQuint-ish
      className="glass-liquid w-full overflow-hidden"
    >
      {/* Header row: title on left, stats on right */}
      <div className="flex justify-between items-center px-4 pt-4 pb-2">
        <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">
          <AnimatedText textKey={`elevProfile-${language}`}>
            {t('map.elevationProfile')}
          </AnimatedText>
        </h3>
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50/50 border border-indigo-100/50">
            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">
              <AnimatedText textKey={`climb-${language}`}>{t('map.climb')}</AnimatedText>
            </span>
            <span className="text-xs font-bold text-indigo-600">{totalClimb.toFixed(0)}m</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50/50 border border-indigo-100/50">
            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">
              <AnimatedText textKey={`range-${language}`}>{t('map.range')}</AnimatedText>
            </span>
            <span className="text-xs font-bold text-indigo-600">{(maxElevation - minElevation).toFixed(0)}m</span>
          </div>
        </div>
      </div>
      
      {/* Chart area - expanded height */}
      <div className="h-32 w-full -ml-[6px] relative z-0">
        <ResponsiveContainer width="101%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorElevation" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <XAxis 
                dataKey="distance" 
                type="number" 
                unit="m"
                tick={{fontSize: 9, fill: '#94a3b8'}}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
                dy={-5}
            />
            <YAxis 
                domain={['auto', 'auto']} 
                tick={{fontSize: 9, fill: '#94a3b8'}}
                tickLine={false}
                axisLine={false}
                width={30}
                dx={5}
            />
            <Tooltip 
                cursor={{ stroke: '#6366f1', strokeWidth: 1.5, strokeDasharray: '3 3' }}
                content={<CustomTooltip />} 
                animationDuration={200}
            />
            <Area 
                type="monotone" 
                dataKey="elevation" 
                stroke="#6366f1" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorElevation)" 
                animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default React.memo(ElevationChart);
