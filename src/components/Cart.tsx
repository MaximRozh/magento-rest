import React, { FC, useMemo } from "react";

import { AiOutlineLeft, AiOutlineShopping } from "react-icons/ai";
import toast from "react-hot-toast";
import getStripe from "../lib/getStripe";
import style from "../styles/Cart.module.scss";
import { useAppDispatch, useAppSelector } from "../hooks";
import { closeCart, removeFromCart, updateCart } from "../store/cart";
import CartItem from "./CartItem";
import { ProductInterface } from "../types/Product";

const Cart: FC = () => {
  const { cartItems } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();
  const closeSideCart = () => {
    dispatch(closeCart());
  };

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc: number, next: ProductInterface) => {
      return acc + next.quantity * next.price;
    }, 0);
  }, [cartItems]);

  const handleCheckout = async () => {
    toast.loading("Redirecting...");
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    const data = await response.json();

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  const handleChanhgeQuntity = (product: any, type: string) => {
    if (type === "dec" && product.quantity === 1) return;

    const newQuantity =
      type === "inc" ? product.quantity + 1 : product.quantity - 1;

    const updated = cartItems.map((item: any) =>
      item.id === product.id ? { ...item, quantity: newQuantity } : item
    );

    dispatch(updateCart(updated));
  };
  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };
  return (
    <div className={style["cart-wrapper"]}>
      <div className={style["cart-container"]}>
        <button
          type="button"
          className={style["cart-heading"]}
          onClick={closeSideCart}
        >
          <AiOutlineLeft />
          <span className={style["heading"]}>Your Cart</span>
        </button>

        {cartItems.length < 1 && (
          <div className={style["empty-cart"]}>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <button
              type="button"
              onClick={() => dispatch(closeCart())}
              className={style["btn"]}
            >
              Continue Shopping
            </button>
          </div>
        )}

        <div className={style["product-container"]}>
          {cartItems.length >= 1 &&
            cartItems.map((item: any) => (
              <CartItem
                key={item.id}
                cartItem={item}
                handleChanhgeQuntity={handleChanhgeQuntity}
                handleRemoveItem={handleRemoveItem}
              />
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className={style["cart-bottom"]}>
            <div className={style["total"]}>
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className={style["btn-container"]}>
              <button
                type="button"
                className={style["btn"]}
                onClick={handleCheckout}
              >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
