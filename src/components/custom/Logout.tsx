import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import useLogout from "@/hooks/useLogout";

export default function Logout() {
  const logout = useLogout();
  return (
    <div className="md:flex-1 flex items-center justify-end">
      <Button
        variant={"ghost"}
        onClick={() => {
          logout.mutate();
        }}
      >
        <LogOut />
      </Button>
    </div>
  );
}
