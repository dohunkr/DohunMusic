import React from "react";
import PagePadding from "@/components/PagePadding";
import PlayListCard from "@/components/PlayListCard";
import { dummyPlaylistArray } from "@/lib/dummyData";

export default function LibraryPage() {
  return (
    <PagePadding>
      <div className="mt-9" />
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {dummyPlaylistArray.map((playlist) => (
          <PlayListCard key={playlist.id} playlist={playlist} />
        ))}
      </section>
    </PagePadding>
  );
}
