import { getCurrentDate, formatLoginDate } from "@/utils/formatDate";
import { ModeToggle } from "../ModeToggle";

function SiteHeader({
  heading,
  name = null,
}: {
  heading: string;
  name: string | null;
}) {
  const currentDate: string = getCurrentDate();
  const lastLoginFormatted: string = formatLoginDate("2025-12-02 06:55:26.957");

  return (
    <header className="w-full flex">
      <div className="flex-auto flex flex-col text-3xl font-semibold">
        <h1>{heading}</h1>
        {name && <h2>{name}</h2>}
      </div>
      <div className="flex items-center gap-3">
        <ModeToggle />
        <div className=" flex flex-col items-center">
          <h2 className="text-3xl font-semibold">{currentDate}</h2>
          <h2 className="text-sm">last login {lastLoginFormatted}</h2>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
