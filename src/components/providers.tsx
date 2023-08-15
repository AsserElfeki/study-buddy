"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

/**
 * wraps the NextAuthProvider component around its children.
 * used as a wrapper in the layout or in any routes/pages that the session is needed at 
 * @param {Props} children - The child components to be rendered.
 * @return {JSX.Element} The rendered NextAuthProvider component.
 */
export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
