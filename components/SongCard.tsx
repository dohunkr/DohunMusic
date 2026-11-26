"use client";

import React from "react";
import Image from "next/image";
import { FaRegCircle } from "react-icons/fa";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { FiPlayCircle, FiThumbsDown, FiThumbsUp, FiMoreVertical } from "react-icons/fi";
import usePlayerState from "@/hooks/usePlayerState";
import { TopSong } from "@/types";
import IconButton from "./elements/IconButton";

export default function SongCard({ song }: { song: TopSong }) {
  const { addSongList } = usePlayerState();
  return (
    <article className="flex flex-row items-center gap-4 h-[48px] w-full relative group">
      <div className="w-[48px] h-[48px] relative shrink-0">
        <Image src={song.imageSrc} alt={song.name} fill className="object-cover rounded" />
        <section
          onClick={() => addSongList([song])}
          className="hidden group-hover:flex absolute top-0 w-[48px] h-[48px] items-center justify-center bg-black/70 cursor-pointer rounded"
        >
          <FiPlayCircle size={20} />
        </section>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div>
          {song.rank === song.prevRank ? (
            <FaRegCircle size={10} />
          ) : song.rank > song.prevRank ? (
            <AiOutlineCaretUp size={10} color="#3CA63F" />
          ) : (
            <AiOutlineCaretDown size={10} color="#FF0000" />
          )}
        </div>
        <div>{song.rank + 1}</div>
      </div>
      <div className="min-w-0 flex-1 pr-[120px]">
        <div className="truncate">{song.name}</div>
      </div>
      <section className="hidden group-hover:flex absolute top-0 right-0 flex-row justify-end items-center h-[48px] w-[120px] bg-[rgba(0,0,0,0.7)]">
        <IconButton icon={<FiThumbsDown size={20} />} />
        <IconButton icon={<FiThumbsUp size={20} />} />
        <IconButton icon={<FiMoreVertical size={20} />} />
      </section>
    </article>
  );
}
