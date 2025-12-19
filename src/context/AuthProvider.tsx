import { getUserBootstrap, verifyUserApi } from "@/apis/getRequests";
import { onBoardType, type AuthContextValue } from "@/types/types";
import { useMemo } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router";

interface AuthProviderProps {
  children: ReactNode;
}

const PUBLIC_ROUTES = ["/", "/login", "/register"];

export default function AuthProvider({ children }: AuthProviderProps) {
  const location = useLocation().pathname;

  const isPublicRoute = PUBLIC_ROUTES.some((path) => location.startsWith(path));

  const verifyUser = useQuery({
    queryKey: ["verify-user"],
    queryFn: async () => {
      const data = await verifyUserApi();
      return data;
    },
    enabled: isPublicRoute,
    retry: false,
    staleTime: Infinity,
  });

  const isAuthenticated: boolean = verifyUser.data?.data.authenticated === true;

  if (verifyUser.isError) {
    const message: string = verifyUser.error.response.data.message;
    if (message === "JWT token expired") {
      toast.error(message);
    } else if (message === "Invalid JWT token") {
      toast.error(message);
    } else {
      toast.error("Internal server error");
    }
  }

  const userBootstrap = useQuery({
    queryKey: ["user-bootstrap"],
    queryFn: async () => {
      const data = await getUserBootstrap();
      return data;
    },
    enabled: verifyUser.data?.data.authenticated === true,
  });

  const isLoading: boolean =
    verifyUser.isLoading || (isAuthenticated && userBootstrap.isLoading);

  let onBoard: string = onBoardType.login;

  if (userBootstrap.isSuccess) {
    const onBoardRes: string = userBootstrap.data?.data;

    onBoard = (() => {
      if (!onBoardRes.active) return onBoardType.profile;
      if (!onBoardRes.kycStatus || onBoardRes.accountCount == 0)
        return onBoardType.account;

      return onBoardType.app;
    })();
  }

  let username: string | null = null;
  let lastLogin: string | null = null;

  if (userBootstrap.isSuccess) {
    username = userBootstrap.data?.data.username;
    lastLogin = userBootstrap.data?.data.lastLoginAt;
  }

  const values = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      isLoading,
      onBoard,
      username,
      lastLogin,
    }),
    [isAuthenticated, isLoading, onBoard, username, lastLogin],
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
