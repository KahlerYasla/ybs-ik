import { create } from "zustand"

// Types
import { User } from "../types/user"

// DTOs
import { LoginRequest } from "../types/dtos/login.request"
import { LoginResponse } from "../types/dtos/login.response"

// Axios
import axios from "axios"

interface useUserState {
    user: User | null
    setUser: (user: User | null) => void

    login: (loginRequest: LoginRequest) => Promise<LoginResponse>
    logout: () => void

    cacheUser: () => void
    isUserCached: boolean
    getUserFromCache: () => User | null
}

export const useUser = create<useUserState>((set, get) => ({
    user: null,
    setUser: (user) => set({ user }),
    login: async (loginRequest) => {
        const response = await axios.post<LoginResponse>(
            "/auth/login",
            loginRequest
        )

        const user = {
            id: response.data.userId,
            token: response.data.token,
            username: loginRequest.username,
            email: "",
        }

        // Set user using setUser function
        set({ user })
        return response.data
    },
    logout: () => set({ user: null }),
    cacheUser: () => {
        const user = localStorage.getItem("user")
        if (user) {
            set({ user: JSON.parse(user) })
        }
    },
    getUserFromCache: () => JSON.parse(localStorage.getItem("user") || "{}"),
    isUserCached: !!localStorage.getItem("user"),
}))
