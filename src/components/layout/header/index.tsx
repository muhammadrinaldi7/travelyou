'use client'

import { useAuthStore } from "@/stores/authStore";
import { useCartsStore } from "@/stores/cartsStore";
import { useHeaderStore } from "@/stores/headerStore";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/navigation";
export default function Header(){
    const { toggleOpen,open } = useHeaderStore()
    const { user,isAuthenticated } = useAuthStore()
    const { carts } = useCartsStore()

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
          <div className="w-full">
            {/* NavMobile */}
            <div className="fixed z-30 flex items-center justify-between w-full h-16 px-6 mt-2 bg-transparent top-2 md:hidden">
              <div>
                <a href="#home">
                  <h1 className="text-2xl font-bold font-travelyouu font-logo text-primary-300 ">TravelYouuu</h1>
                </a>
              </div>
              
              <div className="flex flex-row gap-6">
            
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
                {open && <div
                  className={`fixed px-8 py-4 rounded-lg bg-gray-50/70 right-4 top-20 `}
                >
                  <ul className="flex flex-col gap-2">
                    <li>
                      <Link href="#home"> Home </Link>
                    </li>
                    <li>
                      <Link href="#about"> About </Link>
                    </li>
                    <li>
                      <Link href="#destination"> Destination </Link>
                    </li>
                    <li>
                      <Link href="#"> Promo </Link>
                    </li>
                    <li>
                      <Link href="#"> Cart </Link>
                    </li>
                   
                      <li>
                      <Link href={'/auth/login'} className="text-green-400">
                        Log In
                      </Link>
                    </li>
                   </ul>
                </div>}
              </div>
            </div>
    
            {/* NavDesktop */}
            <div className="z-30 items-center justify-center hidden w-full px-6 bg-transparent md:fixed top-3 h-14 md:flex md:w-full">
              <div className="flex flex-row items-center justify-between max-w-screen-xl gap-16 p-2 rounded-lg bg-white/65">
                <ul className="flex flex-row justify-center gap-8 font-thin text-black/85 ">
                  <li>
                    <Link href={"/#hero" }className="p-2 inline-flex items-center gap-2  rounded-md hover:text-white hover:bg-primary-100">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href={'/#about'} className="p-2 inline-flex items-center gap-2  rounded-md hover:text-white hover:bg-primary-100">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href={'/#promo'} className="p-2 inline-flex items-center gap-2  rounded-md hover:text-white hover:bg-primary-100">
                      Promo
                    </Link>
                  </li>
                </ul>
                <h1 className="text-xl font-bold text-primary-300 drop-shadow-md font-travelyouu ">
                  TravelYouuu
                </h1>
                <ul className="flex flex-row justify-center gap-8 font-thin text-black/85 ">
                  <li>
                    <Link href={'/#destination'} className="p-2 rounded-md inline-flex items-center gap-2  hover:text-white hover:bg-primary-100">
                      Destination
                    </Link>
                  </li>
                  
                  <li>
                    <Link href="/cart" className="p-2 inline-flex items-center gap-2  rounded-md hover:text-white hover:bg-primary-100">
                      <FontAwesomeIcon className="mr-2" icon={faCartShopping}/>
                      Cart ({carts.length})
                    </Link>
                  </li>
                 
                  {user && isAuthenticated ? 
                    <li>
                      <Link href={'/auth/Login'} className="p-2 text-black border inline-flex items-center gap-2  border-white rounded-md cursor-pointer hover:text-black hover:bg-gray-200/75">
                        <Image 
                          width={1000}
                          height={1000}
                          alt="Profile"
                          className="size-6 rounded-full bg-cover bg-center"
                          src={user.profilePictureUrl}
                        /> Logout
                      </Link>
                    </li> 
                    : <li>
                      <Link href={'/auth/Login'} className="p-2 text-black border border-white rounded-md cursor-pointer hover:text-black hover:bg-gray-200/75">
                        <FontAwesomeIcon icon={faUser} className="mr-2" /> Login
                      </Link>
                    </li>}
                  
                </ul>
              </div>
            </div>
          </div>
          
         
          {/* {modalRegister && <Register/>} */}
        </header>
      );
}