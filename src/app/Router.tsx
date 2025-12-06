import { Route, Routes } from "react-router";
import Landing from "./routes/Landing";
import Home from "./routes/app/Home";
import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";
import Dashboard from "./routes/app/Dashboard";
import Transfer from "./routes/app/Transfer";
import Transactions from "./routes/app/Transactions";

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="transfer" element={<Transfer />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;
