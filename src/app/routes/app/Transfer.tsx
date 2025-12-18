import SiteHeader from "@/components/custom/SiteHeader";
import Transact from "@/components/custom/Transactions/Transact";
import { SidebarInset } from "@/components/ui/sidebar";

function Transfer() {
  return (
    <SidebarInset className="p-5 flex flex-col min-w-0 hover:cursor-default">
      <SiteHeader heading="Transfer" username={null} />
      <main className="flex-auto flex flex-col py-25 gap-30">
        <Transact />
      </main>
    </SidebarInset>
  );
}

export default Transfer;
