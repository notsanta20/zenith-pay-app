import SiteHeader from "@/components/custom/SiteHeader";
import AllTransactions from "@/components/custom/Transactions/AllTransactions";
import { SidebarInset } from "@/components/ui/sidebar";

function Transactions() {
  return (
    <SidebarInset className="px-5 py-5 flex flex-col min-w-0 hover:cursor-default h-screen">
      <SiteHeader heading="Transactions" username={null} />
      <main className="flex-auto flex flex-col pt-25 gap-30 overflow-hidden">
        <AllTransactions />
      </main>
    </SidebarInset>
  );
}

export default Transactions;
