"use client";
import OverlayFadeRenderItem from "@/app/Component/OverlayFadePosterItems/overlayFadeitems";
import { options } from "@/core/constants";
import { Pagination, PaginationProps, Tabs, TabsProps } from "antd";
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
  const [current, setCurrent] = useState(3);

  const onChange: PaginationProps["onChange"] = (page) => {
    console.log(page);
    setCurrent(page);
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${current}`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setNowPlayingMovies(data.results);
      });
  }, [current]);
  console.log("data", nowPlayingMovies);
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
          {nowPlayingMovies?.map(renderImageNewsDetail)}
        </div>
      ),
    },
    // {
    //   key: "2",
    //   label: `Tab 2`,
    //   children: (
    //     <Link href="/timer" passHref>
    //       timer
    //     </Link>
    //   ),
    // },
    // {
    //   key: "3",
    //   label: `Tab 3`,
    //   children: (
    //     <Link href="/timer" passHref>
    //       timer
    //     </Link>
    //   ),
    // },
  ];
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} className="[&>.ant-tabs-tab]:" />
      <div className="flex bg-[#c21313] my-5 justify-center">
        <Pagination
          defaultCurrent={1}
          total={500}
          current={current}
          onChange={onChange}
          className="text-white"
        />
      </div>
    </>
  );
};

export default NowPlayingMovies;
