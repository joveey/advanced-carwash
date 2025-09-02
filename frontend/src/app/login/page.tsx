'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
    const [email, setEmail] = useState('admin@example.com'); // Default for easier testing
    const [password, setPassword] = useState('password'); // Default for easier testing
    const [errors, setErrors] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors([]);
        console.log('--- Step 1: Login Submitted ---');

        try {
            await login({
                email,
                password,
                setErrors,
            });
            console.log('--- Step 4: Login function successful (redirecting) ---');
        } catch (error: any) {
            console.error('--- Step 4: Login function failed ---');
            if (error.response) {
                console.error('Axios error response:', error.response);
                setErrors(prev => [...prev, `Error: ${error.response.status} - ${error.response.statusText}`]);
            } else {
                 console.error('Non-Axios error:', error.message);
                setErrors(prev => [...prev, 'An unexpected error occurred. Check the console.']);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="p-8 bg-gray-800 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
                
                {errors.length > 0 && (
                    <div className="bg-red-500 text-white p-3 rounded mb-4">
                        {errors.map((error, index) => (
                            <p key={index} className="text-sm text-center">{error}</p>
                        ))}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block mb-2 text-white">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        required
                        className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-white">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        required
                        className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                    />
                </div>

                <button 
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-2 rounded-md font-medium transition-colors
                        ${isLoading 
                            ? 'bg-blue-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}

