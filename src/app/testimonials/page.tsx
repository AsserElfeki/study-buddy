import Navbar from "@src/components/navbar";
import TestimonialsCard from "@src/components/testimonialCard";
import React from "react";

function Testimonials() {
  return (
    <div className='mx-auto '>
      <div className="bg-white my-2 py-10">
        <div className="w-10/12 md:w-3/5 flex flex-col mx-auto">
          <h1 className="text-xl md:text-3xl font-bold mb-3">Testimonials</h1>
          <p className="text-base md:text-lg ">
            Read what students who have used our website have to say about their
            experiences with applying to universities in Poland.
          </p>
        </div>
      </div>
      <TestimonialsCard />
      {/* <TestimonialsCard />
      <TestimonialsCard />
      <TestimonialsCard />
      <TestimonialsCard />
      <TestimonialsCard />
      <TestimonialsCard /> */}

    </div>
  );
}

export default Testimonials;
