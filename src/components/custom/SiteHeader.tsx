import { getCurrentDate, formatLoginDate } from "@/utils/formatDate";
import { ModeToggle } from "../ModeToggle";
import type { AuthContextValue } from "@/types/types";
import { useAuth } from "@/context/AuthContext";
import { SidebarTrigger } from "../ui/sidebar";

function SiteHeader({
  heading,
  username,
}: {
  heading: string;
  username: string | null;
}) {
  const { lastLogin }: AuthContextValue = useAuth();
  const currentDate: string = getCurrentDate();
  const lastLoginFormatted: string = lastLogin
    ? formatLoginDate(lastLogin)
    : "null";

  return (
    <header className="w-full flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="md:hidden">
          <SidebarTrigger />
        </div>

        <div className="flex flex-col text-3xl font-semibold">
          <h1 className="leading-none">{heading}</h1>
          {username && <h2>{username}</h2>}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <ModeToggle />
        <div className="hidden md:flex flex-col items-end">
          <h2 className="text-3xl font-semibold">{currentDate}</h2>
          <h2 className="text-sm text-muted-foreground">
            last login {lastLoginFormatted}
          </h2>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
