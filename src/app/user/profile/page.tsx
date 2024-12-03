"use client";
import endpoints from "@/api/endpoints";
import { useFetchLoggedUser } from "@/api/hooks/User/useFetchUsers";
import Image from "next/image";

export default function ProfilePage() {
  const { data: myProfile } = useFetchLoggedUser(endpoints.user);
  console.log(myProfile);
  return (
    <div className="mx-auto container py-20 px-6 bg-gray-100">
      <div className="flex flex-col md:flex-row gap-4 rounded-lg border p-4 bg-white border-gray-100 shadow-sm">
        <div className=" flex justify-center items-center w-fit">
          <Image
            src={myProfile?.data?.profilePictureUrl || "/img/noimage.webp"}
            width={1000}
            height={1000}
            className="w-96 h-64 object-cover object-center rounded-lg"
            alt="profile"
          />
        </div>
        <dl className="-my-3 divide-y flex flex-col justify-center divide-gray-100 text-sm">
          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Email</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {myProfile?.data?.email}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Name</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {myProfile?.data?.name}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">No Hp</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {myProfile?.data?.phoneNumber}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
