'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function AdminDashboard() {
    const router = useRouter();
    const { user, logout } = useAuth({ middleware: 'auth' });

    useEffect(() => {
        // Mengarahkan pengguna non-admin ke dashboard biasa
        if (user && user.role !== 'admin') {
            router.push('/dashboard');
        }
    }, [user, router]);
    
    // Tampilkan state loading jika data user belum siap atau bukan admin
    if (!user || user.role !== 'admin') {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
                <p>Loading or Redirecting...</p>
            </div>
        );
    }
    
    // Tampilan khusus untuk admin
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
            <div className="p-8 bg-sky-800 rounded-lg shadow-md text-center">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="mt-4 text-xl">
                    Welcome, Admin <span className="font-semibold">{user.name}</span>!
                </p>
                <p className="text-gray-300">{user.email}</p>
                <button
                    onClick={logout}
                    className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-medium transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

