export interface SlugInterface {
  current: string;
  _type: string;
}

type Asset = {
  _ref: string;
  _type: string;
};
export interface ImageInterface {
  asset: Asset;
  _key: string;
  _type?: string;
  crop?: any;
  hotspot?: any;
}

export interface BannerInterface {
  buttonText: string;
  desc: string;
  largeText1: string;
  midText: string;
  product: string;
  smallText: string;
  image: ImageInterface;
}
export interface ProductInterface {
  image: ImageInterface[];
  name: ImageInterface[];
  slug: SlugInterface;
  price: number;
  _id: number;
  details?: string;
  device?: string;
  quantity?: number;
}
