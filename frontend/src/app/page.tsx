'use client'; // <-- Wajib ada untuk menggunakan Hooks (useState, useEffect)

import { useState, useEffect } from 'react';

export default function Home() {
  // State untuk menyimpan pesan dari API
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    // Fungsi untuk mengambil data dari API Laravel
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/test');
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        setMessage('Failed to fetch data from Laravel API.');
        console.error(error);
      }
    };

    fetchData();
  }, []); // [] artinya useEffect hanya berjalan sekali saat komponen dimuat

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Advanced Carwash</h1>
      <p className="mt-4 text-xl bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        {message}
      </p>
    </main>
  );
}