import { Card } from "@/components/custom/Card";
import LatestTransactions from "@/components/custom/LatestTransactions";
import SimpleHeading from "@/components/custom/SimpleHeading";
import SiteHeader from "@/components/custom/SiteHeader";
import { SidebarInset } from "@/components/ui/sidebar";

function Dashboard() {
  return (
    <SidebarInset className="px-5 py-5 flex flex-col min-w-0 hover:cursor-default">
      <SiteHeader
        heading="Welcome back,"
        name="santa"
        lastLogin="2025-12-02 06:55:26.957"
      />
      <main className="flex-auto flex flex-col py-25 gap-30">
        <div className="flex flex-col gap-5">
          <SimpleHeading text="Balance" />
          <span
            className="font-(family-name:--dm-serif) text-6xl"
            onMouseOver={(e) => {
              e.target.textContent = "₹12,28,843.41";
            }}
            onMouseOut={(e) => {
              e.target.textContent = "(╥﹏╥)";
            }}
          >
            (⌐■_■)
          </span>
        </div>
        <div className="flex flex-col gap-5">
          <SimpleHeading text="Accounts" />
          <div className="flex gap-5 overflow-auto">
            <Card
              variant="default"
              accountName="Savings"
              balance={98298.3}
              outstanding={21701.7}
              accountNumber="3600"
            />
            <Card
              variant="orange"
              accountName="Credit card"
              balance={98298.3}
              outstanding={21701.7}
              accountNumber="3600"
            />
            <Card
              variant="blue"
              accountName="Savings"
              balance={98298.3}
              outstanding={21701.7}
              accountNumber="3600"
            />
            <Card
              variant="purple"
              accountName="Savings"
              balance={98298.3}
              outstanding={21701.7}
              accountNumber="3600"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <SimpleHeading text="Latest transactions" />
          <LatestTransactions />
        </div>
      </main>
    </SidebarInset>
  );
}

export default Dashboard;
