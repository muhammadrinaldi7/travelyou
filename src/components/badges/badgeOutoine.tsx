import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const BadgeOutline = ({
  title,
  color,
  icon,
}: {
  title: string;
  color: string;
  icon: IconDefinition;
}) => {
  return (
    <span
      className={`inline-flex items-center ${color} justify-center rounded-full  px-2.5 py-0.5 text-white`}
    >
      <FontAwesomeIcon icon={icon} className="-ms-1 me-1.5 size-4" />

      <p className="whitespace-nowrap text-sm">{title}</p>
    </span>
  );
};
