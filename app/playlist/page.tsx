import React from "react";
import { permanentRedirect } from "next/navigation";
import HeaderBgChanger from "@/components/HeaderBgChanger";
import PagePadding from "@/components/PagePadding";
import PlayListHead from "@/components/PlayListHead";
import SongCardRowExpand from "@/components/SongCardRowExpand";
import { getPlaylistById } from "@/lib/dummyData";
import { getRandomElementFromArray } from "@/lib/utils";

export default async function PlaylistPage({
  searchParams,
}: {
  searchParams: { list?: string };
}) {
  const playlist = await getPlaylistById(Number(searchParams?.list));
  if (!playlist) permanentRedirect("/");

  const imageSrc =
    playlist.coverImageSrc ||
    getRandomElementFromArray(playlist.songList)?.imageSrc ||
    "https://images.unsplash.com/photo-1707833558984-3293e794031c";

  return (
    <PagePadding>
      <HeaderBgChanger imageSrc={imageSrc} />
      <div className="mt-12" />
      <PlayListHead playlist={playlist} />
      <div className="mt-12" />
      <section className="flex flex-col gap-2">
        {playlist.songList.length === 0 ? (
          <div className="text-neutral-400 py-8">
            아직 등록된 곡이 없습니다. `public/music/`에 음악 파일을 추가하고{" "}
            <code className="text-neutral-200">lib/dummyData.ts</code>에 곡을 등록해 주세요.
          </div>
        ) : (
          playlist.songList.map((song, idx) => (
            <SongCardRowExpand song={song} key={`${song.name}-${idx}`} />
          ))
        )}
      </section>
    </PagePadding>
  );
}
