import React, { FC } from "react";
import Product from "./Product";
import style from "../styles/Products.module.scss";

interface ProductsProp {
  products: any[];
}

const Porducts: FC<ProductsProp> = ({ products }) => {
  return (
    <>
      <div className={style["products-heading"]}>
        <h2>Best Selling Products</h2>
        <p>Speakers of many var</p>
      </div>
      <div className={style["products-container"]}>
        {products &&
          products.map((item) => <Product key={item.id} product={item} />)}
      </div>
    </>
  );
};

export default Porducts;
