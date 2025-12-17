import { useAuth } from "@/context/AuthContext";
import { onBoardType } from "@/types/types";
import { Navigate, Outlet, useLocation } from "react-router";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading, onBoard } = useAuth();
  const location = useLocation();

  if (isLoading)
    return (
      <>
        <main className="flex justify-center items-center h-screen">
          <h1>loading....</h1>
        </main>
      </>
    );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (onBoard === onBoardType.profile) {
    return location.pathname === "/create-profile" ? (
      <Outlet />
    ) : (
      <Navigate to="/create-profile" replace />
    );
  }

  if (onBoard === onBoardType.account) {
    return location.pathname === "/create-account" ? (
      <Outlet />
    ) : (
      <Navigate to="/create-account" replace />
    );
  }

  if (onBoard === onBoardType.app) {
    if (
      location.pathname.startsWith("/create-profile") ||
      location.pathname.startsWith("/create-account")
    ) {
      return <Navigate to="/app" replace />;
    }
  }

  return <Outlet />;
}
