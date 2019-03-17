export function formatPrice(cents) {
  return (cents / 100).toLocaleString("en-ES", {
    style: "currency",
    currency: "EUR"
  });
}
