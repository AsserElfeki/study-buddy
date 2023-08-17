export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/profile", "/apply", "/forum"],
    // matcher: ["/((?!register|api|login).*)"],
};
