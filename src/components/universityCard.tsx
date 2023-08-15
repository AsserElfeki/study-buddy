import React from "react";

function UniversityCard() {
  return (
    <div className=" w-11/12 lg:w-3/5 mx-auto mt-2 bg-white rounded-xl flex flex-col md:flex-row md:items-center justify-between p-5 xl:p-10">
      <div className="w-full md:w-2/3">
        <h3 className="text-xl md:text-2xl font-bold">Computer Science</h3>
        <p>
          Earn your business bachelor’s degree with a focus on the changing
          global travel and tourism industry.
        </p>
        <p className="text-red-900 font-medium mt-4 text-xs md:text-sm">
          #Silesian University of Technology
        </p>
      </div>

      <div className="text-right text-sm md:text-xl font-bold">
        <h3>1100 EUR / sem </h3>
        <h3>3.5 years</h3>
      </div>
    </div>
  );
}

export default UniversityCard;
