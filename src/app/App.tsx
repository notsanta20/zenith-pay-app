import { ThemeProvider } from "@/components/ThemeProvider";
import Router from "./Router";
import { useState } from "react";
import { UserIdContext } from "@/context/context";

function App() {
  const [userId, setUserId] = useState<string>("");
  return (
    <ThemeProvider>
      <UserIdContext value={{ userId, setUserId }}>
        <Router />
      </UserIdContext>
    </ThemeProvider>
  );
}

export default App;
