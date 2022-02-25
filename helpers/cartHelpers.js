export const checkItemStock = (cartItems, product) => {
  const existItem = cartItems.find((e) => e._id === product._id);
  return existItem ? existItem.quantity + 1 : 1;
};

export const calculateTotalCartPrice = (cartItems) => {
  const round = (num) => Math.round((num + Number.EPSILON) * 100) / 100;
  const itemsPrice = round(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const totalPrice = round(itemsPrice + shippingPrice);

  return {
    itemsPrice,
    shippingPrice,
    totalPrice,
  };
};
