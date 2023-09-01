/** @jsxImportSource @emotion/react */
import axios from "axios";
import { useCallback, useReducer, useRef, useMemo, useEffect, useState } from "react";
import { reducerForSearchResult } from "Feature/Reducer/reducer";
import Link from "next/link";
import { useScroll } from "Hooks/useScroll";

import mainStyle from "Components/Home/Style/MainContainer.module.scss";
import { Spinner } from "Components/Global/LoadingSpinner";
import { NoItem } from "Components/Global/NoItemFound/NoItemFound";
import { getUserToken } from "GetuserToken";
import { CircularSpinner } from "Components/Global/CircularSpinner";

export function Content({ isMotionEnabled }) {
  const [data, dispatch] = useReducer(reducerForSearchResult, {
    searchResult: [],
    isLoading: undefined,
    isError: false,
    text: "",
  });

  const mainContainerRef = useRef();
  const [hasSearchQuery, setSearchQuery] = useState(false);
  const token = getUserToken();

  const throttledSearchHandler = useCallback((fn, timeout) => {
    let id = null;

    return (...args) => {
      clearTimeout(id);

      if (args[0]) {
        id = setTimeout(() => {
          fn(...args);
          id = null;
        }, timeout);
      }
    };
  }, []);

  const getSearchResult = async (textValue) => {
    try {
      const {
        data: { data: searchResult },
      } = await axios.get(`https://api.jikan.moe/v4/anime?q=${textValue}`);

      if (searchResult?.length === 0) {
        dispatch({ type: "error" });
        return;
      }

      dispatch({
        type: "success",
        searchResult: [...searchResult].slice(0, 4),
      });
    } catch (error) {
      dispatch({ type: "error" });
    }
  };

  const debounce = useMemo(
    () => throttledSearchHandler(getSearchResult, 1000),
    [throttledSearchHandler]
  );

  const searchHandler = (e) => {
    e.preventDefault();
    const textValue = e.target.value;

    if (textValue !== "") {
      dispatch({ type: "loading" });
      setSearchQuery(true);
    } else {
      dispatch({ type: "initial" });
      setSearchQuery(false);
    }
    debounce(textValue);
  };

  return (
    <>
      <div className={mainStyle["main-container"]} ref={mainContainerRef}>
        <h2 className={mainStyle["main-title-container"]}>
          <span className={mainStyle.title_1}>
            Best Place For Anime Lovers
            {/* <span className={mainStyle.title_2}>
              <span> l</span>
              <span>o</span>
              <span>v</span>
              <span>e</span>
              <span>r</span>
              <span>s</span>
            </span> */}
          </span>
        </h2>

        <p className={mainStyle["info1"]}>
          Find details about any anime or character of your choice.
        </p>
        <div className={mainStyle["wrapper"]}>
          <input
            type="text"
            name=""
            id={mainStyle["search"]}
            placeholder="Search e.g. naruto ,one piece"
            autoComplete="off"
            onChange={searchHandler}
          />
          <ion-icon name="search-outline"></ion-icon>

          <div
            className={`${mainStyle["search-result-container"]} ${
              !hasSearchQuery && mainStyle["search-result-container-toggle"]
            }`}
          >
            <CircularSpinner enabled={!!data.isLoading} />
            {data.isError && <NoItem textColor={"#dfdfdf"} />}
            {data?.searchResult.map((result) => {
              const {
                mal_id,
                title,
                images: {
                  jpg: { image_url },
                },
              } = result;

              return (
                <Link href={`anime/${mal_id}`} className={mainStyle["link"]} key={mal_id}>
                  <a>
                    <div className={mainStyle["search-result"]}>
                      <div className={mainStyle["img-container"]}>
                        <img src={image_url} alt="" />
                      </div>
                      <h5>{title}</h5>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
