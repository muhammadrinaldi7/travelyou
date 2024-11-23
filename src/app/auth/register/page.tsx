"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import useAuth from "@/api/hooks/useAuth";
import endpoints from "@/api/endpoints";
import toast from "react-hot-toast";

interface RegisterPageProps {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
  role: string;
  profilePictureUrl: string;
  phoneNumber: string;
}
export default function RegisterPage() {
  const { register } = useAuth(endpoints.register);
  const [formData, setFormData] = useState<RegisterPageProps>({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
    role: "user",
    profilePictureUrl: "",
    phoneNumber: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    register(formData, (data) => {
      toast.success("Registration successful!");
      console.log("Registration successful!", data);
    });
  };
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size < 999999) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
      axios.defaults.headers.common["apiKey"] = process.env.NEXT_PUBLIC_API_KEY;
      await axios
        .post(
          process.env.NEXT_PUBLIC_API_BASE_URL + endpoints.uploadImage,
          formData
        )
        .then((response) => {
          toast.success("Image uploaded successfully!");
          const imageUrl = response.data.url;
          setFormData((prevFormData) => ({
            ...prevFormData,
            profilePictureUrl: imageUrl,
          }));
          setPreviewImage(imageUrl);
        })
        .catch((error) => {
          console.log("Error uploading image:", error);
          setIsUploading(false);
        })
        .finally(() => {
          setIsUploading(false);
        });
    } else {
      toast.error("Image size must be less than 1MB");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-300 to-primary-200 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={isUploading}
                />
                <h1 className="text-center mb-2">Profile Picture</h1>
                <div className="w-24 h-24 rounded-full border-4 border-primary-100 overflow-hidden">
                  {previewImage ? (
                    <Image
                      src={previewImage}
                      alt="Profile Preview"
                      width={96}
                      height={96}
                      className="object-cover object-center"
                    />
                  ) : (
                    <div className="w-full px-6 h-full bg-gray-200 flex items-center justify-center">
                      Upload Image
                    </div>
                  )}
                </div>
                {isUploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white">Uploading...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100"
                required
              />
            </div>

            {/* Phone Number Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100"
                required
              />
            </div>

            {/* Password Inputs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Repeat Password
              </label>
              <input
                type="password"
                name="passwordRepeat"
                value={formData.passwordRepeat}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100"
                required
              />
            </div>
            {formData.password !== formData.passwordRepeat && (
              <p className="text-red-500">Passwords do not match</p>
            )}

            {/* Role (Hidden or Dropdown) */}
            <input type="hidden" name="role" value="user" />

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full ${
                isUploading || formData.password !== formData.passwordRepeat
                  ? "opacity-50 hover:opacity-40"
                  : ""
              } bg-gradient-to-r from-primary-300 to-primary-200 text-white py-2 rounded-lg hover:opacity-85 transition duration-300`}
              disabled={
                isUploading || formData.password !== formData.passwordRepeat
              }
            >
              {isUploading ? "Uploading..." : "Register"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p>
              Already have an account?{" "}
              <a
                href="/login"
                className="text-primary-30from-primary-300 hover:underline"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
