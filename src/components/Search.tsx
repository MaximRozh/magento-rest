import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import style from "../styles/Search.module.scss";
import { BiSearchAlt2 } from "react-icons/bi";

const Search: FC = () => {
  const router = useRouter();
  // const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    router.prefetch("/search");
  }, [router]);

  const searchProducts = (q: string) => {
    router.push({
      pathname: `/search`,
      query: q ? { q } : {},
    });
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const input = e.currentTarget.previousSibling as HTMLInputElement;

    if (!input.value) return;
    searchProducts(input.value);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    if (e.key == "Enter" && value) {
      searchProducts(value);
    }
  };

  return (
    <div className={style["container"]}>
      <div className={style["webflow-style-input"]}>
        <input
          placeholder="Search for products..."
          defaultValue={router.query.q}
          onKeyUp={handleKeyUp}
        />
        <button type="button" aria-label="searc" onClick={handleClick}>
          {<BiSearchAlt2 />}
        </button>
      </div>
    </div>
  );
};

export default Search;
