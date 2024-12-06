"use client";
import endpoints from "@/api/endpoints";
import useImageUpload from "@/api/hooks/uploadImage/useUploadImage";
import useAuth from "@/api/hooks/useAuth";
import { BreadCumbs } from "@/components/breadcumb/breadCumbs";
import LayoutDashboard from "@/components/layout/LayoutDashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddUserPage() {
  const [payloadData, setPayloadData] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
    role: "",
    profilePictureUrl: "",
    phoneNumber: "",
  });
  const { handleUploadImage } = useImageUpload({
    onSuccess: (data) => {
      if (data) {
        setPayloadData((prev) => ({ ...prev, profilePictureUrl: data }));
      }
    },
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPayloadData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSelectChange = (value: string) => {
    setPayloadData((prevData) => ({
      ...prevData,
      role: value,
    }));
  };
  const { register } = useAuth(endpoints.register);
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(payloadData, (data) => {
      toast.success("User added successfully!");
      router.push("/admin/users");
    });
  };
  console.log(payloadData);
  return (
    <LayoutDashboard title="Add User" desc="Welcome to the admin dashboard!">
      <BreadCumbs title="Add User" prevPage="Users" to="/admin/users" />
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label>Name</Label>
          <Input onChange={handleInputChange} name="name" type="text" />
        </div>
        <div className="grid gap-2">
          <Label>Email</Label>
          <Input onChange={handleInputChange} name="email" type="text" />
        </div>
        <div className="grid gap-2">
          <Label>Password</Label>
          <Input onChange={handleInputChange} name="password" type="password" />
        </div>
        <div className="grid gap-2">
          <Label>Password Confirmation</Label>
          <Input
            onChange={handleInputChange}
            name="passwordRepeat"
            type="password"
          />
          {payloadData.password !== payloadData.passwordRepeat && (
            <p className="text-red-500">Passwords do not match</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label>Role</Label>
          <select
            className="form-select rounded-xl border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => handleSelectChange(e.target.value)}
            name="role"
          >
            <option value="" defaultChecked>
              Select Role
            </option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="grid gap-2">
          <Label>Phone Number</Label>
          <Input onChange={handleInputChange} name="phoneNumber" type="text" />
        </div>
        <div className="grid gap-2">
          <Label>Profile Picture</Label>
          {payloadData.profilePictureUrl && (
            <Image
              src={payloadData.profilePictureUrl}
              alt=""
              width={100}
              height={100}
              className="w-32 h-32 object-cover"
            />
          )}
          <Input type="file" onChange={handleUploadImage} accept="image/*" />
        </div>
        <Button type="submit">Add User</Button>
      </form>
    </LayoutDashboard>
  );
}
