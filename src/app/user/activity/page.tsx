// import Image from "next/image";

import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ActivityPage() {
    return(
        <>
        <div className="flex flex-col w-full bg-white">
            <div className="relative flex justify-center h-64 mx-1 bg-center bg-cover rounded-b-2xl" style={{ backgroundImage: "url('/img/blue-sea.webp')" }}>
                <div className="w-[80%] drop-shadow-xl shadow-lg h-60 container flex flex-col mx-auto mt-28 rounded-xl items-center p-6 bg-gray-100/95">
                    <div className="flex items-center justify-center w-full">
                        <h1 className="self-center text-xl font-travelyouu text-primary-300">TravelYouuu</h1>
                        <button className="absolute self-center px-3 py-2 text-sm border end-6 text-primary-200 border-primary-200 bg-primary-300/25 hover:bg-white/50 rounded-2xl" >
                            <FontAwesomeIcon icon={faFilter}/> <span>Filter</span>
                        </button>
                    </div>
                    <div className="relative w-full mt-8">
                        <span className="absolute inset-y-0 grid px-4 end-0 place-content-center">
                            <FontAwesomeIcon icon={faSearch}/>
                        </span>
                    <input type="text" placeholder="Cari Tempat Wisata Anda " className="self-center w-full text-gray-600 rounded-full focus:border-primary-300" />
                    </div>
                </div>
            </div>
            <div className="container flex justify-center mx-auto bg-white py-14">
            <h1>Activity</h1>
            </div>
        </div>
        </>
    )
}