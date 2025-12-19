import SiteHeader from "@/components/custom/SiteHeader";
import { SidebarInset } from "@/components/ui/sidebar";

export default function Profile() {
  return (
    <SidebarInset className="px-5 py-5 flex flex-col min-w-0 hover:cursor-default">
      <SiteHeader heading="Profile" username={null} />
      <main className="flex-auto flex flex-col py-25 gap-30"></main>
    </SidebarInset>
  );
}
