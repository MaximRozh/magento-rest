import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { Product } from "../components";
import Api from "../lib/Api";
import style from "../styles/SearchPage.module.scss";
import request from "../lib/requestHelper";

interface SearchProp {
  query: string;
  data: any;
}

const Search: NextPage<SearchProp> = ({ query, data }) => {
  if (!data?.items?.length)
    return (
      <p>
        There are no products that match <b>"{query}"</b>
      </p>
    );
  return (
    <div className={style["conteiner"]}>
      {data.items.map((item) => (
        <Product key={item.id} product={item} />
      ))}
    </div>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { q } = context.query;
  const data =
    (await Api.getData(
      request
        .init()
        .call("products")
        .searchCriteria("name", `%25${q}%25&`, "like", 0, 0)
        .pageSize(5)
        .getFields("items[price,name,id]")
        .send()
    )) || null;
  return {
    props: { query: q, data },
  };
};
