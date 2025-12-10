import SimpleHeading from "../SimpleHeading";
import LatestTransactions from "../LatestTransactions";

export default function Transactions() {
  return (
    <section className="flex flex-col gap-5">
      <SimpleHeading text="Latest transactions" />
      <LatestTransactions />
    </section>
  );
}
