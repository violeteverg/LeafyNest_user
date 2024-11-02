export function checkQuantity(productQuantity, quantity) {
  if (productQuantity < quantity) {
    return `The product only has ${productQuantity} available.`;
  }
  return null;
}
