export interface AuthService {
    register(email: string, password: string): Promise<string>;
    login(email: string, password: string): Promise<string>;
    logout(): Promise<void>;
    getUser(): Promise<User | null>;
}

export interface User {
    id: string;
    email: string;
    name: string;
}