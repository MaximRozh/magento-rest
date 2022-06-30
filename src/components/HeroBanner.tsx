import React, { FC } from "react";
import Link from "next/link";
import style from "../styles/HeroBanner.module.scss";
import Image from "./Image";
import { getImage } from "../lib/Api";

interface HeroBannerProp {
  heroBanner: any;
}

const HeroBanner: FC<HeroBannerProp> = ({ heroBanner }) => {
  return (
    <div className={style["hero-banner-container"]}>
      <h1>Choose category you need</h1>
      <div className={style["hero-banner-content"]}>
        {heroBanner.items.map((item: any) => (
          <Link href={`/category/${item.id}`} key={item.id}>
            <div className={style["banner-categories-item"]}>
              <div className={style["categories-item-name"]}>{item.name}</div>
              <Image
                src={getImage(
                  item.custom_attributes.find(
                    (item) => item.attribute_code === "image"
                  )?.value || "",
                  false
                )}
                alt={item.name}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
