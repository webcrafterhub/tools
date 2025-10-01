// No authentication middleware needed
export default function middleware() {
  // No authentication required
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
