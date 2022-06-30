import request from "../lib/requestHelper";
import { GetServerSideProps } from "next";
import Category from "../components/Category";
import Api from "../lib/Api";

export default Category;

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await Api.getData(
    request
      .init()
      .call("products")
      .emptyCriteria()
      .getFields("items[price,name,id,media_gallery_entries]")
      .send()
  );
  const categoryLinks = await Api.getData(
    request.init().call("categories").getFields("children_data").send()
  );
  return {
    props: { data, categoryLinks },
  };
};
