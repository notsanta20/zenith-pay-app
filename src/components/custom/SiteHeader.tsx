import { getCurrentDate, formatLoginDate } from "@/utils/formatDate";

function SiteHeader({
  heading,
  name = null,
  lastLogin,
}: {
  heading: string;
  name: string | null;
  lastLogin: string;
}) {
  const currentDate: string = getCurrentDate();
  const lastLoginFormatted: string = formatLoginDate(lastLogin);

  return (
    <header className="w-full flex">
      <div className="flex-auto flex flex-col text-3xl">
        <h1>{heading}</h1>
        {name && <h2>name</h2>}
      </div>
      <div className=" flex flex-col items-center gap-2">
        <h2 className="text-4xl">{currentDate}</h2>
        <h2 className="text-sm">last login {lastLoginFormatted}</h2>
      </div>
    </header>
  );
}

export default SiteHeader;
