import React from 'react';
import { useSprint } from '../../context/SprintContext';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: 'up' | 'down' | 'neutral';
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon, trend }) => {
  const { state } = useSprint();
  const { styles } = state;

  const trendColor =
    trend === 'up' ? '#10B981' : trend === 'down' ? '#EF4444' : styles.textColor;

  return (
    <div
      className="bg-white shadow-md p-5 flex items-center gap-4"
      style={{ borderRadius: `${styles.borderRadius}px` }}
    >
      <span className="text-3xl">{icon}</span>
      <div>
        <p className="text-sm opacity-70">{label}</p>
        <p className="text-2xl font-bold" style={{ color: trendColor }}>
          {value}
          {trend === 'up' && ' ↑'}
          {trend === 'down' && ' ↓'}
        </p>
      </div>
    </div>
  );
};

export default MetricCard;
