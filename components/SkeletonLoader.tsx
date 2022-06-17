const SkeletonLoader = () => {
  return (
    <div className="w-2/3 mx-auto px-16 mb-6">
      <div className="flex animate-pulse p-16 bg-emerald-100 rounded-md border-2 flex-row justify-center space-x-5">
        <div className="flex justify-evenly flex-col">
          <div className="w-full bg-gray-300 h-4 mb-1.5 rounded-lg "></div>
          <div className="w-12 bg-gray-300 h-4 mb-1.5 rounded-lg "></div>
          <div className="w-12 bg-gray-300 h-4 mb-1.5 rounded-lg "></div>
          <div className="w-12 bg-gray-300 h-4 mb-1.5 rounded-lg "></div>
          <div className="w-12 bg-gray-300 h-4 mb-1.5 rounded-lg "></div>
          <div className="w-12 bg-gray-300 h-4 mb-1.5 rounded-lg "></div>
          <div className="w-12 bg-gray-300 h-4 mb-1.5 rounded-lg "></div>
          <div className="w-12 bg-gray-300 h-4 mb-1.5 rounded-lg "></div>
          <div className="w-12 bg-gray-300 h-4 mb-1.5 rounded-lg "></div>
        </div>
        <div className="flex w-full flex-col space-y-3">
          <div className=" bg-gray-300 h-96 rounded-md "></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
