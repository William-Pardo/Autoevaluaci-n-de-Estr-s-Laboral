import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <div className="bg-gradient-to-br from-unad-primary to-blue-900 p-6 rounded-xl shadow-lg text-white">
      <h4 className="text-lg font-semibold text-unad-secondary truncate">{title}</h4>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default StatCard;
