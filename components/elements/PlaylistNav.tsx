"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IoMdPlayCircle } from "react-icons/io";
import usePlayerState from "@/hooks/usePlayerState";
import { Playlist } from "@/types";

export default function PlaylistNav({ playlist }: { playlist: Playlist }) {
  const { addSongList } = usePlayerState();
  const { push } = useRouter();
  const { id, owner, playlistName, songList } = playlist;

  return (
    <li
      onClick={() => push(`/playlist?list=${id}`)}
      className="mx-3 px-4 py-2 min-h-[56px] flex flex-row justify-between items-center hover:bg-neutral-700 rounded-lg group cursor-pointer"
    >
      <div className="min-w-0 pr-2">
        <div className="text-[14px] leading-snug">{playlistName}</div>
        <div className="text-[12px] text-neutral-500">{owner}</div>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (songList.length > 0) addSongList(songList);
        }}
        className="hidden group-hover:block cursor-pointer shrink-0"
      >
        <IoMdPlayCircle size={30} />
      </div>
    </li>
  );
}
