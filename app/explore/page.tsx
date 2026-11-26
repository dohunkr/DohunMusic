import React from "react";
import PagePadding from "@/components/PagePadding";
import PlayListCarousel from "@/components/PlayListCarousel";
import SongListCarousel from "@/components/SongListCarousel";
import { getAllPlaylist, getSongListTop10 } from "@/lib/dummyData";

export default async function ExplorePage() {
  const [playlistArray, songListTop10] = await Promise.all([
    getAllPlaylist(),
    getSongListTop10(),
  ]);

  return (
    <PagePadding>
      <div className="mt-4" />
      <PlayListCarousel playlistArray={playlistArray} title="새 앨범 및 싱글" />
      <div className="mt-20" />
      <SongListCarousel songListTop10={songListTop10} title="인기곡" />
      <div className="mt-20" />
    </PagePadding>
  );
}
