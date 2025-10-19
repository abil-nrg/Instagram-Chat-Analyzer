'use client';
import React from 'react';
import styles from './SummaryCard.module.css';

interface SummaryCardProps {
    title: string;
    content: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, content }) => {
    return (
        <div className={styles.card}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.content}>{content}</p>
        </div>
    );
};

export default SummaryCard;
