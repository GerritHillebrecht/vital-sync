import { createI18nMiddleware } from "next-international/middleware";
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "de"],
  defaultLocale: "en",
});

export async function middleware(request: NextRequest) {
  const redirect = I18nMiddleware(request);

  if (redirect.status !== 200) {
    return redirect;
  }

  return await updateSession(request);
}

// export async function middleware(request: NextRequest) {
//   return await updateSession(request);
// }

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|txt|webmanifest|glb|jpeg|gif|webp)$).*)",
  ],
};

// export const config = {
//   matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
// }
