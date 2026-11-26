import React from "react";
import { permanentRedirect } from "next/navigation";
import HeaderBgChanger from "@/components/HeaderBgChanger";
import PagePadding from "@/components/PagePadding";
import PlayListCarousel from "@/components/PlayListCarousel";
import SongCardRowExpand from "@/components/SongCardRowExpand";
import { getChannelById } from "@/lib/dummyData";
import { getRandomElementFromArray } from "@/lib/utils";

export default async function ChannelPage({
  params,
}: {
  params: { id: string };
}) {
  const channel = await getChannelById(Number(params.id));
  if (!channel) permanentRedirect("/");

  const imageSrc = getRandomElementFromArray(channel.songList)?.imageSrc;

  return (
    <PagePadding>
      <HeaderBgChanger imageSrc={imageSrc} />
      <div className="mt-[150px]" />
      <div className="text-[28px] font-bold">{channel.name}</div>
      <section className="mt-[60px]">
        <div className="text-[28px] font-bold">노래</div>
        <div className="mt-[20px] flex flex-col gap-2">
          {channel.songList.map((song, idx) => (
            <SongCardRowExpand key={`${song.name}-${idx}`} song={song} />
          ))}
        </div>
      </section>
      <section className="mt-[80px]">
        <div className="text-[28px] font-bold">앨범</div>
        <PlayListCarousel playlistArray={channel.playlistArray} title="" />
      </section>
      <div className="mt-[100px]" />
    </PagePadding>
  );
}
