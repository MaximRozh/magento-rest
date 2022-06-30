import React, { FC, useMemo } from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from ".";
import style from "../styles/NavBar.module.scss";
import { useAppDispatch, useAppSelector } from "../hooks";
import { openCart } from "../store/cart";
import { ProductInterface } from "../types/Product";
import Search from "./Search";

const Navbar: FC = () => {
  const { showCart, cartItems } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();
  const openSideCart = () => {
    dispatch(openCart());
  };

  const totalInCart = useMemo(
    () =>
      cartItems.reduce(
        (acc: number, next: ProductInterface) => acc + next.quantity,
        0
      ),
    [cartItems]
  );

  return (
    <div className={style["navbar-container"]}>
      <h3 className={style["logo"]}>
        <Link href="/">
          <a>Logo</a>
        </Link>
      </h3>
      <Search />
      <h4>
        <Link href="/category">
          <a>Category</a>
        </Link>
      </h4>
      <button
        type="button"
        className={style["cart-icon"]}
        onClick={openSideCart}
      >
        <AiOutlineShopping />
        <span className={style["cart-item-qty"]}>{totalInCart}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
