export function calculateDiscountedPrice(
  originalPrice: number,
  discountPercentage: number
) {
  if (originalPrice < 0 || discountPercentage < 0 || discountPercentage > 100) {
    throw new Error("Invalid price or discount percentage");
  }

  const discountedPrice = originalPrice * (1 - discountPercentage / 100);
  return discountedPrice.toFixed(2); // Returns price rounded to two decimal places
}
