import Navbar from "@src/components/Navbar";
import UniversityCard from "@src/components/UniversityCard";

function About() {
  return (
    <div className="w-screen">
      <div className="py-10 bg-[url('/students.jpg')] bg-cover bg-center bg-no-repeat h-auto flex items-center justify-center">
        <div className="w-full xl:w-3/5 flex-col my-auto bg-red-900 bg-opacity-70 text-white p-10 lg:py-20 lg:px-32 rounded-xl ">
          <h1 className="text-3xl sm:text-5xl font-bold mb-3">
            Study in Poland
          </h1>
          <p className="text-xl sm:text-2xl ">
            Your one-stop-shop for applying and connecting with other students.
          </p>
          <button className="mt-10 bg-white text-red-900 text-sm py-2 px-5 font-bold rounded-lg cursor-pointer">
            Search for university
          </button>
        </div>
      </div>

      <div className=" bg-white flex items-center  justify-center">
        <div className="w-10/12 xl:w-3/5 flex-col py-5  xl:px-32  ">
          <h3 className="text-xl font-bold ">
            Bachelor&rsquo;s degrees from all around Poland
          </h3>
          <p>256 Universities</p>
          <form className="mt-3 flex flex-col md:flex-row md:flex-nowrap  text-center ">
            <input
              type="text"
              placeholder="Field"
              className="bg-gray-100 px-5 py-1 rounded-lg focus:outline-none mt-1 md:mr-2 "
            />
            <input
              type="text"
              placeholder="City"
              className="bg-gray-100 px-5 py-1 rounded-lg focus:outline-none mt-1 md:mr-2 "
            />
            <button className=" bg-red-900 text-white px-10 py-1  rounded-lg cursor-pointer mt-2">
              Search
            </button>
          </form>
        </div>
      </div>

      <UniversityCard />
    </div>
  );
}

export default About;
