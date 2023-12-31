/* eslint-disable @next/next/no-img-element */
interface PosterMovies {
  vote_average: number;
  original_title: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  id: number;
}
import { options } from "@/core/constants";
import { Divider } from "antd";
import CarouselMovie from "../Component/carouselMovie";
import OverlayFadeRenderItem from "../Component/OverlayFadePosterItems/overlayFadeitems";
import NowPlayingMovies from "./NowPlayingMovies/nowPlayingMovies";
import styles from "./styles.module.css";

async function getPopularMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular`,
    options
  );
  return res.json();
}

async function getTopRatedMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated`,
    options
  );
  return res.json();
}

async function getUpComingMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming`,
    options
  );
  return res.json();
}

async function getTrendingMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day`,
    options
  );
  return res.json();
}

async function getNewsMovies() {
  const res = await fetch(`https://api.themoviedb.org/3/movie/latest`, options);
  return res.json();
}

export default async function Page() {
  const popularMoviesData = getPopularMovies();
  const topRatedMoviesData = getTopRatedMovies();
  const upComingMoviesData = getUpComingMovies();
  const trendingMovieData = getTrendingMovies();
  const newsMovieData = getNewsMovies();

  // Wait for the promises to resolve
  const [popularMovies, topRatedMovies, upComingMovies, trendingMovies] =
    await Promise.all([
      popularMoviesData,
      topRatedMoviesData,
      upComingMoviesData,
      trendingMovieData,
      newsMovieData,
    ]);
  const firstFourtopRatedMovies = topRatedMovies?.results?.slice(0, 4);
  const firstFourupComingMovies = upComingMovies?.results?.slice(0, 4);
  const firstThreeTrendingMoviesMovies = trendingMovies?.results?.slice(0, 3);
  const renderPosterMovies = (item: PosterMovies) => {
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

  const renderSuggestAdminChoiceList = (item: PosterMovies) => {
    return (
      <OverlayFadeRenderItem
        id={item?.id}
        name={item?.original_title}
        image={item?.poster_path}
        type={"suggestAdmin"}
      />
    );
  };

  const suggestUserChoiceList = () => {
    return (
      <div className="">
        <div className="grid place-content-center gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ">
          <div
            className={`${styles.container} ${"bg-[#c31312]"} hover:scale-105`}
          >
            <div className={`${styles.text} line-clamp-6 grid grid-cols-1`}>
              <div className=" text-xs	"> UPCOMING </div>
              <>
                <Divider className="bg-[white]" />
                <div className="font-bold text-xs	">
                  Movies will be shown soon
                </div>
              </>
            </div>
          </div>
          {firstFourupComingMovies?.map(renderPosterMovies)}
        </div>
        <div className="grid place-content-center mt-[3%] gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ">
          <div
            className={`${styles.container} ${"bg-[#c31312]"} hover:scale-105`}
          >
            <div className={`${styles.text} line-clamp-6 grid grid-cols-1`}>
              <div className=" text-xs	">TOP RATED</div>
              <>
                <Divider className="bg-[white]" />
                <div className="font-bold text-xs	">Top rated movie </div>
              </>
            </div>
          </div>
          {firstFourtopRatedMovies?.map(renderPosterMovies)}
        </div>
      </div>
    );
  };

  const suggestAdminChoiceList = () => {
    return (
      <div className="grid xl:grid-cols-10 mt-[3%] gap-4 ">
        <div className="col-span-3 h-[80%] bg-[#c31312]">
          <div className="text-2xl relative text-white left-[20%] top-[5%]">
            Today staff pick
          </div>
          <img
            alt=""
            src={"https://i.ebayimg.com/images/g/ujkAAOSwYEhjyt9a/s-l1600.jpg"}
            className={"h-[70%] relative left-[20%] shadow-2xl top-[10%]"}
          />
        </div>
        <div className="col-span-7 h-[80%] bg-[#c31312]">
          <div className="text-2xl relative text-white left-[7.5%] top-[5%]">
            Trending Movies
          </div>
          <div className="grid place-content-center relative mt-[5%] left-[8%] gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">
            {firstThreeTrendingMoviesMovies?.map(renderSuggestAdminChoiceList)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <CarouselMovie dataPopularMovies={popularMovies} />
      <div className="md:mx-24">
        {suggestUserChoiceList()}
        {suggestAdminChoiceList()}
        <NowPlayingMovies />
      </div>
    </div>
  );
}
