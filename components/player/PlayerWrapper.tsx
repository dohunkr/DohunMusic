"use client";

import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import { useAudio } from "react-use";
import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp, IoShuffle } from "react-icons/io5";
import { AiOutlinePause } from "react-icons/ai";
import { RiPlayFill } from "react-icons/ri";
import { RxLoop } from "react-icons/rx";
import { AiFillCaretUp } from "react-icons/ai";
import { IoVolumeHighOutline } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import usePlayerState from "@/hooks/usePlayerState";
import { PlayerSlider } from "@/components/ui/slider";

function PlayerContent() {
  const { activeSong, prevPlayerQueue, nextPlayerQueue, playBack, playNext } = usePlayerState();
  const [audio, state, controls, ref] = useAudio({
    src: activeSong?.src || "",
    autoPlay: true,
  });

  const isLoading = Boolean(activeSong?.src) && state?.buffered?.length === 0;

  const onClickNext = useCallback(() => {
    if (nextPlayerQueue.length === 0) {
      controls.pause();
    } else {
      playNext();
    }
  }, [controls, playNext, nextPlayerQueue]);

  useEffect(() => {
    const audioEl = ref?.current;
    if (!audioEl) return;
    audioEl.addEventListener("ended", onClickNext);
    return () => {
      audioEl.removeEventListener("ended", onClickNext);
    };
  }, [ref, onClickNext]);

  return (
    <div className="h-full w-full relative">
      <div className="absolute top-[-16px] w-full">
        <PlayerSlider
          className="w-full"
          defaultValue={[0]}
          value={[state.time]}
          onValueChange={(value) => controls.seek(value[0])}
          max={state.duration || 100}
        />
      </div>
      {audio}
      <section className="flex flex-row justify-between items-center w-full h-full px-2 lg:px-6">
        <div className="h-full flex flex-row items-center gap-1 lg:gap-8">
          <IoPlaySkipBackSharp
            size={24}
            className="cursor-pointer"
            onClick={() => {
              if (state.playing && state.time > 10) {
                controls.seek(0);
                return;
              }
              if (prevPlayerQueue.length > 0) playBack();
            }}
          />
          {isLoading ? (
            <ClipLoader color="#FFF" size={24} />
          ) : state.playing ? (
            <AiOutlinePause size={40} className="cursor-pointer" onClick={() => controls.pause()} />
          ) : (
            <RiPlayFill
              size={40}
              className="cursor-pointer"
              onClick={() => {
                if (activeSong) controls.play();
                else playNext();
              }}
            />
          )}
          <IoPlaySkipForwardSharp size={24} className="cursor-pointer" onClick={onClickNext} />
        </div>
        <article>
          <div className="flex flex-row gap-4 items-center">
            <div className="relative w-[40px] h-[40px]">
              {activeSong?.imageSrc && (
                <Image fill className="object-cover rounded" src={activeSong.imageSrc} alt="img" />
              )}
            </div>
            <div className="flex flex-col">
              <div>{activeSong?.name}</div>
              <div className="text-neutral-500 text-[14px]">
                {activeSong?.channel} • 조회수 7.8만회 • 좋아요 1.7천개
              </div>
            </div>
          </div>
        </article>
        <div className="flex flex-row gap-2 items-center">
          <div className="hidden lg:flex flex-row gap-2">
            <IoVolumeHighOutline size={24} className="cursor-pointer" />
            <IoShuffle size={24} className="cursor-pointer" />
            <RxLoop size={24} className="cursor-pointer" />
          </div>
          <div>
            <AiFillCaretUp size={24} className="cursor-pointer" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PlayerWrapper() {
  const { isVisiblePlayer } = usePlayerState();
  if (!isVisiblePlayer) return null;
  return (
    <div className="fixed bottom-0 h-[72px] w-full bg-neutral-900 z-50">
      <PlayerContent />
    </div>
  );
}
