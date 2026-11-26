import React from "react";
import PagePadding from "@/components/PagePadding";
import PlayListCarousel from "@/components/PlayListCarousel";
import SongListCarousel from "@/components/SongListCarousel";
import GenreListCarousel from "@/components/GenreListCarousel";
import { getAllPlaylist, getDummyGenreList, getSongListTop10 } from "@/lib/dummyData";

export default async function ExplorePage() {
  const [playlistArray, songListTop10] = await Promise.all([
    getAllPlaylist(),
    getSongListTop10(),
  ]);
  const genreList = getDummyGenreList();

  return (
    <PagePadding>
      <div className="mt-4" />
      <PlayListCarousel playlistArray={playlistArray} title="새 앨범 및 싱글" />
      <div className="mt-20" />
      <SongListCarousel songListTop10={songListTop10} title="인기곡" />
      <div className="mt-20" />
      <GenreListCarousel genreList={genreList} title="분위기 및 장르" />
      <div className="mt-20" />
    </PagePadding>
  );
}
