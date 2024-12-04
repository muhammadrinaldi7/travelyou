import Image from "next/image";

export const CardPromo = (props: {
  discount: string;
  imageUrl: string;
  title: string;
  description: string;
}) => {
  return (
    <>
      <div className="relative block bg-white/90 shadow-xl hover:shadow-md rounded-bl-3xl rounded-tr-3xl border border-gray-100">
        <span className="absolute -right-px -top-px rounded-bl-3xl rounded-tr-3xl bg-rose-500 px-6 py-4 font-medium uppercase tracking-widest text-white">
          {props.discount} IDR.
        </span>

        <Image
          src={props.imageUrl || "/img/noimage.webp"}
          alt={props.title}
          width={1000}
          height={1000}
          className="-ml-6 -mt-6 h-80 w-full rounded-bl-3xl hover:ml-0 rounded-tr-3xl border border-gray-300 object-cover"
        />

        <div className="p-4 text-center ">
          <strong className="text-lg  text-gray-900">
            {" "}
            {props.title.slice(0, 29)}{" "}
          </strong>

          <p className="mt-2 w-full h-10 flex items-center justify-center text-pretty text-gray-700">
            {props.description.slice(0, 50)}
          </p>

          <span className="mt-4 block rounded-md border border-primary-300 bg-primary-300 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-primary-300">
            Learn More
          </span>
        </div>
      </div>
    </>
  );
};
