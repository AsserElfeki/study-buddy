import FaqItem from "@src/components/faqItem";

function Faq() {
  return (
    <div>
      <div className="w-screen bg-white my-2 py-10">
        <div className="w-10/12 lg:w-3/5 flex flex-col mx-auto">
          <h1 className="text-xl md:text-3xl font-bold mb-3">
            Frequently asked questions
          </h1>
          <p className="text-base md:text-lg ">
            We understand that studying abroad can be a complex and sometimes
            overwhelming process, which is why we&rsquo;ve put together a list of
            frequently asked questions to help you better understand our website
            and how it can help you achieve your goals.
          </p>
          <div className=" mt-5">
            <input
              type="text"
              className="bg-gray-100 w-4/5 px-5 py-2 rounded-l-xl focus:outline-none"
              placeholder="Enter your question"
            />
            <button className="w-1/5 bg-red-900 text-white py-2 rounded-r-xl">
              Search
            </button>
          </div>
        </div>
      </div>
      <FaqItem />
    </div>
  );
}

export default Faq;
