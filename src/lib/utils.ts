export const updatedCartItems = (cartItems: any, newItem: any) => {
  const isExist = cartItems.find((item) => item.id === newItem.id);
  if (isExist) {
    return cartItems.map((item) => {
      return item.id === newItem.id
        ? { ...item, quantity: item.quantity + 1 }
        : item;
    });
  } else {
    return [...cartItems, { ...newItem, quantity: 1 }];
  }
};
