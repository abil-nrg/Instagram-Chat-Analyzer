'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { TopFriend } from '@/types/Data'; 

interface TopFriendsChartProps {
  data: TopFriend[];
}

const TopFriendsChart: React.FC<TopFriendsChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No friend data available.</p>;
  }

  return (
    <div style={{ width: '100%', height: 400, marginTop: '3rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Top Friends</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis
            type="category"
            dataKey="friend_name"
            tick={{ fontSize: 18 }}
            width={120}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="sent_amount" name="Sent" fill="#d71919ff" />
          <Bar dataKey="received_amount" name="Received" fill="#340addff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopFriendsChart;
