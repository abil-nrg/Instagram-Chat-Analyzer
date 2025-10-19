'use client';

import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import styles from './MessageTypePieChart.module.css';
import { TotalMessages } from '@/types/Data';


interface Props {
    sent: TotalMessages;
    received: TotalMessages;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a4de6c'];

const MessageTypePieChart: React.FC<Props> = ({ sent, received }) => {
    const sentData = [
        { name: 'Text', value: sent.content_count },
        { name: 'Photos', value: sent.photos_count },
        { name: 'Videos', value: sent.videos_count },
        { name: 'Audio', value: sent.audio_files_count },
        { name: 'Shares', value: sent.share_count },
    ];

    const receivedData = [
        { name: 'Text', value: received.content_count },
        { name: 'Photos', value: received.photos_count },
        { name: 'Videos', value: received.videos_count },
        { name: 'Audio', value: received.audio_files_count },
        { name: 'Shares', value: received.share_count },
    ];

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Message Type Breakdown</h2>
            <div className={styles.charts}>
                {/* Sent messages */}
                <div className={styles.chartWrapper}>
                    <h3 className={styles.subtitle}>Sent</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={sentData}
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                innerRadius={100    }
                                dataKey="value"
                                nameKey="name"
                                label
                            >
                                {sentData.map((_, index) => (
                                    <Cell key={`sent-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* received mMessages */}
                <div className={styles.chartWrapper}>
                    <h3 className={styles.subtitle}>Received</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={receivedData}
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                innerRadius={100}
                                dataKey="value"
                                nameKey="name"
                                label
                            >
                                {receivedData.map((_, index) => (
                                    <Cell key={`received-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default MessageTypePieChart;
