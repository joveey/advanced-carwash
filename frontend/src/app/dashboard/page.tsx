'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
    const router = useRouter();
    const { user } = useAuth({
        middleware: 'auth'
    });

    useEffect(() => {
        // Redirect admin to admin dashboard
        if (user?.role === 1) {
            router.push('/admin/dashboard');
        }
    }, [user, router]);

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                    </div>
                    <p className="mt-4 text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Selamat datang, {user.name}!</h2>
                <p className="text-gray-300">
                    Apa yang ingin Anda lakukan hari ini?
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 cursor-pointer">
                    <h3 className="text-lg font-semibold mb-2">Buat Reservasi</h3>
                    <p className="text-gray-400">Buat jadwal pencucian mobil Anda</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 cursor-pointer">
                    <h3 className="text-lg font-semibold mb-2">Riwayat Reservasi</h3>
                    <p className="text-gray-400">Lihat riwayat pencucian mobil Anda</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 cursor-pointer">
                    <h3 className="text-lg font-semibold mb-2">Profil</h3>
                    <p className="text-gray-400">Kelola informasi akun Anda</p>
                </div>
            </div>
        </div>
    );
}
