export const checkItemStock = (cartItems, product) => {
  const existItem = cartItems.find((e) => e._id === product._id);
  return existItem ? existItem.quantity + 1 : 1;
};
