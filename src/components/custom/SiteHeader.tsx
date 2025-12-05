import getCurrentDate from "@/utils/getCurrentDate.ts";

function SiteHeader() {
  const currentDate: String = getCurrentDate();

  return (
    <header className="w-full flex">
      <div className="flex-auto flex flex-col text-3xl">
        <h1>Welcome Back,</h1>
        <h2>Santa</h2>
      </div>
      <div className=" flex flex-col items-center gap-2">
        <h2 className="text-4xl">{currentDate}</h2>
        <h2 className="text-sm">last login Dec 1, 2025</h2>
      </div>
    </header>
  );
}

export default SiteHeader;
