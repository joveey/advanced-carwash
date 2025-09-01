'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboard() {
    const router = useRouter();
    const { user } = useAuth({
        middleware: 'auth'
    });

    useEffect(() => {
        // Redirect non-admin users to regular dashboard
        if (user && !user.isAdmin) {
            router.push('/dashboard');
        }
    }, [user, router]);

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]" role="status">
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                    </div>
                    <p className="mt-4 text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Welcome, {user.name}</h2>
                <p className="text-gray-300">
                    Admin Control Panel
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 cursor-pointer">
                    <h3 className="text-lg font-semibold mb-2">Manage Services</h3>
                    <p className="text-gray-400">Add, edit, or remove car wash services</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 cursor-pointer">
                    <h3 className="text-lg font-semibold mb-2">All Reservations</h3>
                    <p className="text-gray-400">View and manage all customer reservations</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 cursor-pointer">
                    <h3 className="text-lg font-semibold mb-2">User Management</h3>
                    <p className="text-gray-400">Manage user accounts and roles</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 cursor-pointer">
                    <h3 className="text-lg font-semibold mb-2">Car Types</h3>
                    <p className="text-gray-400">Manage car types and pricing</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 cursor-pointer">
                    <h3 className="text-lg font-semibold mb-2">Reports</h3>
                    <p className="text-gray-400">View business reports and analytics</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 cursor-pointer">
                    <h3 className="text-lg font-semibold mb-2">Settings</h3>
                    <p className="text-gray-400">Manage system settings</p>
                </div>
            </div>
        </div>
    );
}
