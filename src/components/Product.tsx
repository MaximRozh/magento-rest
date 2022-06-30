import React, { FC } from "react";
import Link from "next/link";
import style from "../styles/Products.module.scss";
import Image from "./Image";
import { getImage } from "../lib/Api";

interface ProductProp {
  product: any;
}

const Product: FC<ProductProp> = ({
  product: { media_gallery_entries, name, id, price },
}) => {
  return (
    <div>
      <Link href={`/product/${id}`}>
        <div className={style["product-card"]}>
          <div className={style["product-image"]}>
            <Image src={getImage(media_gallery_entries[0]?.file)} alt={name} />
          </div>
          <p className={style["product-name"]}>{name}</p>
          <p className={style["product-price"]}>${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
