/* eslint-disable @next/next/no-img-element */
import { Button, Divider } from "antd";
import React from "react";
import { Space } from "antd";
import { StarOutlined } from "@ant-design/icons";

// import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import GenresMovies from "../GenresMovies/genresMovies";
import Link from "next/link";
import { originalPathPoster } from "@/core/constants";
interface Props {
  name: string;
  id: number;
  image?: string;
  time?: string;
  content?: string;
  index?: number;
  description?: string;
  genreIds?: number[];
  type?: string;
  voteAverage?: number;
}

const OverlayFadeRenderItem = ({
  name,
  genreIds,
  voteAverage,
  content,
  image,
  id,
  time,
  index,
  description,
  type,
}: Props) => {
  const checkOverLayColor = (type: string) => {
    if (type === "suggestAdmin") {
      return styles.overlayBlack;
    } else {
      return styles.overlayRed;
    }
  };
  return (
    <div className={`${styles.container}  hover:scale-105`}>
      <img alt="" src={originalPathPoster + image} className={styles.image} />
      <div className={checkOverLayColor(type!)}>
        <div className={`${styles.text} line-clamp-6 grid grid-cols-1`}>
          <div className="text-xs line-clamp-2">{name!}</div>
          <div className="flex justify-center">
            {voteAverage}
            {type !== "suggestAdmin" && (
              <img
                alt=""
                src={"https://cdn-icons-png.flaticon.com/512/5977/5977585.png"}
                className="w-[20%] ml-1"
              />
            )}
          </div>
          <Link prefetch={true} href={`movies/${id}`}>
            <Button className="text-white mt-3">Video</Button>
          </Link>
          {/* <div className="text-xs">{formatDate}</div> */}
        </div>
        <div className="absolute top-[55%] left-[17%] w-[220px]">
          <GenresMovies genreIds={genreIds} />
        </div>
      </div>
    </div>
  );
};
export default OverlayFadeRenderItem;
