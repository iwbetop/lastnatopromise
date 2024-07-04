import { auth } from "./auth";
import { NextResponse } from "next/server";
import { 
    publicRoutes, 
    authenticationRoutes, 
    apiRoute, 
    adminRoute,
    extendedAdminRoute,
    onboard
} from "@/lib/routes";

export default auth((req) => {
  const { nextUrl } = req;
  const user = req.auth?.user;
  const userLogin = !!user;
  
  // Check if middleware is in api auth route
  const isApiAuth = nextUrl.pathname.startsWith(apiRoute);
  // Check if middleware is in public routes
  const isPublic = publicRoutes.includes(nextUrl.pathname);
  // Check if middleware is in signin and signup routes
  const isAuth = authenticationRoutes.includes(nextUrl.pathname);
  // Check if middleware is in admin or extended admin pages
  const isAdminPage = nextUrl.pathname.startsWith(adminRoute) || extendedAdminRoute.includes(nextUrl.pathname);

  // Redirect logic based on user authentication and roles
  if (isApiAuth) {
    return; // Allow API routes without redirection
  }

  if (isPublic || isAuth) {
    if (userLogin) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    // Allow public routes and auth routes for non-authenticated users
    return;
  }

  if (!userLogin) {
    return NextResponse.redirect(new URL("/signin", nextUrl));
  }

  // Handle redirects based on user roles
  switch (user.role) {
    case "SUPERADMIN":
      if (!isAdminPage) {
        return NextResponse.redirect(new URL("/superadmin", nextUrl));
      }
      break;
    case "ADMIN":
      if (!isAdminPage) {
        return NextResponse.redirect(new URL("/admin", nextUrl));
      }
      break;
    case "USER":
      if (!user.onboardingStatus && !nextUrl.pathname.startsWith("/onboard")) {
        return NextResponse.redirect(new URL("/onboard", nextUrl));
      }
      if(user.onboardingStatus && nextUrl.pathname.startsWith("/onboard")){
        return NextResponse.redirect(new URL("/", nextUrl));
      }
      break;
    default:
      return; // Handle unexpected cases or roles here if needed
  }

  // For roles that don't need redirection, allow access to other pages
  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
