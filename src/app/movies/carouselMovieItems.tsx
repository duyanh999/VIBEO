/* eslint-disable @next/next/no-img-element */
import { Button, Divider } from "antd";
import Link from "next/link";
import React from "react";
// import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
interface Props {
  name: string;
  id?: string;
  image: string;
  index?: number;
  description: string;
  length: string;
}
const CarouselMovieItems = ({
  name,
  image,
  id,
  length,
  description,
}: Props) => {
  const originalPathPosster = "https://image.tmdb.org/t/p/original/";

  return (
    <div
      style={{
        backgroundImage: `url(${originalPathPosster + image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex justify-center backdrop-blur-2xl space-x-44 items-center">
        <div className="text-white space-y-1.5 w-[40%]">
          <div className="text-[50px] font-extrabold">{name}</div>
          <p className="text-xs">{description}</p>
          <div className="text-[50px] font-extralight flex">
            {length}
            <img
              alt=""
              src={"https://cdn-icons-png.flaticon.com/512/5977/5977585.png"}
              className="w-[10%] ml-3"
            />
          </div>
          <div className="flex">
            <Link rel="preload" href={`movies/${id}`}>
              <Button className="text-white mr-3 w-28">Watch Video</Button>
            </Link>
            <Button className="text-white w-28 text-center">Watch later</Button>
          </div>
        </div>
        <div className="shadow-2xl my-16">
          <img src={originalPathPosster + image} alt="Image" width={250} />
        </div>
      </div>
    </div>
  );
};
export default CarouselMovieItems;
