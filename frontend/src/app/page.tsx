'use client';

import { useState, useEffect } from 'react';
import axios from '@/lib/axios';

// 1. Definisikan tipe untuk objek user
interface User {
  id: number;
  name: string;
  email: string;
  // Tambahkan properti lain jika ada
}

export default function Home() {
  // 2. Beri tahu useState tipe data yang mungkin untuk state 'user'
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/user');
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user', error);
        window.location.pathname = '/login';
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <p>Loading...</p>
        </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Advanced Carwash</h1>
      {user ? (
        <p className="mt-4 text-xl bg-gray-800 p-4 rounded-lg">
          Welcome, {user.name}! {/* Sekarang TypeScript tahu 'user' punya 'name' */}
        </p>
      ) : (
        <p className="mt-4 text-xl bg-red-800 p-4 rounded-lg">
          You are not logged in.
        </p>
      )}
    </main>
  );
}