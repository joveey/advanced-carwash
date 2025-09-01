'use client';

import useSWR from 'swr';
import axios from '@/lib/axios';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { User, AuthResponse } from '@/types/auth';

interface UseAuthProps {
    middleware?: 'guest' | 'auth';
    redirectIfAuthenticated?: string;
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: UseAuthProps = {}) => {
    const router = useRouter();
    const pathname = usePathname();

    // Gunakan SWR untuk fetch user data
    const { data: user, error, mutate } = useSWR<User | null>('/api/user', 
        () => axios.get('/api/user')
            .then(res => res.data as User)
            .catch(error => {
                if (error.response?.status === 401) {
                    return null;
                }
                throw error;
            }),
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
        }
    );

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const login = async ({ setErrors, email, password }: any) => {
        try {
            if (setErrors) setErrors([]);
            
            // Get CSRF cookie first
            await csrf();
            
            // Attempt login
            const response = await axios.post('/api/login', { email, password });
            
            // Verify the response contains user data
            if (response.data?.user) {
                // Update local user data
                await mutate();
                
                // Get fresh user data to ensure session is active
                const userResponse = await axios.get('/api/user');
                if (userResponse.data) {
                    // Double check if the user is properly authenticated
                    const redirectPath = userResponse.data.role === 1 ? '/admin/dashboard' : '/dashboard';
                    router.push(redirectPath);
                } else {
                    throw new Error('Failed to verify user session');
                }
            } else {
                console.error('No user data in response:', response.data);
                throw new Error('Invalid server response');
            }
        } catch (error: any) {
            console.error('Login error:', error.response || error);
            
            if (setErrors) {
                if (error?.response?.data?.errors) {
                    setErrors(Object.values(error.response.data.errors).flat());
                } else if (error?.response?.data?.message) {
                    setErrors([error.response.data.message]);
                } else if (error?.response?.status === 401) {
                    setErrors(['Invalid email or password']);
                } else if (error?.response?.status === 419) {
                    setErrors(['Session expired. Please refresh the page']);
                    await csrf(); // Get new CSRF token
                } else {
                    setErrors(['An unexpected error occurred']);
                }
            }
            
            throw error; // Re-throw for the component to handle
        }
    };

    const logout = async () => {
        if (!error) {
            await axios.post('/api/logout');
            mutate(null); // <-- Langsung set data user jadi null tanpa revalidasi
        }
        router.push('/login');
    };

    useEffect(() => {
        // If we're loading the user data, wait
        if (user === undefined) {
            return;
        }

        // For guest pages (like login): redirect if user is already logged in
        if (middleware === 'guest' && user) {
            console.log('User already logged in, redirecting to', redirectIfAuthenticated);
            router.refresh(); // Refresh the current page data
            router.push(redirectIfAuthenticated || '/');
            return;
        }

        // For protected pages: redirect to login if user is not logged in
        if (middleware === 'auth' && error) {
            console.log('User not authenticated, redirecting to login');
            router.refresh(); // Refresh the current page data
            router.push('/login');
            return;
        }

        // Untuk halaman yang butuh auth: jika fetch selesai dan user === null => redirect ke login
        if (middleware === 'auth') {
            if (typeof user !== 'undefined' && user === null) {
                router.push('/login');
            }
        }
    }, [user, error, middleware, redirectIfAuthenticated, router]);

    return {
    user,
    login,
    logout,
    // isLoading = true while SWR hasn't resolved
    isLoading: typeof user === 'undefined' && !error,
    };
};