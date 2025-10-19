'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

import { ActivityTimeline } from '@/types/Data';

interface Props {
  data: ActivityTimeline[];
}

const MonthlyMessagesChart: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No activity timeline data available.</p>;
  }

  return (
    <div style={{ width: '100%', height: 400, marginTop: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Activity Timeline
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: 'Messages', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="content_count" stackId="a" name="Text" fill="#8884d8" />
          <Bar dataKey="photos_count" stackId="a" name="Photos" fill="#82ca9d" />
          <Bar dataKey="videos_count" stackId="a" name="Videos" fill="#ffc658" />
          <Bar dataKey="audio_files_count" stackId="a" name="Audio" fill="#ff8042" />
          <Bar dataKey="share_count" stackId="a" name="Shares" fill="#8dd1e1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyMessagesChart;
