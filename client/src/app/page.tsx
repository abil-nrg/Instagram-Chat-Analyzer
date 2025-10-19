'use client';

import React, { useRef, useState } from "react";
import styles from './page.module.css'

export default function Home() {
  const [err, setErr] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange() {
    const files = inputRef.current?.files;
    if (!files) return;

    const jsonFiles = Array.from(files).filter(f => f.name.endsWith('.json'));

    if (jsonFiles.length === 0) {
      console.log("No JSON files selected.");
      return;
    }

    const formData = new FormData();
    jsonFiles.forEach(file => {
      formData.append('files', file, file.name);
    });

    try{
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      })

      if(!res.ok){
        console.error("Error from backend");
        return;
      }

      const data = await res.json();
      console.log("Data:", data);

    }catch(error){
      console.error("Error uploading files:", error);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Instagram Chat Analyzer!</h1>

      <input   
        className={styles.fileInput}   
        ref = {inputRef}    
        type="file"
        webkitdirectory="true"
        directory="true"
        multiple
        onChange={handleFileChange}  
      />

    </div>
  );
}
