"use client";
import endpoints from "@/api/endpoints";
import useAuth, { LoginResponse } from "@/api/hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import toast from "react-hot-toast";
import Link from "next/link";

const LoginPage = () => {
  const { login } = useAuth(endpoints.login);
  const { login: loginStore } = useAuthStore();
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      formValues,
      (data) => {
        console.log("Login successful!", data);
        const logRes = data as LoginResponse;
        sessionStorage.setItem("userSession", JSON.stringify(logRes.data));
        Cookies.set("token", logRes.token);
        loginStore(logRes.data);
        toast.success(logRes.message);
        setTimeout(() => {
          router.push("/");
        }, 2000);
        // Aksi setelah login berhasil, seperti navigasi ke halaman lain
      },
      (error) => {
        const errorRes = error as { response: { data: { message: string } } };
        toast.error(errorRes.response.data.message);
      }
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary-100 to-primary-300 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105">
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <h1 className="text-4xl font-bold text-primary-300 font-travelyouu">
                TravelYouuu
              </h1>
            </div>

            <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
              Welcome Back
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formValues.email}
                  onChange={(e) =>
                    setFormValues({ ...formValues, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 transition duration-300"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formValues.password}
                  onChange={(e) =>
                    setFormValues({ ...formValues, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 transition duration-300"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-primary-100 focus:ring-primary-300 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
                {/* 
                <a
                  href="#"
                  className="text-sm text-primary-100 hover:text-primary-300"
                >
                  Forgot password?
                </a> */}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-100 to-blue-500 text-white py-2 rounded-lg hover:opacity-90 transition duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/register"
                  className="font-medium text-primary-100 hover:text-primary-300"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

{
  /* <div
  className={`w-full flex px-4 justify-center items-center bg-cover bg-center aspect-video bg-gray-100 h-[100vh]`}
  style={{ backgroundImage: "url('/img/loginPage.webp')" }}
>
  <div className="flex flex-col items-center justify-center p-6 rounded-lg shadow-lg bg-primary-300/85">
    <h1 className="text-2xl font-bold text-white font-travelyouu">
      TravelYouuu
    </h1>
    <ToastContainer />
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={formValues.email}
        onChange={(e) =>
          setFormValues({ ...formValues, email: e.target.value })
        }
        placeholder="example@ex.com"
        className="w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm"
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={formValues.password}
        onChange={(e) =>
          setFormValues({ ...formValues, password: e.target.value })
        }
        placeholder="Password"
        className="w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm"
      />
      <button
        type="submit"
        disabled={formValues.email === "" || formValues.password === ""}
        className={`w-full ${
          formValues.email === "" || formValues.password === ""
            ? "hover:none  bg-gray-400"
            : "hover:bg-primary-100  bg-primary-300"
        } px-4 py-2 mt-4 text-sm font-medium text-white rounded-md `}
      >
        Login
      </button>
    </form>
    <p className="text-left">
      Belum Punya Akun ?{" "}
      <span>
        <a className="text-white hover:cursor-pointer hover:underline">
          Daftar
        </a>
      </span>{" "}
    </p>
  </div>
</div> */
}
