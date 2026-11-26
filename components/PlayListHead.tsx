"use client";

import React from "react";
import Image from "next/image";
import { FiPlay, FiFolderPlus, FiMoreVertical } from "react-icons/fi";
import usePlayerState from "@/hooks/usePlayerState";
import { getRandomElementFromArray } from "@/lib/utils";
import { Playlist } from "@/types";
import IconButton from "./elements/IconButton";
import WhiteButton from "./elements/WhiteButton";
import DarkButton from "./elements/DarkButton";

export default function PlayListHead({ playlist }: { playlist: Playlist }) {
  const { playlistName, owner, coverImageSrc, songList = [] } = playlist ?? {};
  const coverSrc =
    coverImageSrc ||
    getRandomElementFromArray(songList)?.imageSrc ||
    "https://images.unsplash.com/photo-1707833558984-3293e794031c";
  const { addSongList } = usePlayerState();

  const onClickPlay = () => {
    if (songList.length > 0) addSongList(songList);
  };

  return (
    <section>
      <div className="flex gap-[50px] flex-row">
        <div className="relative h-[160px] w-[160px] lg:h-[240px] lg:w-[240px] shrink-0">
          <Image alt="songImg" fill src={coverSrc} className="object-cover rounded-md" />
        </div>
        <article className="flex flex-col justify-center">
          <div className="font-bold text-[28px]">{playlistName}</div>
          <div className="text-neutral-400 mt-4 text-[14px]">
            <div>{`앨범 • ${owner} • 2025`}</div>
            <div>{`${songList.length}곡`}</div>
          </div>
          <ul className="hidden lg:flex flex-row gap-4 mt-4">
            <WhiteButton className="w-[85px] text-[14px]" icon={<FiPlay />} label="재생" onClick={onClickPlay} />
            <DarkButton className="w-[135px] text-[14px]" icon={<FiFolderPlus />} label="보관함에 저장" />
            <IconButton icon={<FiMoreVertical size={24} />} />
          </ul>
        </article>
      </div>
      <ul className="flex flex-row gap-4 mt-4 lg:hidden">
        <WhiteButton className="w-[85px] text-[14px]" icon={<FiPlay />} label="재생" onClick={onClickPlay} />
        <DarkButton className="w-[135px] text-[14px]" icon={<FiFolderPlus />} label="보관함에 저장" />
        <IconButton icon={<FiMoreVertical size={24} />} />
      </ul>
    </section>
  );
}
