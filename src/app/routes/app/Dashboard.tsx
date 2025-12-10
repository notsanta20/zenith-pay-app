import Balance from "@/components/custom/Dashboard/Balance";
import SiteHeader from "@/components/custom/SiteHeader";
import { SidebarInset } from "@/components/ui/sidebar";
import Accounts from "@/components/custom/Dashboard/Accounts";
import Transactions from "@/components/custom/Dashboard/Transactions";

function Dashboard() {
  return (
    <SidebarInset className="px-5 py-5 flex flex-col min-w-0 hover:cursor-default">
      <SiteHeader heading="Welcome back," name="santa" />
      <main className="flex-auto flex flex-col py-25 gap-30">
        <Balance />
        <Accounts />
        <Transactions />
      </main>
    </SidebarInset>
  );
}

export default Dashboard;
