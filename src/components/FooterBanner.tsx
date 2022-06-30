import React, { FC } from "react";
import Link from "next/link";
import SanityImage from "./SanityImage";
import style from "../styles/FooterBanner.module.scss";
import { BannerInterface } from "../types/Product";

interface FooterBannerProp {
  footerBanner: BannerInterface;
}

const FooterBanner: FC<FooterBannerProp> = ({ footerBanner }) => {
  if (!footerBanner) return;
  const { largeText1, smallText, midText, desc, product, buttonText, image } =
    footerBanner;
  return (
    <div className={style["footer-banner-container"]}>
      <div className={style["banner-desc"]}>
        <div className={style["left"]}>
          {/* <p>{discount}</p> */}
          <h3>{largeText1}</h3>
          {/* <h3>{largeText2}</h3> */}
          {/* <p>{saleTime}</p> */}
        </div>
        <div className={style["footer-banner-image"]}>
          <SanityImage imageData={image} alt="footer-banner-image" />
        </div>
        <div className={style["right"]}>
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;
