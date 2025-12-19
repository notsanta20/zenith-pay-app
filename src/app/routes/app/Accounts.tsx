import AllAccounts from "@/components/custom/Accounts/AllAccounts";
import SiteHeader from "@/components/custom/SiteHeader";
import { SidebarInset } from "@/components/ui/sidebar";

export default function Accounts() {
  return (
    <SidebarInset className="px-5 py-5 flex flex-col min-w-0 hover:cursor-default h-screen">
      <SiteHeader heading="Transactions" username={null} />
      <main className="flex-1 flex flex-col pt-25 gap-30 min-h-0 overflow-hidden">
        <AllAccounts />
      </main>
    </SidebarInset>
  );
}
