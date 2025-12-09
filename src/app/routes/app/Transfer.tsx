import SiteHeader from "@/components/custom/SiteHeader";
import { SidebarInset } from "@/components/ui/sidebar";

function Transfer() {
  return (
    <SidebarInset className="p-5 flex flex-col min-w-0 hover:cursor-default">
      <SiteHeader heading="Transfer" name={null} />
      <main className="flex-auto flex flex-col py-25 gap-30">
        <div className="flex flex-col gap-5 bg-sidebar rounded-lg p-5">
          <h2 className="font-semibold text-lg">From</h2>
        </div>
        <div className="flex flex-col gap-5 bg-sidebar rounded-lg p-5">
          <h2 className="font-semibold text-lg">Previous Transfers</h2>
        </div>
      </main>
    </SidebarInset>
  );
}

export default Transfer;
