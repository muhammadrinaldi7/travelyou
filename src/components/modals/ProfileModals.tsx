import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const ProfileModal = (props: { class: string; onOpen: () => void }) => {
  return (
    <>
      <div className={`hidden md:relative md:block ${props.class}`}>
        <div
          className="absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
          role="menu"
        >
          <div className="p-2">
            <Link
              href="/user/profile"
              className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-primary-300/65 hover:text-gray-700"
              role="menuitem"
            >
              My profile
            </Link>

            <Link
              href="/user/transaction"
              className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-primary-300/65 hover:text-gray-700"
              role="menuitem"
            >
              My Transaction
            </Link>
          </div>

          <div className="p-2">
            <button
              onClick={props.onOpen}
              type="submit"
              className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
              role="menuitem"
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="size-4"
              />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
