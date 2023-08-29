"use client";
import GenresMovies from "@/app/Component/GenresMovies/genresMovies";
/* eslint-disable @next/next/no-img-element */
import { options, originalPathPoster } from "@/core/constants";
import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";
interface MovieDetailType {
  runtime: number;
  genres: {
    id: number;
    name: string;
  };
  overview: string;
  vote_average: number;
  backdrop_path: string;
}

export default function Page({ params }: { params: { movieId: number } }) {
  const [videoMovies, setVideoMovies] = useState([]);
  const [movieDetail, setMovieDetail] = useState<MovieDetailType>();
  const [credits, setCredits] = useState<any>();

  const [straighten, setStraighten] = useState(false);
  const dayjs = require("dayjs");

  const hours = Math.floor(movieDetail?.runtime! / 60);
  const minutes = movieDetail?.runtime! % 60;
  const formattedTime = dayjs()
    .hour(hours)
    .minute(minutes)
    .format("h[h] mm[m]");

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

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${params?.movieId}`, options)
      .then((res) => res.json())
      .then((data) => {
        setMovieDetail(data);
      });
  }, [params?.movieId]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${params?.movieId}/credits`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setCredits(data);
      });
  }, [params?.movieId]);

  const getRandomNumber = () => {
    var numbers = [7, 14, 9, 8];
    var randomIndex = Math.floor(Math.random() * numbers.length);
    return numbers[randomIndex];
  };

  useEffect(() => {
    getRandomNumber();
  }, []);

  const sliceVideoMovies = videoMovies.slice(0, 8);
  const sliceCredits = credits?.cast.slice(0, 8);

  const translateItemTrailer = (index: number) => {
    if (index === 0) {
      return;
    }
    if (index === 1) {
      return !straighten ? "translate-y-0" : `translate-y-7`;
    }
    if (index === 2) {
      return !straighten ? "translate-y-0" : `translate-y-${getRandomNumber()}`;
    }
    if (index === 3) {
      return !straighten ? "translate-y-0" : `translate-y-${getRandomNumber()}`;
    }
    if (index === 4) {
      return;
    }
    if (index === 5) {
      return !straighten ? "translate-y-0" : `translate-y-${getRandomNumber()}`;
    }
    if (index === 6) {
      return !straighten ? "translate-y-0" : `translate-y-${getRandomNumber()}`;
    }
    if (index === 7) {
      return;
    }
  };

  const translateItemCredits = (index: number) => {
    if (index === 0) {
      return;
    }
    if (index === 1) {
      return !straighten
        ? "translate-y-0"
        : `translate-y-${getRandomNumber()} translate-x-${getRandomNumber()}`;
    }
    if (index === 2) {
      return !straighten
        ? "translate-y-0"
        : `translate-y-${getRandomNumber()} translate-x-${getRandomNumber()}`;
    }
    if (index === 3) {
      return !straighten
        ? "translate-y-0"
        : `translate-y-${getRandomNumber()} translate-x-${getRandomNumber()}`;
    }
    if (index === 4) {
      return;
    }
    if (index === 5) {
      return !straighten
        ? "translate-y-0"
        : `translate-y-${getRandomNumber()} translate-x-${getRandomNumber()}`;
    }
    if (index === 6) {
      return !straighten
        ? "translate-y-0"
        : `translate-y-${getRandomNumber()} translate-x-${getRandomNumber()}`;
    }
    if (index === 7) {
      return;
    }
  };

  const resolutionItemCredit = useCallback((index: number) => {
    if (index === 0) {
      return "w-[80px] h-[120px]";
    }
    if (index === 1) {
      return "w-[140px] h-[180px]";
    }
    if (index === 2) {
      return "w-[80px] h-[120px]";
    }
    if (index === 3) {
      return "w-[120px] h-[150px]";
    }
    if (index === 4) {
      return "w-[80px] h-[120px]";
    }
    if (index === 5) {
      return "w-[80px] h-[120px]";
    }
    if (index === 6) {
      return "w-[120px] h-[150px]";
    }
    if (index === 7) {
      return "w-[80px] h-[120px]";
    }
  }, []);

  const renderVideosTrailer = (item: any, index: number) => {
    return (
      <div
        className={`${styles.container} hover:scale-125 transition delay-300 duration-300 ease-in-out`}
      >
        <div className="video-responsive object-cover w-[150px] h-[400px]">
          <iframe
            onLoad={() => {
              setStraighten(true);
            }}
            onMouseEnter={() => {
              setStraighten(false);
            }}
            onMouseLeave={() => {
              setStraighten(true);
            }}
            src={`https://www.youtube.com/embed/${item?.key}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
            className={`relative w-full h-full flex ${translateItemTrailer(
              index
            )} transition delay-700 duration-1000`}
          />
        </div>
      </div>
    );
  };

  const renderCredits = (item: any, index: number) => {
    return (
      <div
        className={`${styles.container} transition delay-300 duration-300 ease-in-out`}
      >
        <div
          className={`video-responsive object-cover ${resolutionItemCredit(
            index
          )}`}
        >
          <img
            alt=""
            className={`relative w-full h-full flex hover:scale-125 ${translateItemCredits(
              index
            )} transition delay-700 duration-1000`}
            src={originalPathPoster + item?.profile_path!}
          />
          <div className="text-white absolute left-[15%]">{item?.name}</div>
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

  const detailMovie = () => {
    return (
      <div className="text-white mt-[5%] mx-24 flex">
        <div className="mr-[20%]">
          <div className="flex text-xs">
            <div className="w-[50%]">{formattedTime}</div>
            <div className="ml-3 flex">
              {movieDetail?.vote_average.toFixed(1)}
              <img
                alt=""
                src={"https://cdn-icons-png.flaticon.com/512/5977/5977585.png"}
                className="w-[5%] ml-1"
              />
            </div>
          </div>
          <div className="my-5">
            <GenresMovies genreIdsDetailMovie={movieDetail?.genres!} />
          </div>
          <div>{movieDetail?.overview}</div>
        </div>
        <div className="mt-[10%] w-[1000px]">
          <img alt="" src={originalPathPoster + movieDetail?.backdrop_path!} />
        </div>
      </div>
    );
  };

  const credit = () => {
    return (
      <div>
        <div className="text-2xl flex justify-center text-white">Cast</div>
        <div className="grid place-content-center relative mt-[5%] sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-8 ">
          {sliceCredits?.map(renderCredits)}
        </div>
      </div>
    );
  };

  return (
    <div>
      {videosTrailer()}
      {detailMovie()}
      {credit()}
    </div>
  );
}
