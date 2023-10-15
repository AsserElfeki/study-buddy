import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@components/buttons";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import { User } from "@components/user.component";

export default async function Home() {
  // this is a server component, so getting session is done as follows
  const session = await getServerSession(authOptions);
  // console.log(session);
  return (
    <>
      
    </>
  );
}
