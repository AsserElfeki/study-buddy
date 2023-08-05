import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();
  const isActive = pathname;
  return (
    <div className="md:hidden w-72 h-screen bg-red-900 text-white fixed top-0 right-0 flex flex-col justify-center items-center ">
      <ul className="text-xl flex flex-col gap-7  text-center">
        <li className="">
          <Link
            href="/about"
            className={`hover:border-b-2 hover:border-white transition-all duration-150 ${
              isActive === "/about" ? "border-b-2 border-white" : ""
            }`}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/search"
            className={`hover:border-b-2 hover:border-white transition-all duration-150 ${
              isActive === "/search" ? "border-b-2 border-white" : ""
            }`}
          >
            Search
          </Link>
        </li>
        <li>
          <Link
            href="/faq"
            className={`hover:border-b-2 hover:border-white transition-all duration-150 ${
              isActive === "/faq" ? "border-b-2 border-white" : ""
            }`}
          >
            Faq
          </Link>
        </li>
        <li>
          <Link
            href="/testimonials"
            className={`hover:border-b-2 hover:border-white transition-all duration-150 ${
              isActive === "/testimonials" ? "border-b-2 border-white" : ""
            }`}
          >
            Testimonials
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
