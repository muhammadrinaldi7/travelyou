import { faCartPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function CardActivity(props: {
  price?: string;
  priceDiscount?: string;
  rating: number;
  riview: string;
  img: string | null;
  title?: string;
  desc?: string;
  date?: string;
}) {
  return (
    <div className="block p-4 rounded-lg shadow-sm max-w-80 bg-white/65 shadow-indigo-100">
      <Image
        width={1000}
        height={1000}
        alt=""
        src={props.img || "/img/favicon.ico"}
        className="object-cover h-56 rounded-md w-72"
      />

      <div className="mt-2">
        <dl>
          <div>
            <dt className="sr-only">Price</dt>

            <dd className="text-sm text-gray-500">{props.price}</dd>
          </div>

          <div>
            <dt className="sr-only">Address</dt>

            <dd className="font-medium">{props.title}</dd>
          </div>
        </dl>

        <div className="flex items-center justify-between gap-8 mt-6 text-xs">
          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <FontAwesomeIcon icon={faStar} className="text-indigo-700 size-4" />

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Rating</p>

              <p className="font-medium">{props.rating}</p>
            </div>
          </div>

          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <svg
              className="text-indigo-700 size-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Riview</p>

              <p className="font-medium">{props.riview}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="items-center p-2 text-white rounded-lg hover:cursor-pointer hover:bg-green-800/80 hover:text-gray-200 sm:inline-flex bg-green-600/85 sm:shrink-0 sm:items-center sm:gap-2">
              <FontAwesomeIcon icon={faEye} className="size-4" />
            </div>
            <div className="items-center p-2 text-white rounded-lg hover:cursor-pointer hover:bg-green-800/80 hover:text-gray-200 sm:inline-flex bg-green-600/85 sm:shrink-0 sm:items-center sm:gap-2">
              <FontAwesomeIcon icon={faCartPlus} className=" size-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
