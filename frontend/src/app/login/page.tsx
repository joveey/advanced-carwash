'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios'; // Import our configured axios

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            // First, get the CSRF cookie
            await axios.get('/sanctum/csrf-cookie');

            // Then, attempt to login
            await axios.post('/api/login', { email, password });

            // Redirect to a dashboard or home page on successful login
            router.push('/');
        } catch (err: any) {
             if (err.response && err.response.status === 422) {
                setError('The provided credentials do not match our records.');
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="p-8 bg-gray-800 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none"
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none"
                    />
                </div>
                <button type="submit" className="w-full py-2 bg-blue-600 rounded-md hover:bg-blue-700">
                    Login
                </button>
            </form>
        </div>
    );
}