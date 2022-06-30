import React, { FC } from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import style from "../styles/Footer.module.scss";

const Footer: FC = () => {
  return (
    <div className={style["footer-container"]}>
      <p>{new Date().getFullYear()} Headphones All rights reserverd</p>
      <p className={style["icons"]}>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  );
};

export default Footer;
