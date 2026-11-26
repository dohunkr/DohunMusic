"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { chunkArray } from "@/lib/utils";

function GenreCard({ genre }: { genre: string }) {
  return (
    <div className="flex flex-row h-[48px] w-full cursor-pointer bg-neutral-800 rounded-lg overflow-hidden">
      <div className="h-full w-2 rounded-l-lg bg-emerald-500" />
      <div className="px-4 flex justify-center items-center">{genre}</div>
    </div>
  );
}

export default function GenreListCarousel({
  title,
  subTitle,
  genreList,
}: {
  title: string;
  subTitle?: string;
  genreList: string[];
}) {
  const chunkedGenreList = chunkArray(genreList, 4);

  return (
    <div className="w-full">
      <Carousel>
        <div className="flex flex-row justify-between items-end my-2">
          <article className="flex flex-row gap-3">
            <div className="flex flex-col justify-center">
              {subTitle && <div className="text-neutral-500">{subTitle}</div>}
              <div className="text-[34px] font-bold leading-[34px]">{title}</div>
            </div>
          </article>
          <div className="relative left-[-45px]">
            <div className="absolute bottom-[20px] flex flex-row gap-2">
              <CarouselPrevious className="right-2" />
              <CarouselNext className="left-2" />
            </div>
          </div>
        </div>
        <CarouselContent className="mt-4">
          {chunkedGenreList?.map((list, idx) => (
            <CarouselItem key={idx} className="basis-1/3 lg:basis-1/4">
              <div className="flex flex-col gap-4">
                {list.map((genre) => (
                  <GenreCard key={genre} genre={genre} />
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
