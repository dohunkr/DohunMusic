"use client";

import React, { useEffect } from "react";
import useUIState from "@/hooks/useUIState";

export default function HeaderBgChanger({ imageSrc }: { imageSrc?: string }) {
  const { setHeaderImageSrc } = useUIState();
  useEffect(() => {
    if (imageSrc) setHeaderImageSrc(imageSrc);
  }, [imageSrc, setHeaderImageSrc]);

  return <></>;
}
