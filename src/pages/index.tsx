import type { GetServerSideProps } from "next";
import React, { FC } from "react";
import { HeroBanner, Porducts } from "../components";
import { BannerInterface, ProductInterface } from "../types/Product";
import Api from "../lib/Api";
import request from "../lib/requestHelper";

interface HomeProps {
  data: any;
  category: any;
}

const IndexPage: FC<HomeProps> = ({ data, category }) => {
  return (
    <>
      <HeroBanner heroBanner={category} />
      <Porducts products={data?.items} />
      {/* <FooterBanner footerBanner={bannerData} /> */}
    </>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const category = await Api.getData(
      request
        .init()
        .call("categories/list")
        .searchCriteria("parent_id", "2", "eq", 0, 0)
        .getFields("items[name,id,custom_attributes]")
        .send()
    );

    const data =
      (await Api.getData(
        request
          .init()
          .call("products")
          .searchCriteria("price", "300", "gt", 0, 0)
          .pageSize(4)
          .getFields("items[price,name,id,media_gallery_entries]")
          .send()
      )) || null;
    return {
      props: { data, category },
    };
  } catch (e) {}
};
