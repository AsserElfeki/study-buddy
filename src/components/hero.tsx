// HeroSection.tsx
import Link from 'next/link'; // Next.js Link component for navigation

const HeroSection: React.FC = () => {
    return (
        <section className="bg-[url('/images/Hero-bg.jpg')] bg-no-repeat bg-cover flex bg-scroll w-full justify-center ">
            <div className="mx-auto flex p-8 md:p-24 flex-col items-center ">
                <div className="flex flex-col p-4 sm:p-8 md:p-24 md:mb-0 items-center text-center bg-primary bg-opacity-90 rounded-lg">
                    <h1 className="text-3xl md:text-5xl mb-4 font-black text-white text-center">
                        Study Buddy
                    </h1>
                    <p className="mb-8 leading-relaxed text-white">
                        Your one-stop-shop for applying and connecting with other students.
                    </p>
                    <div className="flex self-start items-start ">
                        <Link
                            className=''
                            href="/search">
                            <p className="border-1 border-white bg-white text-black font-bold text-xl p-4 rounded-lg ">Search for university</p>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
