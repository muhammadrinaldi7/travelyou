'use client'
import endpoints from "@/api/endpoints";
import useAuth, { LoginResponse } from "@/api/hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const LoginPage = () => {
    const { login } = useAuth(endpoints.login)
    const { login:loginStore } = useAuthStore()
    const [formValues, setFormValues] = useState({email: "", password: ""});
    const router = useRouter();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(
            formValues,
            (data) => {
                console.log("Login successful!", data);
                const logRes = (data as LoginResponse)
                toast(logRes.message)
                sessionStorage.setItem('userSession', JSON.stringify(logRes.data))
                Cookies.set('token',logRes.token)
                loginStore(logRes.data)
                router.push('/')
                // Aksi setelah login berhasil, seperti navigasi ke halaman lain
            },
            (error) => {
                const errorRes = ( error as {response:{data:{message:string} } })
                toast(errorRes.response.data.message)
            },
        );
      };
    return (
        <>
        <div className={`w-full fixed flex px-4 justify-center items-center min-h-screen bg-primary-200/50 backdrop-blur-sm`}>
            <div className="flex flex-col items-center justify-center p-6 rounded-lg shadow-lg bg-primary-300/50">
                
                <h1 className="text-2xl font-bold text-white font-travelyouu">TravelYouuu</h1>
                <ToastContainer 
                />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email"
                     value={formValues.email}
                     onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                     placeholder="example@ex.com" className="w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm" />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" 
                    value={formValues.password}
                    onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                    placeholder="Password" className="w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm" />
                    <button type="submit" disabled={formValues.email === "" || formValues.password === ""} className={`w-full ${formValues.email === "" || formValues.password === "" ? "hover:none  bg-gray-400" : "hover:bg-primary-100  bg-primary-300"} px-4 py-2 mt-4 text-sm font-medium text-white rounded-md `}>Login</button>    
                </form>     
                <p className="text-left">Belum Punya Akun ? <span><a className="text-white hover:cursor-pointer hover:underline">Daftar</a></span> </p>
                
            </div>
        </div>
        </>
    )
}

export default LoginPage