import React from "react";
import Header from "@/components/Header";

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full">
      <Header>{children}</Header>
    </div>
  );
}
