import { auth as middleware } from "@/auth";

const publicRoutes = ["/"];
const authRoutes = ["/signin", "/signup"];
const defaultLoginRedirect = "/";

export default middleware((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  console.log("ppp", isLoggedIn, nextUrl.pathname);
  if (authRoutes.includes(nextUrl.pathname)) {
    if (isLoggedIn) {
      const absoluteURL = new URL(defaultLoginRedirect, nextUrl);
      return Response.redirect(absoluteURL);
    }
    return;
  }
  if (!isLoggedIn && !publicRoutes.includes(nextUrl.pathname)) {
    const absoluteURL = new URL("/signin", nextUrl);
    return Response.redirect(absoluteURL);
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
