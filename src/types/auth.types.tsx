// Hur en inloggad användare ser ut
export interface User {
    id: string,
    username: string
}

// Vad som krävs för att logga in
export interface LoginCredentials {
    username: string,
    password: string
}

// Vad som kommer tillbaka från backend vid inloggning
export interface AuthResponse {
    user: User,
    token: string
}

// Typen för AuthContextet
export interface AuthContextType {
    user: User | null,
    login: (credentials: LoginCredentials) => Promise<void>,
    logout: () => void
}