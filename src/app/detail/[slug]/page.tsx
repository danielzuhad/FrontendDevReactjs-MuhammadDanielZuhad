"use client";

import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { Rate } from "antd";

import { getDetail } from "@/app/api";
import RatingCard from "@/app/components/RatingCard";
import Link from "next/link";

interface ApiResponse {
  location: {
    rating: number;
    description: string;
    photo: {
      images: {
        original: {
          url: string;
        };
      };
    };
  };
  overview: {
    name: string;
    tags: {
      reviewSnippetSections: {
        heading: string;
        reviewSnippets: {
          text: string;
        }[];
      }[];
    };
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.request(getDetail(params.slug));
        setData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };

    fetchData();
  }, [params.slug]);

  console.log(data);

  if (!data) return <p>Loading...</p>;

  return (
    <Suspense fallback={<div>Loading</div>}>
      <div className=" w-full">
        <div className="h-[50vh] flex sm:flex-col md:flex-row items-center ">
          <div className="lg:w-1/2 md:full sm:w-full h-full flex flex-col justify-center">
            {/* Home Button */}
            <Link
              className="p-2 border-2 border-black rounded-md  max-w-[5em] text-center hover:bg-black hover:text-white my-5"
              href="/"
            >
              Home
            </Link>
            {/* Tittle */}
            <h1 className="text-5xl font-semibold ml">{data?.overview.name}</h1>
            {/* Rating */}
            <Rate disabled allowHalf value={data?.location.rating} />
            {/* descripton */}
            <p className="overflow-auto">{data?.location.description}</p>
          </div>

          {/* Image */}
          <img
            className=" object-cover md:w-[50%] md:max-h-full sm:my-5 sm:h-full "
            src={data?.location.photo.images.original.url}
            alt=""
          />
        </div>

        {/* Review Section */}
        <div className="w-full max-h-full sm:mt-[25em] md:mt-10">
          {/* Rating */}
          <h2 className="text-4xl">Review</h2>

          {data?.overview.tags.reviewSnippetSections === null ? (
            <p className="text-center mt-10">No review Yet</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-5 pt-5">
              {data?.overview.tags.reviewSnippetSections?.flatMap((section) =>
                section.reviewSnippets.map((review) => (
                  <RatingCard key={review.text} review={review.text} />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
}
