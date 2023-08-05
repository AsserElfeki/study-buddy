import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/components/buttons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User } from '@components/user.component';

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        width: "500px"
      }}
    >
      <div className='flex flex-wrap mx-20 px-8 border-2 border-black'>
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton />

        <h1>Server Session</h1>
        <pre className='flex flex-wrap'>{JSON.stringify(session)}</pre>
        <User />
      </div>
    </main>
  );
}
        <h1>Server Session</h1>
        <pre className='flex flex-wrap'>{JSON.stringify(session)}</pre>
        <User />
      </div>
    </main>
  );
}
