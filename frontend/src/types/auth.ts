export interface User {
    id: number;
    name: string;
    email: string;
    role: number;
    isAdmin: boolean;
}

export interface AuthResponse {
    message: string;
    user: User;
}
