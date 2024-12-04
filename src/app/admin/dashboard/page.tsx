"use client";
import endpoints from "@/api/endpoints";
import { useFetchActivity } from "@/api/hooks/Activity/useFetchActivity";
import { useFetchBanner } from "@/api/hooks/Banner/useFetchBanner";
import { useFetchPromo } from "@/api/hooks/Promo/useFetchPromo";
import { Button } from "@/components/ui/button";
import {
  faSignHanging,
  faTags,
  faTicket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
export default function DashboardPage() {
  const { data: banners } = useFetchBanner(endpoints.banner);
  const { data: promo } = useFetchPromo(endpoints.promo);
  const { data: activity } = useFetchActivity(endpoints.activity);
  const { data: users } = useFetchActivity(endpoints.users);
  return (
    <>
      <div className="mt-4 flex flex-col gap-4">
        <article className="flex items-center gap-4 rounded-lg border shadow-sm border-gray-100 bg-white p-6">
          <span className="rounded-full bg-blue-100 p-3 text-blue-600">
            <FontAwesomeIcon icon={faUser} className="size-8" />
          </span>

          <div>
            <p className="text-2xl font-medium text-gray-900">
              {users?.data.length}
            </p>
            <p className="text-sm text-gray-500">Total Users</p>
          </div>
          <div className="ml-auto text-2xl font-medium text-gray-900">
            <Link href="/admin/users">
              <Button className="bg-blue-600">Manage</Button>
            </Link>
          </div>
        </article>
        <article className="flex items-center gap-4 rounded-lg border shadow-sm border-gray-100 bg-white p-6">
          <span className="rounded-full bg-blue-100 p-3 text-blue-600">
            <FontAwesomeIcon icon={faSignHanging} className="size-8" />
          </span>

          <div>
            <p className="text-2xl font-medium text-gray-900">
              {banners?.data.length}
            </p>
            <p className="text-sm text-gray-500">Total Banners</p>
          </div>
          <div className="ml-auto text-2xl font-medium text-gray-900">
            <Link href="/admin/banners">
              <Button className="bg-blue-600">Manage</Button>
            </Link>
          </div>
        </article>
        <article className="flex items-center gap-4 rounded-lg border shadow-sm border-gray-100 bg-white p-6">
          <span className="rounded-full bg-blue-100 p-3 text-blue-600">
            <FontAwesomeIcon icon={faTags} className="size-8" />
          </span>

          <div>
            <p className="text-2xl font-medium text-gray-900">
              {promo?.data.length}
            </p>
            <p className="text-sm text-gray-500">Total Promos</p>
          </div>
          <div className="ml-auto text-2xl font-medium text-gray-900">
            <Button className="bg-blue-600">Manage</Button>
          </div>
        </article>
        <article className="flex items-center gap-4 rounded-lg border shadow-sm border-gray-100 bg-white p-6">
          <span className="rounded-full bg-blue-100 p-3 text-blue-600">
            <FontAwesomeIcon icon={faTicket} className="size-8" />
          </span>

          <div>
            <p className="text-2xl font-medium text-gray-900">
              {activity?.data.length}
            </p>
            <p className="text-sm text-gray-500">Total Activities</p>
          </div>
          <div className="ml-auto text-2xl font-medium text-gray-900">
            <Button className="bg-blue-600">Manage</Button>
          </div>
        </article>
      </div>
    </>
  );
}
