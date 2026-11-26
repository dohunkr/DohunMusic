"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function UserIcon({ size = "sm" }: { size?: "sm" | "lg" }) {
  return (
    <Avatar className={cn(size === "lg" && "w-[56px] h-[56px]")}>
      <AvatarImage src="/img/profile.png" alt="프로필" />
      <AvatarFallback>도헌</AvatarFallback>
    </Avatar>
  );
}
