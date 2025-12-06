export function formatCurrency(number: number) {
  const formattedValue = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(number);

  return formattedValue;
}
