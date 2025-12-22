import { logoutApi } from "@/apis/postRequests";
import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function useLogout() {
  const { setIsLoggingOut } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutApi,
    onError: () => {
      toast.error("Internal server error while logging out, try again.");
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["verify-user"] });
      queryClient.removeQueries({ queryKey: ["user-bootstrap"] });
      setIsLoggingOut(true);
      navigate("/login", { replace: true });
    },
    onSettled: () => {
      setIsLoggingOut(false);
    },
  });
}
