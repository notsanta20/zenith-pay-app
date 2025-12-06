import { format } from "date-fns";

const DATE_FORMAT: string = "ccc, MMM dd";

function getCurrentDate() {
  const date: string = format(new Date(), DATE_FORMAT);
  return date;
}

function formatDate(date: string) {
  const formattedDate: string = format(new Date(date), DATE_FORMAT);
  return formattedDate;
}

export { getCurrentDate, formatDate };
