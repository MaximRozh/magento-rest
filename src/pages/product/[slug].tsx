import React, { useState, useMemo } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Product, SanityImage } from "../../components";
import { client } from "../../lib/client";
import style from "../../styles/SingleProduct.module.scss";
import { default as FastMarquee } from "react-fast-marquee";
import { addProductToCart, openCart } from "../../store/cart";
import { useAppDispatch } from "../../hooks";
import toast from "react-hot-toast";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ProductInterface } from "../../types/Product";
import Api, { getImage } from "../../lib/Api";
import request from "../../lib/requestHelper";
import Image from "../../components/Image";
interface ProductDetailsProp {
  // product: ProductInterface;
  // products: ProductInterface[];
  product: any;
  products: any;
}

const ProductDetails: NextPage<ProductDetailsProp> = ({
  product,
  products,
}) => {
  const { custom_attributes, name, price, id, media_gallery_entries } =
    product.items[0];
  const dispatch = useAppDispatch();

  const [index, setIndex] = useState(0);

  const mayLikeProduct = useMemo(
    () => products.items.filter((item: any) => item.id !== id),
    [products, product]
  );

  const details =
    custom_attributes.find(
      (item) =>
        item.attribute_code === "short_description" ||
        item.attribute_code === "description"
    )?.value || null;

  const handleBuyNow = () => {
    dispatch(addProductToCart(product.items[0]));
    dispatch(openCart());
  };

  const addToCart = () => {
    dispatch(addProductToCart(product.items[0]));
    toast.success(`${name} added to the cart.`);
  };

  const handleChangeImageIndex = (i) => {
    if (i !== index) {
      setIndex(i);
    }
  };

  return (
    <>
      <div className={style["product-detail-container"]}>
        <div className={style["product-detail"]}>
          <div className={style["image-container"]}>
            <div className={style["product-detail-image"]}>
              <Image
                src={getImage(
                  media_gallery_entries[index]
                    ? media_gallery_entries[index].file
                    : media_gallery_entries[0].file
                )}
                className={style["single-product-image"]}
                alt={name}
              />
            </div>
          </div>
          <div className={style["small-images-container"]}>
            {media_gallery_entries?.map((item, i) => (
              <div
                className={
                  i === index
                    ? `${style["small-image"]} ${style["selected-image"]}`
                    : style["small-image"]
                }
                key={i}
                onMouseEnter={() => handleChangeImageIndex(i)}
              >
                <Image src={getImage(item?.file)} alt={name} />
              </div>
            ))}
          </div>
        </div>
        <div className={style["product-detail-desc"]}>
          <h1>{name}</h1>
          <div className={style["reviews"]}>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </div>
          <p>(20)</p>
          <h4>Details: </h4>
          <p>{details?.replace(/<\/?[a-zA-Z]+>/gi, "")}</p>
          <p className={style["price"]}>${price}</p>

          <div className={style["buttons"]}>
            <button
              type="button"
              className={style["add-to-cart"]}
              onClick={addToCart}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className={style["buy-now"]}
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className={style["maylike-products-wrapper"]}>
        <h2>You may also like</h2>
        <div className={style["marquee"]}>
          <FastMarquee
            gradient={false}
            className={`${style["maylike-products-container"]}`}
          >
            {mayLikeProduct.map((item) => (
              <Product key={item.id} product={item} />
            ))}
          </FastMarquee>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const query = `*[_type == "product"] {
  //       slug {
  //           current
  //       }
  //   }`;
  // const products = await client.fetch(query);
  // const paths = products.map((product) => ({
  //   params: {
  //     slug: product.slug.current,
  //   },
  // }));

  const products = await Api.getData(
    request
      .init()
      .call("products")
      .searchCriteria("price", "300", "gt", 0, 0)
      .pageSize(2)
      .getFields("items[price,name,id]")
      .send()
  );
  const paths = products.items.map((product) => ({
    params: {
      slug: product.id.toString(),
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

// export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
// const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
// const productsQuery = '*[_type == "product"]';

// const product = await client.fetch(query);
// const products = await client.fetch(productsQuery);
export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const product = await Api.getData(
    request
      .init()
      .call("products")
      .searchCriteria("entity_id", `${slug}`, "eq", 0, 0)
      .pageSize(2)
      .getFields("items[price,name,id,custom_attributes,media_gallery_entries]")
      .send()
  );
  const products = await Api.getData(
    request
      .init()
      .call("products")
      .searchCriteria("price", "300", "gt", 0, 0)
      .pageSize(2)
      .getFields("items[price,name,id,media_gallery_entries]")
      .send()
  );

  return {
    props: { product, products },
  };
};

export default ProductDetails;
