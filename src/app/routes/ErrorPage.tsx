import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-7xl font-bold">404 PAGE NOT FOUND</h1>
      <Link to="/app" className="mt-4 text-xl text-muted-foreground">
        ¯\_(ツ)_/¯
      </Link>
    </main>
  );
}
