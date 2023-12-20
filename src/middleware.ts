
export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/profile", "/apply/:path*", "/forum/:path*", "/dashboard/:path*"  ]
    
};