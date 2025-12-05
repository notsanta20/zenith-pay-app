import { format } from "date-fns";

function getCurrentDate() {
  const date: String = format(new Date(), "ccc, MMM dd");
  return date;
}

export default getCurrentDate;
