import React, { FC } from "react";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import style from "../styles/Cart.module.scss";
import Image from "./Image";
import { getImage } from "../lib/Api";
interface CartItemProp {
  cartItem: any;
  handleChanhgeQuntity: (product: any, type: string) => void;
  handleRemoveItem: (id: number) => void;
}

const CartItem: FC<CartItemProp> = ({
  cartItem,
  handleChanhgeQuntity,
  handleRemoveItem,
}) => {
  const { id, price, quantity, name, media_gallery_entries } = cartItem;

  const totalItemPrice = price * quantity;

  return (
    <div className={style["product"]} key={id}>
      <div className={style["item-descriptions"]}>
        <div className={style["cart-product-image"]}>
          <Image src={getImage(media_gallery_entries[0]?.file)} alt={name} />
        </div>
        <div className={style["item-info"]}>
          <h5>{name}</h5>
          <h4>${totalItemPrice}</h4>
        </div>
      </div>

      <div className={style["item-actions"]}>
        <button
          type="button"
          className={style["remove-item"]}
          onClick={() => handleRemoveItem(id)}
        >
          <AiOutlineClose />
        </button>
        <div className={style["item-amount"]}>
          <span className={style["num"]}>Amount: {quantity}</span>
          <div>
            <button
              className={style["item-amount-button"]}
              onClick={() => handleChanhgeQuntity(cartItem, "dec")}
            >
              <AiOutlineMinus />
            </button>
            <button
              className={style["item-amount-button"]}
              onClick={() => handleChanhgeQuntity(cartItem, "inc")}
            >
              <AiOutlinePlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
