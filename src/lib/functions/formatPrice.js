export function formatPrice(price, option = {}) {
  const { currency = "USD", notation = "compact" } = option;

  const numericPrice = typeof price === "string" ? parseInt(price) : price;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}
