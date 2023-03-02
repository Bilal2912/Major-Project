import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="h-40 w-40 border-b-4 border-black rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
