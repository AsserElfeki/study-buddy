
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import { User } from "@components/user.component";
import HeroSection from '@src/components/hero';
import SearchBox from '@src/components/searchBox';

export default async function Home() {
  // this is a server component, so getting session is done as follows
  const session = await getServerSession(authOptions);
  // console.log(session);
  return (
    <section className='flex flex-col w-full'>
      <HeroSection />
      <SearchBox />
    </section>
  );
}
