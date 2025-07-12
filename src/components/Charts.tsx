import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';

interface ChartData {
    name: string;
    value: number;
    [key: string]: any;
}

interface BarChartProps {
    data: ChartData[];
    dataKey: string;
    nameKey: string;
}

export const BarChartComponent: React.FC<BarChartProps> = ({ data, dataKey, nameKey }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 40 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={nameKey} angle={-45} textAnchor="end" interval={0} height={80} />
      <YAxis />
      <Tooltip wrapperClassName="!bg-white !border-gray-300 !rounded-md !shadow-lg" />
      <Legend />
      <Bar dataKey={dataKey} fill="#F58220" name="Envíos" />
    </BarChart>
  </ResponsiveContainer>
);

interface PieChartProps {
    data: (ChartData & { fill: string })[];
}

export const PieChartComponent: React.FC<PieChartProps> = ({ data }) => {
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        if (percent === 0) return null;

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                </Pie>
                <Tooltip wrapperClassName="!bg-white !border-gray-300 !rounded-md !shadow-lg"/>
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};
