import { NextPage } from "next";
import React from "react";
import toast from "react-hot-toast";
import { Product } from "../components";
import { useAppDispatch } from "../hooks";
import { addProductToCart } from "../store/cart";
import style from "../styles/Category.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";

interface CategoryProp {
  data: any;
  categoryLinks: any;
}

const Category: NextPage<CategoryProp> = ({ data, categoryLinks }) => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { query } = router;

  const activeCategory = categoryLinks?.children_data.find(
    (cat: any) => cat.id == query.category
  ) || { name: "All" };

  const addToCart = (product) => {
    dispatch(addProductToCart(product));
    toast.success(`${product.name} added to the cart.`);
  };

  const catalogs = categoryLinks?.children_data.reduce(
    (acc, next) => {
      if (!acc.includes(next.name && next.is_active)) {
        acc.push({ name: next.name, id: next.id });
      }
      return acc;
    },
    [{ name: "All", id: 0 }]
  );

  return (
    <div className={style["category-container"]}>
      <ul className={style["side-category"]}>
        {catalogs?.map((item: any) => (
          <li
            key={item.name}
            aria-label={item.id}
            className={
              activeCategory?.name === item.name ? style["active"] : ""
            }
          >
            <Link
              href={`/category/${item?.name === "All" ? "" : item.id}`}
              key={item.name}
            >
              <a>{item.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <div className={style["product-container"]}>
        {data?.items ? (
          data?.items.map((item) => (
            <div className={style["card-wrapper"]} key={item.id}>
              <Product product={item} />
              <button
                className={style["button"]}
                onClick={() => addToCart(item)}
              >
                add to cart
              </button>
            </div>
          ))
        ) : (
          <p> This category don't have products </p>
        )}
      </div>
    </div>
  );
};

export default Category;
