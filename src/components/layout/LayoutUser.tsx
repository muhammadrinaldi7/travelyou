import React from "react";

export default function LayoutUser(props: {
  children: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <>
      <section className="container bg-gray-100 mx-auto py-16">
        <div className="flex flex-col gap-2 p-8 mx-6 bg-white/90 shadow-md border-dashed border-2 rounded-lg">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {" "}
              {props.title}
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {" "}
              {props.desc}
            </p>
          </div>
          {props.children}
        </div>
      </section>
    </>
  );
}
