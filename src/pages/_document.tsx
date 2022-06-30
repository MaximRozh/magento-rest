import React from "react";
import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.json"></link>
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#fff"></meta>
          <meta name="description" content="some e-commerce"></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
