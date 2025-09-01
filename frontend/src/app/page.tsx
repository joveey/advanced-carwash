'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function Home() {
    // Hapus argumen middleware, biarkan hook hanya mengambil status user
    const { user } = useAuth(); 

    return (
        <div className="flex flex-col items-center justify-center text-center mt-20">
            <h1 className="text-5xl font-bold mb-4">
                Selamat Datang di Advanced Carwash
            </h1>
            <p className="text-xl text-gray-400 mb-8">
                Solusi cuci mobil modern, cepat, dan terpercaya.
            </p>

            {user ? (
                <div>
                    <p className="text-lg mb-4">
                        Halo, <span className="font-bold">{user.name}</span>! Anda sudah login.
                    </p>
                    <Link href="/reservations/create" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700">
                        Buat Reservasi Sekarang
                    </Link>
                </div>
            ) : (
                <div>
                    <p className="text-lg mb-4">
                        Silakan login untuk memulai atau mendaftar jika Anda pengguna baru.
                    </p>
                    <div className="space-x-4">
                        <Link href="/login" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700">
                            Login
                        </Link>
                        <Link href="/register" className="bg-gray-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600">
                            Register
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

