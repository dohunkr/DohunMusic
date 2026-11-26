import React from "react";
import PagePadding from "@/components/PagePadding";
import PlayListCarousel from "@/components/PlayListCarousel";
import UserIcon from "@/components/UserIcon";
import { dummyPlaylistArray } from "@/lib/dummyData";
import Category from "./components/Category";

export default function HomePage() {
  const dummyPlaylistArray1 = [...dummyPlaylistArray];

  return (
    <PagePadding>
      <div className="min-h-[600px]">
        <div className="mt-9" />
        <Category />
        <div className="mt-12" />
        <PlayListCarousel
          playlistArray={dummyPlaylistArray1}
          Thumbnail={
            <div className="w-[56px] h-[56px]">
              <UserIcon size="lg" />
            </div>
          }
          title="다시 듣기"
        />
      </div>
    </PagePadding>
  );
}
