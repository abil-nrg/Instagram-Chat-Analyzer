'use client';

import React from 'react';
import styles from './page.module.css';
import { useData } from '@/context/DataContext';
import SummaryCard from '@/components/SummaryCard/SummaryCard';
import MonthlyMessagesChart from '@/components/MonthlyMessagesChart/MonthlyMessagesChart';
import TopFriendsChart from '@/components/TopFriendsChart/TopFriendsChart';
import MessageTypePieChart from '@/components/MessageTypePieChart/MessageTypePieChart';
import WordFrequencyCloud from '@/components/WordFrequencyCloud/WordFrequencyCloud';

const Stats: React.FC = () => {
    const { data } = useData();

    if (!data) {
        return (
            <div className={styles.container}>
                <p>No data received yet...</p>
            </div>
        );
    }


    return (
        <div className={styles.container}>
            {/* top summary row */}
            <div className={styles.grid3}>
                <SummaryCard 
                    title="Total Messages Sent" 
                    content={`${data.totalMessagesSent.total} messages sent`} 
                />
                <SummaryCard 
                    title="Top Friend" 
                    content={`${data.topFriends[0]?.friend_name ?? 'N/A'} – ${data.topFriends[0]?.sent_amount ?? 0} messages`} 
                />
                <SummaryCard 
                    title="Top Emoji" 
                    content={data.emojiFrequency[0]?.emoji ? `${data.emojiFrequency[0].emoji} – ${data.emojiFrequency[0].freq} uses` : 'N/A'} 
                />
            </div>

            {/* activity timeline */}
            <div>
                <MonthlyMessagesChart data={data.activityTimeline}  />
            </div>

            <div>
                <TopFriendsChart data={data.topFriends} />
            </div>

            <div>
                <MessageTypePieChart sent={data.totalMessagesSent} received={data.totalMessagesReceived}/>
            </div>

            <div>
                <WordFrequencyCloud data={data.wordFrequency} />
            </div>  
        </div>
    );
};

export default Stats;
