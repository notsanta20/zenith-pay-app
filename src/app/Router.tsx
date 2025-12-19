import { Route, Routes } from "react-router";
import Landing from "./routes/Landing";
import Home from "./routes/app/Home";
import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";
import Dashboard from "./routes/app/Dashboard";
import Transfer from "./routes/app/Transfer";
import Transactions from "./routes/app/Transactions";
import CreateProfile from "./routes/app/CreateProfile";
import CreateAccount from "./routes/app/CreateAccount";
import ProtectedRoute from "@/components/custom/ProtectedRoute";
import ErrorPage from "./routes/ErrorPage";
import Accounts from "./routes/app/Accounts";
import Notifications from "./routes/app/Notifications";
import Profile from "./routes/app/Profile";

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/app" element={<Home />}>
            <Route index element={<Dashboard />} />
            <Route path="transfer" element={<Transfer />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default Router;
