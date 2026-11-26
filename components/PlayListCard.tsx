"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdMoreVert } from "react-icons/md";
import { FiPlay } from "react-icons/fi";
import usePlayerState from "@/hooks/usePlayerState";
import { getRandomElementFromArray } from "@/lib/utils";
import { Playlist } from "@/types";
import IconButton from "./elements/IconButton";

export default function PlayListCard({ playlist }: { playlist: Playlist }) {
  const { addSongList } = usePlayerState();
  const { push } = useRouter();
  const { id, owner = "", playlistName = "", coverImageSrc, songList = [] } = playlist ?? {};
  const songListLen = songList?.length ?? 0;
  const imgSrc =
    coverImageSrc ||
    getRandomElementFromArray(songList)?.imageSrc ||
    "https://images.unsplash.com/photo-1707833558984-3293e794031c";

  return (
    <article className="h-[240px] cursor-pointer group">
      <section
        onClick={() => {
          if (id) push(`/playlist?list=${id}`);
        }}
        className="relative h-[136px]"
      >
        <Image src={imgSrc} fill alt="thumbnail" className="object-cover rounded-md" />
        <div className="hidden relative group-hover:block bg-gradient-to-b from-[rgba(0,0,0,0.7)] top-0 w-full h-[136px] rounded-md">
          <div className="absolute top-2 right-4">
            <IconButton icon={<MdMoreVert size={20} />} />
          </div>
          {songListLen > 0 && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                addSongList(songList);
              }}
              className="absolute bottom-4 right-4 flex items-center justify-center transform-gpu transition-transform hover:scale-110 bg-[rgba(0,0,0,0.7)] w-[45px] h-[45px] rounded-full hover:bg-[rgba(0,0,0,0.9)] pl-[1.5px]"
            >
              <FiPlay size={22} color="red" />
            </div>
          )}
        </div>
      </section>
      <section className="mt-2">
        <div className="font-medium">{playlistName}</div>
        <div className="text-neutral-500 text-sm">
          {owner} - 트랙 {songListLen}개
        </div>
      </section>
    </article>
  );
}
