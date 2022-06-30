import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";
import style from "../styles/Layout.module.scss";
import OfflineComponent from "./Offline";
interface LayoutProp {
  children: React.ReactNode;
}
const Layout: FC<LayoutProp> = ({ children }) => {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "ononline" in window &&
      "onoffline" in window
    ) {
      // setOnline(window.navigator.onLine);
      if (!window.ononline) {
        window.addEventListener("online", () => {
          setOnline(true);
          console.log("online");
        });
      }
      if (!window.onoffline) {
        window.addEventListener("offline", () => {
          setOnline(false);
          console.log("offline");
        });
      }
    }
  }, []);

  return (
    <div className={style["layout"]}>
      <Head>
        <title>Store</title>
      </Head>
      <header className={style["header"]}>
        <NavBar />
      </header>
      <main className={style["main-container"]}>
        {online ? children : <OfflineComponent />}
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
