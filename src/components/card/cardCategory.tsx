import Image from "next/image";

export default function CardCategory(props: {
  name: string;
  imageUrl: string;
}) {
  return (
    <div className="mt-3 rounded-lg bg-primary-300 relative">
      <Image
        width={1000}
        height={1000}
        src={props.imageUrl}
        className="object-cover min-w-36 rounded-lg h-20"
        alt="destination"
      />
      <h2 className="absolute inset-0 flex items-center justify-center text-nowrap text-lg font-travelyouu font-bold text-white">
        {props.name}
      </h2>
    </div>
  );
}
