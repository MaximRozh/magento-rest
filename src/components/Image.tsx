import React, { FC } from "react";
import Img from "next/image";
import { client } from "../lib/client";
import { useNextSanityImage } from "next-sanity-image";
import { ImageInterface } from "../types/Product";

interface ImageProp {
  src: string;
  layout?: "intrinsic" | "fixed" | "fill" | "responsive" | "raw";
  className?: string;
  alt: string;
  width?: number;
  height?: number;
}

const Image: FC<ImageProp> = ({
  src,
  layout = "intrinsic",
  className = "",
  alt,
  width = 600,
  height = 600,
}) => {
  return (
    <Img
      src={src}
      layout={layout}
      className={className}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

export default Image;
