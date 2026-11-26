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
import { TopSong } from "@/types";
import SongCard from "./SongCard";

export default function SongListCarousel({
  title,
  subTitle,
  songListTop10,
}: {
  title: string;
  subTitle?: string;
  songListTop10: TopSong[];
}) {
  const chunkedTop10 = chunkArray(songListTop10, 4);

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
          {chunkedTop10?.map((songList, idx) => (
            <CarouselItem key={idx} className="lg:basis-1/2">
              <div className="flex flex-col gap-4">
                {songList.map((song, sIdx) => (
                  <SongCard key={sIdx} song={song} />
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
