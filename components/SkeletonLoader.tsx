const SkeletonLoader = () => {
  return (
    <div className="w-100 h-48 border-2 rounded-md mx-auto mb-6">
      <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
        <div>
          <div className="w-12 bg-gray-300 h-4 mb-1.5 rounded-lg "></div>
          <div className="w-12 bg-gray-300 h-4 mb-1.5 rounded-lg "></div>
          <div className="w-12 bg-gray-300 h-4 mb-1.5 rounded-lg "></div>
          <div className="w-12 bg-gray-300 h-4 mb-1.5 rounded-lg "></div>
          <div className="w-12 bg-gray-300 h-4 mb-1.5 rounded-lg "></div>
        </div>
        <div className="flex flex-col space-y-3">
          <div className="w-64 bg-gray-300 h-28 rounded-md "></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
