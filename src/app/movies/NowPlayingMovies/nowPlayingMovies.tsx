"use client";
import OverlayFadeRenderItem from "@/app/Component/OverlayFadePosterItems/overlayFadeitems";
import { options } from "@/core/constants";
import { Pagination, PaginationProps, Tabs, TabsProps, Input } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NowPlayingMovies {
  vote_average: number;
  original_title: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  id: number;
}

const NowPlayingMovies = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [pageState, setPageState] = useState(1);
  const [dataSearch, setDataSearch] = useState([]);
  const [onSearchState, setOnSearchState] = useState("");

  const onChange: PaginationProps["onChange"] = (page) => {
    setPageState(page);
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageState}`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setNowPlayingMovies(data.results);
      });
  }, [pageState]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${onSearchState}&include_adult=false&language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setDataSearch(data.results);
      });
  }, [onSearchState, pageState]);

  const { Search } = Input;
  const onSearch = (value: string) => {
    setOnSearchState(value);
  };

  const horrorMovies = nowPlayingMovies.filter((item: any) =>
    item.genre_ids.find((item: any) => item === 27)
  );
  const actionMovies = nowPlayingMovies.filter((item: any) =>
    item.genre_ids.find((item: any) => item === 28)
  );
  const animationMovies = nowPlayingMovies.filter((item: any) =>
    item.genre_ids.find((item: any) => item === 16)
  );

  const renderImageNewsDetail = (item: NowPlayingMovies) => {
    return (
      <OverlayFadeRenderItem
        id={item?.id}
        name={item?.original_title}
        image={item?.poster_path}
        genreIds={item?.genre_ids}
        voteAverage={item?.vote_average}
      />
    );
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `ALL MOVIES`,
      children: (
        <div className="grid place-content-center mt-[3%] gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ">
          {dataSearch.length !== 0
            ? dataSearch?.map(renderImageNewsDetail)
            : nowPlayingMovies?.map(renderImageNewsDetail)}
        </div>
      ),
    },
    {
      key: "2",
      label: `HORROR`,
      children: (
        <div className="grid place-content-center mt-[3%] gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ">
          {dataSearch.length !== 0
            ? dataSearch?.map(renderImageNewsDetail)
            : horrorMovies?.map(renderImageNewsDetail)}
        </div>
      ),
    },
    {
      key: "3",
      label: `ACTION`,
      children: (
        <div className="grid place-content-center mt-[3%] gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ">
          {dataSearch.length !== 0
            ? dataSearch?.map(renderImageNewsDetail)
            : actionMovies?.map(renderImageNewsDetail)}
        </div>
      ),
    },
    {
      key: "4",
      label: `ANIMATION`,
      children: (
        <div className="grid place-content-center mt-[3%] gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ">
          {dataSearch.length !== 0
            ? dataSearch?.map(renderImageNewsDetail)
            : animationMovies?.map(renderImageNewsDetail)}
        </div>
      ),
    },
  ];

  return (
    <>
      <Search
        placeholder="Search Movie Here"
        onSearch={onSearch}
        style={{ width: 200, backgroundColor: "#c21313", borderRadius: "6px" }}
      />
      <Tabs
        defaultActiveKey="1"
        items={items}
        onTabClick={() => {
          setOnSearchState("");
        }}
        className="[&>.ant-tabs-tab]:"
      />
      <div className="flex bg-[#c21313] my-5 justify-center">
        {dataSearch.length === 0 && (
          <Pagination
            defaultCurrent={pageState}
            total={500}
            current={pageState}
            onChange={onChange}
            className="text-white"
          />
        )}
      </div>
    </>
  );
};

export default NowPlayingMovies;
