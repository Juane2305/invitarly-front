import React from "react";
import { ClipLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <ClipLoader color="#3B82F6" size={60} />
    </div>
  );
};

export default Spinner;