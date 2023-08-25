/* eslint-disable @next/next/no-img-element */
"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import CarouselMovieItems from "../movies/carouselMovieItems";

const CarouselMovie = ({ dataPopularMovies }: any) => {
  const firstFourMoviesPopular = dataPopularMovies?.results;

  return (
    <div className="relative overflow-hidden mb-[3%]">
      <Splide
        options={{
          type: "loop",
          autoplay: true,
          pagination: false,
          arrows: true,
          drag: "free",
          perPage: 1,
          snap: true,
          rewind: true,
          gap: 10,
          omitEnd: true,
          classes: {
            pagination:
              "w-full flex items-center justify-center absolute bottom-10",
          },
        }}
        aria-label="React Splide Example"
      >
        {firstFourMoviesPopular.map((item: any, key: any) => (
          <SplideSlide key={key}>
            <CarouselMovieItems
              key={item?.id}
              id={item?.id}
              name={item.title}
              image={item.poster_path}
              length={item.vote_average}
              description={item.overview}
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};
export default CarouselMovie;
