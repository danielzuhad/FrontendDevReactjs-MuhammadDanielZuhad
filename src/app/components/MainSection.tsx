"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { getAll } from "../api";
import Card from "./Card";
import { categoryFilter } from "@/handler/categoryFilter";

export default function MainSection() {
  const [datas, setDatas] = useState([]);
  const [visibleDatas, setVisibleDatas] = useState(8);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  console.log(datas);

  // Filer State
  const [open, setOpen] = useState<null | "Open Now">(null);
  const [prices, setPrices] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [filteredPrice, setFilteredPrice] = useState<string>("");
  const [filteredCategory, setFilteredCategory] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setButtonLoading(true);
        setisLoading(true);
        const { data } = await axios.request(getAll);

        // FIlter
        const filteredData = data.data.data
          .slice(0, visibleDatas)
          .filter((item: any) => {
            const matchPrice =
              !filteredPrice || item.priceTag === filteredPrice;
            const matchCategory =
              !filteredCategory ||
              item.establishmentTypeAndCuisineTags[1] === filteredCategory;
            const filterOpen = !open || item.status === null;
            return matchPrice && matchCategory && filterOpen;
          });
        setDatas(filteredData);

        // filter nulll price dan uniqe
        const priceArray = data.data.data
          .slice(0, visibleDatas)
          .map((item: any) => item.priceTag)
          .filter((price: string) => price !== null);
        const uniquePriceOptions: string[] = Array.from(new Set(priceArray));
        setPrices(uniquePriceOptions);

        // filter nulll category dan uniqe
        const categoryArray = data.data.data
          .slice(0, visibleDatas)
          .map((item: any) => item.establishmentTypeAndCuisineTags[1]);
        const uniqueCategoriesOptions: string[] = Array.from(
          new Set(categoryArray)
        );
        setCategories(uniqueCategoriesOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setButtonLoading(false);
        setisLoading(false);
      }
    };

    fetchData();
  }, [visibleDatas, filteredPrice, filteredCategory, open]);

  function loadMore() {
    setButtonLoading(true);
    setVisibleDatas((prev) => prev + 8);
    setButtonLoading(false);
  }

  function handleClearFilters() {
    setFilteredCategory("");
    setFilteredPrice("");
    setOpen(null);
  }

  return (
    <div className="flex flex-col items-center">
      <div>
        {/* Filter */}
        <div className="py-5 w-[100%] border-y-2 flex justify-center">
          <div className="flex sm:flex-col md:flex-row justify-between w-[80vw]">
            <div className=" flex sm:flex-col md:flex-row gap-4 w-[80%]">
              <h2 className="text-md flex items-center sm:">Filter By: </h2>
              {/* Open Status */}
              <button
                onClick={() => setOpen("Open Now")}
                className="flex items-center border-b-2"
              >
                {open ? (
                  <div className="border-2 border-black bg-black rounded-full m-2 p-2"></div>
                ) : (
                  <div className="border-2 border-black rounded-full m-2 p-2"></div>
                )}

                <span>Open Now</span>
              </button>

              {/* Price */}
              <select
                value={filteredPrice}
                onChange={(e) => setFilteredPrice(e.target.value)}
                className="px-2 border-b-2 bg-transparent rounded-sm"
              >
                <option value="" disabled>
                  Price
                </option>
                {prices?.map((option: string, index: number) => (
                  <option key={`${option}-${index}`} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {/* Categories */}
              <select
                value={filteredCategory}
                onChange={(e) => setFilteredCategory(e.target.value)}
                className="p-2 border-b-2 bg-transparent rounded-sm "
              >
                <option value="" disabled>
                  Category
                </option>
                {categories?.map((option: any, index: number) => (
                  <option key={`${option}-${index}`} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Button */}
            <button
              onClick={handleClearFilters}
              className="p-2 px-8 border-2 rounded-sm"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {isLoading === false && datas.length === 0 ? (
        <p>Restoran Tidak Ditemukan</p>
      ) : (
        <div className="flex flex-col items-center">
          {isLoading ? (
            <h2>Loading...</h2>
          ) : (
            <div className="flex flex-col">
              {/* Looping Data */}
              <div className="mt-5 flex flex-wrap gap-10 justify-center w-[80vw] m-[0 auto] my-5">
                {datas.map((data: any) => (
                  <Card
                    key={data.restaurantsId}
                    image={data.heroImgUrl}
                    title={data.name}
                    rating={data.averageRating}
                    category={data.establishmentTypeAndCuisineTags[1]}
                    price={data.priceTag}
                    status={data.currentOpenStatusText}
                    link={data.restaurantsId}
                  />
                ))}
              </div>
              {/* Button Load More */}
            </div>
          )}
          {datas.length >= 30 ? null : (
            <button
              onClick={() => loadMore()}
              className="border-[#002B56] border-2 max-w-1/2 text-[#002B56] mt-[2em] p-3 px-[15vw] mb-5"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
}
