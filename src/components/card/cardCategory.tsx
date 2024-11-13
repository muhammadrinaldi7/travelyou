import Image from "next/image";

export default function CardCategory(props: {
    name: string;
    imageUrl: string;
}) {
    return (
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg">
            <Image
            width={1000}
            height={1000} 
            src={props.imageUrl}
            className="object-cover w-full rounded-lg h-36" 
            alt="destination" />
            <h2 className="mt-2 text-lg font-bold text-gray-800">{props.name}</h2>
        </div>
    )
}