"use client";
import React from "react";
import LogoutModal from "@/components/modals/LogoutModals";
import { ProfileModal } from "@/components/modals/ProfileModals";
import { useAuthStore } from "@/stores/authStore";
import { useCartsStore } from "@/stores/cartsStore";
import { useHeaderStore } from "@/stores/headerStore";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { useRouter } from "next/navigation";
export default function Header() {
  const { toggleOpen, open } = useHeaderStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const { carts, setCarts } = useCartsStore();
  const router = useRouter();
  const handleLogout = () => {
    setIsModalOpen(false);
    setProfileModal(false);
    setCarts([]);
    logout();
    router.push("/");
  };
  console.log(user?.name);
  // const handleAuthAction = () => {
  //   if (isAuthenticated) {
  //     // Logout
  //     logout()
  //     router.push('/login')
  //   } else {
  //     // Redirect ke login
  //     router.push('/login')
  //   }
  // }
  return (
    <header className="container absolute mx-auto bg-transparent">
      <LogoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
      />
      <div className="w-full">
        {/* NavMobile */}
        <div className="fixed z-30 flex items-center justify-between w-full h-16 px-6 mt-2 bg-transparent top-2 md:hidden">
          <div>
            <a href="#home">
              <h1 className="text-2xl font-bold font-travelyouu font-logo text-primary-300 ">
                TravelYouuu
              </h1>
            </a>
          </div>

          <div className="flex flex-row items-center gap-6">
            {isAuthenticated && (
              <Link
                href="/user/cart"
                className="flex items-center justify-center p-2 border border-white rounded-md bg-white/75"
              >
                <FontAwesomeIcon icon={faCartShopping} />
                <h1 className="ml-2">Carts ({carts.length})</h1>
              </Link>
            )}
            <div>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-500/75"
                onClick={toggleOpen}
              >
                <span className="sr-only">Toggle navigation</span>
                <FontAwesomeIcon
                  className="w-6 h-6 font-bold text-gray-600"
                  icon={faBars}
                />
              </button>
            </div>
            {open && (
              <div
                className={`fixed pb-4 overflow-hidden rounded-lg bg-white/70 right-4 top-20 `}
              >
                {user && (
                  <div className="flex items-center justify-center w-full gap-2 px-2 py-2 bg-white/85">
                    <Image
                      width={100}
                      height={100}
                      className="w-12 bg-center bg-cover rounded-full"
                      alt="Profile Picture"
                      src={user.profilePictureUrl}
                    />
                    <h1>{user.name.split(" ")[0]}</h1>
                  </div>
                )}
                <ul className="flex flex-col gap-2 px-6">
                  <li>
                    <Link href="/#hero"> Home </Link>
                  </li>
                  <li>
                    <Link href="/#about"> About </Link>
                  </li>
                  <li>
                    <Link href="/#activity"> Activity </Link>
                  </li>
                  <li>
                    <Link href="/#promo"> Promo </Link>
                  </li>
                  {isAuthenticated && user ? (
                    <li>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-red-400"
                      >
                        Log Out
                      </button>
                    </li>
                  ) : (
                    <li>
                      <Link href={"/auth/login"} className="text-green-400">
                        Log In
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* NavDesktop */}
        <div className="z-30 items-center justify-center hidden w-full px-6 bg-transparent md:fixed top-3 h-14 md:flex md:w-full">
          <div className="flex flex-row items-center justify-between max-w-screen-xl gap-16 p-2 rounded-lg bg-white/65">
            <ul className="flex flex-row justify-center gap-8 font-thin text-black/85 ">
              <li>
                <Link
                  href={"/#hero"}
                  className="inline-flex items-center gap-2 p-2 rounded-md hover:text-white hover:bg-primary-100"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={"/#about"}
                  className="inline-flex items-center gap-2 p-2 rounded-md hover:text-white hover:bg-primary-100"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href={"/#promo"}
                  className="inline-flex items-center gap-2 p-2 rounded-md hover:text-white hover:bg-primary-100"
                >
                  Promo
                </Link>
              </li>
            </ul>
            <h1 className="text-xl font-bold text-primary-300 drop-shadow-md font-travelyouu ">
              TravelYouuu
            </h1>
            <ul className="flex flex-row justify-center gap-8 font-thin text-black/85 ">
              <li>
                <Link
                  href={isAuthenticated ? "/user/activity" : "/#activity"}
                  className="inline-flex items-center gap-2 p-2 rounded-md hover:text-white hover:bg-primary-100"
                >
                  Activity
                </Link>
              </li>
              {isAuthenticated && (
                <li>
                  <Link
                    href="/user/cart"
                    className="inline-flex items-center gap-2 p-2 rounded-md hover:text-white hover:bg-primary-100"
                  >
                    <FontAwesomeIcon className="mr-2" icon={faCartShopping} />
                    Cart ({carts.length})
                  </Link>
                </li>
              )}

              {user && isAuthenticated ? (
                <li>
                  <button
                    onClick={() => setProfileModal(!profileModal)}
                    className="inline-flex items-center gap-2 p-2 text-black border border-white rounded-md cursor-pointer hover:text-black hover:bg-gray-200/75"
                  >
                    <Image
                      width={1000}
                      height={1000}
                      alt="Profile"
                      className="bg-center bg-cover rounded-full size-6"
                      src={user.profilePictureUrl}
                    />{" "}
                    Profile
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    href={"/auth/Login"}
                    className="inline-flex items-center gap-2 p-2 text-black border border-white rounded-md cursor-pointer hover:text-black hover:bg-gray-200/75"
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-2" /> Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
          {profileModal && (
            <ProfileModal
              onOpen={() => setIsModalOpen(!isModalOpen)}
              class="top-10"
            />
          )}
        </div>
      </div>

      {/* {modalRegister && <Register/>} */}
    </header>
  );
}
