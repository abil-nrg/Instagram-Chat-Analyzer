'use client';

import React, { useRef, useEffect, useState } from 'react';
import WordCloud from 'react-d3-cloud';
import styles from './WordFrequencyCloud.module.css';
import { WordFrequency } from '@/types/Data';

interface Props {
  data: WordFrequency[];
}

const WordFrequencyCloud: React.FC<Props> = ({ data }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  useEffect(() => {
    if (wrapperRef.current) {
      const { clientWidth, clientHeight } = wrapperRef.current;
      setDimensions({ width: clientWidth, height: clientHeight });
    }
  }, [wrapperRef.current, data]); // recalc if container or data changes

  if (!data || data.length === 0) {
    return <p className={styles.empty}>No word frequency data available</p>;
  }

  const words = data
    .filter(item => item.word && typeof item.freq === 'number' && item.freq > 0)
    .map(item => ({
      text: item.word,
      value: item.freq,
    }));

  if (words.length === 0) {
    return <p className={styles.empty}>No word frequency data available</p>;
  }

  const fontSize = (word: { value: number }) => Math.log2(word.value) * 5;
  const rotate = (word: { value: number }) => (Math.random() > 0.5 ? 0 : 90);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Most Used Words</h2>
      <div className={styles.cloudWrapper} ref={wrapperRef}>
        <WordCloud
          data={words}
          fontSize={fontSize}
          rotate={rotate}
          padding={2}
          width={dimensions.width}
          height={dimensions.height}
        />
      </div>
    </div>
  );
};

export default WordFrequencyCloud;
