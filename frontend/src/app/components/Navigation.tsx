    'use client';

    import Link from 'next/link';
    import { useAuth } from '@/hooks/useAuth';

    const Navigation = () => {
        const { user, logout } = useAuth();

        return (
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/" className="text-white text-xl font-bold">
                        Advanced Carwash
                    </Link>
                    <div className="space-x-4">
                        {user ? (
                            <>
                                <Link href="/reservations/create" className="text-gray-300 hover:text-white">
                                    Buat Reservasi
                                </Link>
                                <Link href="/reservations/history" className="text-gray-300 hover:text-white">
                                    Riwayat
                                </Link>
                                <button onClick={logout} className="text-gray-300 hover:text-white">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-gray-300 hover:text-white">
                                    Login
                                </Link>
                                <Link href="/register" className="text-gray-300 hover:text-white">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        );
    };

    export default Navigation;
    
