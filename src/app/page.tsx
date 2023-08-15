import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/components/buttons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User } from "@components/user.component";

export default async function Home() {
  // this is a server component, so getting session is done as follows
  const session = await getServerSession(authOptions);
  // console.log(session);
  return (
    <>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          width: "500px",
          border: "red 20px"
        }}
      >
        <div className="flex flex-col flex-wrap border-2 border-red-400 rounded-xl overflow-visible">
          <div>
            <LoginButton />
            <RegisterButton />
            <LogoutButton />
            <ProfileButton />
          </div>
          <br />
          
          <h1>Server Session</h1>
          <pre className="whitespace-pre-wrap ">{JSON.stringify(session)}</pre>
          <br />

          <User />
        </div>
      </main>
    </>
  );
}
