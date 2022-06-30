import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const tokenId = process.env.NEXT_PUBLIC_SANITY_TOKEN;

export const client = sanityClient({
  projectId: "nhoz9xby",
  dataset: "production",
  apiVersion: "2022-04-10",
  useCdn: true,
  token: tokenId,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
