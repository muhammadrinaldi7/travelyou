import { useMutation } from "@tanstack/react-query";
import axiosClient from "../axiosClient";
import { User } from "@/stores/userStore";

interface LoginPayload {
    email: string;
    password: string;
}

interface RegisterPayload {
    email: string;
    password: string;
    name: string;
}

export interface LoginResponse{
    code:string;
    data:User;
    message:string;
    status:string;
    token:string;
}


type CallbackType = (data: unknown) => void;

export default function useAuth(baseUrl: string) {
    // Login Mutation
    const { mutate: login } = useMutation({
        mutationFn: async (payload: LoginPayload) => {
            const loginResponse = await axiosClient.post(baseUrl, payload);
            return loginResponse.data;
        },

    });

    // Register Mutation
    const { mutate: register } = useMutation({
        mutationFn: async (payload: RegisterPayload):Promise<LoginResponse> => {
            const registerResponse = await axiosClient.post(`${baseUrl}/register`, payload);
            return registerResponse.data;
        },
    });

    // Logout Mutation
    const { mutate: logout } = useMutation({
        mutationFn: async () => {
            const logoutResponse = await axiosClient.post(`${baseUrl}/logout`);
            return logoutResponse.data;
        },
    });

    return {
        login: (payload: LoginPayload, onSuccess?: CallbackType,onError?:CallbackType) => {
            login(payload, {
                onSuccess,
                onError,
            });
        },

        register: (payload: RegisterPayload, onSuccess?: CallbackType) => {
            register(payload, {
                onSuccess,
                onError: (error) => {
                    console.error("Registration failed:", error);
                }
            });
        },
        logout: (onSuccess?: CallbackType) => {
            logout(undefined, {
                onSuccess,
                onError: (error) => {
                    console.error("Logout failed:", error);
                }
            });
        }
    };
}
