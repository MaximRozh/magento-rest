import { GetStaticPaths } from "next";
import Api from "../../lib/Api";
import request from "../../lib/requestHelper";
import Category from "../../components/Category";

export default Category;

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await Api.getData(
    request.init().call("categories").getFields("children_data").send()
  );

  const paths = data.children_data.map((product) => ({
    params: {
      category: product.id.toString(),
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { category } }) => {
  const data = await Api.getData(
    request
      .init()
      .call("products")
      .searchCriteria("category_id", `${category}`, "eq", 0, 0)
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
