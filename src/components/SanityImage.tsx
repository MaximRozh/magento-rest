import React, { FC } from "react";
import Img from "next/image";
import { client } from "../lib/client";
import { useNextSanityImage } from "next-sanity-image";
import { ImageInterface } from "../types/Product";

interface SanityImageProp {
  imageData: ImageInterface;
  layout?: "intrinsic" | "fixed" | "fill" | "responsive" | "raw";
  className?: string;
  alt: string;
}

const SanityImage: FC<SanityImageProp> = ({
  imageData,
  layout = "intrinsic",
  className = "",
  alt,
}) => {
  const imageProps = useNextSanityImage(client, imageData);

  return (
    <Img
      // @ts-ignore: Unreachable code error
      {...imageProps}
      layout={layout}
      className={className}
      alt={alt}
    />
  );
};

export default SanityImage;
