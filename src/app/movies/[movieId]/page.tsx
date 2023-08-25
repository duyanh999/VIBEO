"use client";
/* eslint-disable @next/next/no-img-element */
import { options } from "@/core/constants";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

// async function getVideoMovies(params: { movieId: number }) {
//   const res = await fetch(
//     `https://api.themoviedb.org/3/movie/${params?.movieId}/videos`,
//     options
//   );
//   return res.json();
// }

// async function getImageMovies(params: { movieId: number }) {
//   const res = await fetch(
//     `https://api.themoviedb.org/3/movie/${params?.movieId}/images`,
//     options
//   );
//   return res.json();
// }

export default function Page({ params }: { params: { movieId: number } }) {
  const [videoMovies, setVideoMovies] = useState([]);
  const [straighten, setStraighten] = useState(false);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${params?.movieId}/videos`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setVideoMovies(data.results);
      });
  }, [params?.movieId]);
  console.log("data", videoMovies);
  // const videoMoviesData = getVideoMovies(params);
  // const imageMoviesData = getImageMovies(params);
  // const [videoMovies, imageMovies] = await Promise.all([
  //   videoMoviesData,
  //   imageMoviesData,
  // ]);
  const sliceVideoMovies = videoMovies.slice(0, 8);
  // console.log("videoMoviesData", videoMoviesData);
  // console.log("imageMoviesData", imageMovies.backdrops);

  const translateItem = (index: number) => {
    if (index === 0) {
      return;
    }
    if (index === 1) {
      return !straighten ? "translate-y-0" : "translate-y-7";
    }
    if (index === 2) {
      return !straighten ? "translate-y-0" : "translate-y-14";
    }
    if (index === 3) {
      return !straighten ? "translate-y-0" : "-translate-y-7";
    }
    if (index === 4) {
      return;
    }
    if (index === 5) {
      return !straighten ? "translate-y-0" : "translate-y-14";
    }
    if (index === 6) {
      return !straighten ? "translate-y-0" : "translate-y-9";
    }
    if (index === 7) {
      return;
    }
  };

  const renderVideosTrailer = (item: any, index: number) => {
    return (
      <div
        className={`${styles.container}  hover:scale-125 transition delay-300 duration-300 ease-in-out`}
      >
        <div className="video-responsive object-cover w-[150px] h-[400px]">
          <iframe
            rel="preload"
            onLoad={() => {
              setStraighten(true);
            }}
            onMouseEnter={() => {
              setStraighten(false);
            }}
            onMouseLeave={() => {
              setStraighten(true);
            }}
            src={`${
              item?.key
                ? `https://www.youtube.com/embed/${item?.key}`
                : "https://www.youtube.com/watch?v=2HBIzEx6IZA"
            } `}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
            className={`relative w-full h-full flex ${translateItem(
              index
            )} transition delay-700 duration-1000`}
          />
        </div>
      </div>
    );
  };
  const videosTrailer = () => {
    return (
      <div className="grid place-content-center relative mt-[5%] sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-8 ">
        {sliceVideoMovies?.map(renderVideosTrailer)}
      </div>
    );
  };

  return <div>{videosTrailer()}</div>;
}
