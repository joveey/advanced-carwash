'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios'; // Import our configured axios

export default function Register() {
    useAuth(
        {
            middleware: 'guest',
            redirectIfAuthenticated: '/', // Jika sudah login, lempar ke homepage
        }
        );
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            // Langkah 1: Ambil CSRF cookie terlebih dahulu
        await axios.get('/sanctum/csrf-cookie');

            // Langkah 2: Kirim data registrasi
            await axios.post('/api/register', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });

            router.push('/login');
        } catch (err: any) {
            if (err.response && err.response.data.message) {
                // Menampilkan error validasi dari Laravel
                setError(err.response.data.message);
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="p-8 bg-gray-800 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none"
                    />
                </div>
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
                <div className="mb-4">
                    <label className="block mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none"
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2">Confirm Password</label>
                    <input
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none"
                    />
                </div>
                <button type="submit" className="w-full py-2 bg-blue-600 rounded-md hover:bg-blue-700">
                    Register
                </button>
            </form>
        </div>
    );
}