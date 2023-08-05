import Navbar from "@components/navbar";

function About() {
  return (
    <div>
      <Navbar />
      <div className="w-screen bg-white my-2 py-10">
        <div className="w-3/5 flex flex-col mx-auto">
          <h1 className="text-3xl font-bold mb-3">Testimonials</h1>
          <p className="text-lg ">
            Read what students who have used our website have to say about their
            experiences with applying to universities in Poland.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
