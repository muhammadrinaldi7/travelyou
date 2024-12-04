const LayoutDashboard = ({
  children,
  title,
  desc,
}: {
  children: React.ReactNode;
  title: string;
  desc: string;
}) => {
  return (
    <div className="p-6 bg-gray-100">
      <div className="p-4 border-2 border-primary-300 bg-white shadow-md drop border-dashed rounded-lg dark:border-gray-700 mt-14">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {" "}
          {title}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {" "}
          {desc}{" "}
        </p>
        {children}
      </div>
    </div>
  );
};

export default LayoutDashboard;
