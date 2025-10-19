'use client';

import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import styles from './page.module.css'
import { useData } from "@/context/DataContext";
import { Data } from "@/types/Data";

export default function Home() {
  const [err, setErr] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const { setData } = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function formatData(rawData: any): Data {
    console.log("Raw data received:", rawData);
    return rawData as Data;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!username.trim()) {
      setErr("Please enter a username");
      return;
    }

    const files = fileInputRef.current?.files;
    if (!files || files.length === 0) {
      setErr("Please select JSON files to upload");
      return;
    }

    const jsonFiles = Array.from(files).filter(f => f.name.endsWith('.json'));
    if (jsonFiles.length === 0) {
      setErr("No JSON files selected");
      return;
    }

    const formData = new FormData();
    jsonFiles.forEach(file => formData.append('files', file, file.name));
    formData.append('username', username);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        console.error("Error from backend");
        setErr("Failed to upload files");
        return;
      }

      const data = await res.json();
      setData(formatData(data));
      router.push('/stats');
    } catch (error) {
      console.error("Error uploading files:", error);
      setErr("Error uploading files");
    }
  }

  return (
    <div className={styles.container}>


      {err && <p style={{ color: 'red', marginBottom: '1rem' }}>{err}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Welcome to Instagram Chat Analyzer!</h1>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className={styles.textInput}
        />

        <input
          type="file"
          webkitdirectory="true"
          directory="true"
          multiple
          ref={fileInputRef}
          className={styles.fileInput}
        />

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}
