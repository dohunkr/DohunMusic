import React from "react";
import Header from "@/components/Header";

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full">
      <Header>{children}</Header>
    </div>
  );
}
