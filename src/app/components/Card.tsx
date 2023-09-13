/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Rate } from "antd";
import Link from "next/link";

export interface DataProps {
  image?: string;
  title: string;
  rating: number;
  category: string;
  price: string;
  status: string;
  link: string;
}

export default function Card(props: DataProps) {
  return (
    <div className="w-[22em] max- max-h-[44vh] flex flex-col">
      {/* Imgae */}
      <img className="w-full h-[55%] object-cover" src={props.image} alt="" />

      <div className="text-sm h-1/2 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h2 className="text-[1.2em] py-2">{props.title}</h2>

          {/* Rating */}
          <Rate disabled allowHalf value={props.rating} />

          {/* Category, Price & Open Status */}
          <div className="flex text-sm py-2 justify-between w-full mt-3">
            <span>
              {props.category} {props.price}
            </span>
            <div className="flex items-center">
              {props.status === "Open Now" ? (
                <div className="bg-lime-500 rounded-full m-2 p-1"></div>
              ) : (
                <div className="bg-red-500 rounded-full m-2 p-1"></div>
              )}
              <span>{props.status}</span>
            </div>
          </div>
        </div>

        {/* Detail Button */}
        <Link
          href={`/detail/${props.link}`}
          className="bg-[#002B56] text-white p-2 w-full"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}
