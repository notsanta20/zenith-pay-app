import { Route, Routes } from "react-router";
import Landing from "./routes/Landing";
import Home from "./routes/app/Home";
import Login from "./routes/auth/Login";
import Register from "./routes/auth/register";

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default Router;
