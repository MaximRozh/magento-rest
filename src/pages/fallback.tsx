import React from "react";
import style from "../styles/Fallback.module.scss";
import { MdSignalWifiConnectedNoInternet0 } from "react-icons/md";

const fallback = () => {
  return (
    <div className={style["fallback-container"]}>
      <div className={style["fallback-wrapper"]}>
        <h1 className={style["text"]}>
          Sorry, web-page is unavailable. Check your internet connection and try
          again
          <MdSignalWifiConnectedNoInternet0 />
        </h1>
        <div className={style["pacman-container"]}>
          <div className={style["pacman"]}></div>
          <div className={style["path"]}></div>
          <div className={style["path"]}></div>
          <div className={style["path"]}></div>
          <div className={style["path"]}></div>
          <div className={style["path"]}></div>
          <div className={style["path"]}></div>
          <div className={style["path"]}></div>
          <div className={style["path"]}></div>
        </div>
      </div>
    </div>
  );
};

export default fallback;
