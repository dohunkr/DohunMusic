"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiPlayCircle, FiThumbsDown, FiThumbsUp, FiMoreVertical } from "react-icons/fi";
import usePlayerState from "@/hooks/usePlayerState";
import { Song } from "@/types";
import IconButton from "./elements/IconButton";

export default function SongCardRowExpand({ song }: { song: Song }) {
  const { channel, channelId } = song;
  const { push } = useRouter();
  const { addSongList } = usePlayerState();

  return (
    <article className="flex flex-row items-center gap-4 min-h-[48px] py-1 w-full relative group">
      <div className="w-[48px] h-[48px] relative shrink-0">
        <Image src={song.imageSrc} alt={song.name} fill className="object-cover rounded" />
        <section
          onClick={() => addSongList([song])}
          className="hidden group-hover:flex absolute top-0 w-[48px] h-[48px] items-center justify-center bg-black/70 cursor-pointer rounded"
        >
          <FiPlayCircle size={20} />
        </section>
      </div>
      <div className="flex flex-row gap-4 justify-between items-center flex-1 min-w-0 pr-[128px]">
        <div className="flex-1 min-w-0 break-keep">{song.name}</div>
        <div
          onClick={() => push(`/channel/${channelId}`)}
          className="text-neutral-500 hover:underline cursor-pointer shrink-0"
        >
          {channel}
        </div>
      </div>
      <section className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 right-0 flex-row justify-end items-center h-[48px] w-[120px] bg-[rgba(0,0,0,0.7)] rounded">
        <IconButton icon={<FiThumbsDown size={20} />} />
        <IconButton icon={<FiThumbsUp size={20} />} />
        <IconButton icon={<FiMoreVertical size={20} />} />
      </section>
    </article>
  );
}
