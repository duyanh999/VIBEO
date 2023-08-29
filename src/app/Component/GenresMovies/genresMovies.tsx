"use client";

interface Item {
  id: number | undefined;
  name: string | undefined;
}

interface Props {
  genreIds?: number[];
  genreIdsDetailMovie?: any;
}

import { Tag } from "antd";
import { useEffect, useState } from "react";

const GenresMovies = ({ genreIds, genreIdsDetailMovie }: Props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=e9e9d8da18ae29fc430845952232787c"
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.genres);
      });
  }, []);

  if (genreIds) {
    return genreIds?.map((id: number) => {
      const item: any = data.find(
        (existingItem: Item) => existingItem.id === id
      );
      return (
        item && (
          <Tag className="text-white text-[8px] leading-[15px] bg-[#191919] w-[33%]">
            {item?.name}
          </Tag>
        )
      );
    });
  }
  if (genreIdsDetailMovie) {
    return genreIdsDetailMovie?.map((genreIdsDetailMovie: any) => {
      const item: any = data.find(
        (existingItem: Item) => existingItem.id === genreIdsDetailMovie.id
      );
      return (
        item && (
          <Tag className="text-white text-[8px] leading-[15px] bg-[#191919] w-[10%%]">
            {item?.name}
          </Tag>
        )
      );
    });
  }
};
export default GenresMovies;
