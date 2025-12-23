import { getUserBootstrap, verifyUserApi } from "@/apis/getRequests";
import { onBoardType, type AuthContextValue } from "@/types/types";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import { AxiosError } from "axios";

interface AuthProviderProps {
  children: ReactNode;
}

const PUBLIC_ROUTES = ["/", "/login", "/register"];

export default function AuthProvider({ children }: AuthProviderProps) {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const isPublicRoute = PUBLIC_ROUTES.includes(location);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const verifyUser = useQuery({
    queryKey: ["verify-user"],
    queryFn: async () => {
      const data = await verifyUserApi();
      return data;
    },
    enabled: !isPublicRoute,
    retry: false,
  });

  const isAuthenticated: boolean = verifyUser.data?.data.authenticated === true;

  useEffect(() => {
    if (isAuthenticated && isPublicRoute) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, isPublicRoute, navigate]);

  if (verifyUser.isError && isLoggingOut) {
    if (verifyUser.error instanceof AxiosError) {
      if (verifyUser.error.response) {
        const status: number = verifyUser.error.response.status;
        if (status === 401) {
          toast.error("Session expired, login again.");
        } else {
          toast.error("Internal server error.");
        }
      }
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

  const isLoading: boolean = verifyUser.isLoading || userBootstrap.isLoading;

  let onBoard: string = onBoardType.login;

  if (userBootstrap.isSuccess) {
    const onBoardRes = userBootstrap.data?.data;

    onBoard = (() => {
      if (!onBoardRes.active) return onBoardType.profile;
      if (!onBoardRes.kycStatus || onBoardRes.accountCount == 0)
        return onBoardType.account;

      return onBoardType.app;
    })();
  }

  let username: string | null = null;
  let lastLogin: string | null = null;
  let securityNotifications: boolean = true;
  let generalNotifications: boolean = true;

  if (userBootstrap.isSuccess) {
    username = userBootstrap.data?.data.username;
    lastLogin = userBootstrap.data?.data.lastLoginAt;
    securityNotifications = userBootstrap.data?.data.securityNotifications;
    generalNotifications = userBootstrap.data?.data.generalNotifications;
  }

  const values = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      isLoading,
      onBoard,
      username,
      lastLogin,
      securityNotifications,
      generalNotifications,
      setIsLoggingOut,
    }),
    [
      isAuthenticated,
      isLoading,
      onBoard,
      username,
      lastLogin,
      securityNotifications,
      generalNotifications,
      setIsLoggingOut,
    ],
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
