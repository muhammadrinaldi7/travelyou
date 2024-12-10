import {
  faCheckCircle,
  faClockRotateLeft,
  faTriangleExclamation,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const PaidBadge = () => {
  return (
    <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
      <FontAwesomeIcon icon={faCheckCircle} className="-ms-1 me-1.5 size-4" />

      <p className="whitespace-nowrap text-sm">Paid</p>
    </span>
  );
};
export const UnpaidBadge = () => {
  return (
    <span className="inline-flex items-center justify-center rounded-full bg-rose-100 px-2.5 py-0.5 text-rose-700">
      <FontAwesomeIcon icon={faXmarkCircle} className="-ms-1 me-1.5 size-4" />

      <p className="whitespace-nowrap text-sm">Unpaid</p>
    </span>
  );
};

export const FailedBadge = () => {
  return (
    <span className="inline-flex items-center justify-center rounded-full bg-rose-100 px-2.5 py-0.5 text-rose-700">
      <FontAwesomeIcon
        icon={faTriangleExclamation}
        className="-ms-1 me-1.5 size-4"
      />

      <p className="whitespace-nowrap text-sm">Failed</p>
    </span>
  );
};

export const SuccessBadge = () => {
  return (
    <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
      <FontAwesomeIcon icon={faCheckCircle} className="-ms-1 me-1.5 size-4" />

      <p className="whitespace-nowrap text-sm">Success</p>
    </span>
  );
};

export const CanceledBadge = () => {
  return (
    <span className="inline-flex items-center justify-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-yellow-700">
      <FontAwesomeIcon
        icon={faClockRotateLeft}
        className="-ms-1 me-1.5 size-4"
      />

      <p className="whitespace-nowrap text-sm">Canceled</p>
    </span>
  );
};
