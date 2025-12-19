import { format } from "date-fns";

const DATE_FORMAT: string = "ccc, MMM dd";
const DATE_FORMAT_EXTENDED: string = "ccc MMM dd hh:mm aaa";
const DATE_FORMAT_LOGIN: string = "MMM dd, yyyy hh:mm a";

function getCurrentDate() {
  const date: string = format(new Date(), DATE_FORMAT);
  return date;
}

function formatDate(date: string) {
  const formattedDate: string = format(new Date(date), DATE_FORMAT);
  return formattedDate;
}

function formatLoginDate(date: string) {
  const formattedDate: string = format(new Date(date), DATE_FORMAT_LOGIN);
  return formattedDate;
}

function formatDateExtended(date: string) {
  const formattedDate: string = format(new Date(date), DATE_FORMAT_EXTENDED);
  return formattedDate;
}

export { getCurrentDate, formatDate, formatLoginDate, formatDateExtended };
