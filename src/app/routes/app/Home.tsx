import Sidebar from "@/components/custom/Sidebar";

function Home() {
  return (
    <main className="grid grid-cols-[150px_1fr] h-dvh">
      <Sidebar />
      <section className="bg-amber-100">section</section>
    </main>
  );
}

export default Home;
