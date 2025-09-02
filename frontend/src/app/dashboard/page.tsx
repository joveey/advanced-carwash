'use client';

import { useAuth } from '@/hooks/useAuth';

export default function Dashboard() {
    // Gunakan middleware 'auth' untuk melindungi halaman ini
    const { user, logout } = useAuth({ middleware: 'auth' });

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
            <div className="p-8 bg-gray-800 rounded-lg shadow-md text-center">
                <h1 className="text-3xl font-bold">Welcome to Dashboard!</h1>
                <p className="mt-4 text-xl">
                    Hello, <span className="font-semibold">{user?.name}</span>
                </p>
                <p className="text-gray-400">{user?.email}</p>
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
