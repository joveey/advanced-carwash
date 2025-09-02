import useSWR from 'swr';
import axios from '@/lib/axios';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
    name: string;
    email: string;
    role: string;
}

interface ILogin {
    email: string;
    password: string;
    setErrors: React.Dispatch<React.SetStateAction<string[]>>;
}

interface AuthHookProps {
    middleware?: 'guest' | 'auth';
    redirectIfAuthenticated?: string;
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: AuthHookProps = {}) => {
    const router = useRouter();
    const pathname = usePathname();

    const { data: user, error, mutate } = useSWR<User>('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error;
                router.push('/verify-email');
            }),
    );

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const login = async ({ setErrors, ...props }: ILogin) => {
        console.log('--- Step 2: Calling CSRF endpoint ---');
        await csrf();
        console.log('--- Step 3: CSRF cookie received, attempting login ---');

        setErrors([]);

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) {
                    // This will now catch the 419 error
                    throw error;
                }
                const validationErrors = Object.values(error.response.data.errors).flat() as string[];
                setErrors(validationErrors);
            });
    };

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate());
        }
        window.location.pathname = '/login';
    };

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated);
        }
        if (middleware === 'auth' && error) {
            logout();
        }
    }, [user, error]);

    return {
        user,
        login,
        logout,
    };
};

