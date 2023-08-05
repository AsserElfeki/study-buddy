import Image from "next/image";
import profile from "/public/profile.jpg";

function TestimonialsCard() {
  return (
    <div className=" w-4/5 md:w-3/5 mx-auto">
      <div className=" bg-white mb-2 p-6 rounded-xl">
        <div className="flex gap-4 items-center ">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <Image
              src={profile}
              alt="Profile"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="font-bold">Asser Moustafa</h1>
            <p>Student from Egypt</p>
            <div />
          </div>
        </div>
        <p className="mt-2 text-justify">
          I had always dreamed of studying abroad, but I didn't know where to
          start. That's when I found this website, and it changed everything.
          The search feature made it easy for me to find the perfect program for
          my interests, and the application process was straightforward and
          stress-free. The support team was always available to answer my
          questions and guide me through each step of the process. Thanks to
          this website, I am now studying in Poland and living my dream!
        </p>
      </div>

      <div className=" bg-white mb-2 p-6 rounded-xl">
        <div className="flex gap-4 items-center ">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <Image
              src={profile}
              alt="Profile"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="font-bold">Asser Moustafa</h1>
            <p>Student from Egypt</p>
            <div />
          </div>
        </div>
        <p className="mt-2 text-justify">
          I had always dreamed of studying abroad, but I didn't know where to
          start. That's when I found this website, and it changed everything.
          The search feature made it easy for me to find the perfect program for
          my interests, and the application process was straightforward and
          stress-free. The support team was always available to answer my
          questions and guide me through each step of the process. Thanks to
          this website, I am now studying in Poland and living my dream!
        </p>
      </div>
    </div>
  );
}

export default TestimonialsCard;
