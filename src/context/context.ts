import type { userIdContext } from "@/types/types";
import { createContext } from "react";

export const UserIdContext = createContext<userIdContext | undefined>(
  undefined
);
