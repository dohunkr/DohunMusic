"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useAudio } from "react-use";
import {
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoShuffle,
  IoVolumeHighOutline,
  IoVolumeMuteOutline,
} from "react-icons/io5";
import { AiOutlinePause } from "react-icons/ai";
import { RiPlayFill, RiReplay10Line, RiForward10Line } from "react-icons/ri";
import { RxLoop } from "react-icons/rx";
import { ClipLoader } from "react-spinners";
import usePlayerState from "@/hooks/usePlayerState";
import { PlayerSlider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function PlayerContent() {
  const {
    activeSong,
    prevPlayerQueue,
    nextPlayerQueue,
    isShuffle,
    repeatMode,
    toggleShuffle,
    cycleRepeatMode,
    playBack,
    playNext,
  } = usePlayerState();

  const [audio, state, controls, ref] = useAudio({
    src: activeSong?.src || "",
    autoPlay: true,
  });

  const [hiFiEnabled, setHiFiEnabled] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceConnectedRef = useRef(false);
  const lowShelfRef = useRef<BiquadFilterNode | null>(null);
  const highShelfRef = useRef<BiquadFilterNode | null>(null);
  const compressorRef = useRef<DynamicsCompressorNode | null>(null);

  const isLoading = Boolean(activeSong?.src) && state?.buffered?.length === 0;

  // Setup Web Audio API Hi-Fi mastering chain (warm bass + crisp presence + loudness normalization)
  const ensureAudioChain = useCallback(() => {
    const audioEl = ref?.current;
    if (!audioEl || sourceConnectedRef.current) {
      if (audioCtxRef.current?.state === "suspended") {
        audioCtxRef.current.resume().catch(() => {});
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const source = ctx.createMediaElementSource(audioEl);

      const lowShelf = ctx.createBiquadFilter();
      lowShelf.type = "lowshelf";
      lowShelf.frequency.value = 90;
      lowShelf.gain.value = hiFiEnabled ? 2.5 : 0;

      const highShelf = ctx.createBiquadFilter();
      highShelf.type = "highshelf";
      highShelf.frequency.value = 8500;
      highShelf.gain.value = hiFiEnabled ? 2.5 : 0;

      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.value = hiFiEnabled ? -18 : 0;
      compressor.knee.value = 20;
      compressor.ratio.value = hiFiEnabled ? 3 : 1;
      compressor.attack.value = 0.005;
      compressor.release.value = 0.15;

      source.connect(lowShelf);
      lowShelf.connect(highShelf);
      highShelf.connect(compressor);
      compressor.connect(ctx.destination);

      audioCtxRef.current = ctx;
      lowShelfRef.current = lowShelf;
      highShelfRef.current = highShelf;
      compressorRef.current = compressor;
      sourceConnectedRef.current = true;
    } catch {
      // Fallback to native audio output if Web Audio API is blocked
    }
  }, [ref, hiFiEnabled]);

  useEffect(() => {
    if (lowShelfRef.current && highShelfRef.current && compressorRef.current) {
      lowShelfRef.current.gain.value = hiFiEnabled ? 2.5 : 0;
      highShelfRef.current.gain.value = hiFiEnabled ? 2.5 : 0;
      compressorRef.current.threshold.value = hiFiEnabled ? -18 : 0;
      compressorRef.current.ratio.value = hiFiEnabled ? 3 : 1;
    }
  }, [hiFiEnabled]);

  useEffect(() => {
    if (state.playing) {
      ensureAudioChain();
    }
  }, [state.playing, ensureAudioChain]);

  const onClickNext = useCallback(() => {
    if (repeatMode === "one") {
      controls.seek(0);
      controls.play();
      return;
    }
    if (nextPlayerQueue.length === 0 && repeatMode !== "all") {
      controls.pause();
    } else {
      playNext();
    }
  }, [controls, playNext, nextPlayerQueue.length, repeatMode]);

  useEffect(() => {
    const audioEl = ref?.current;
    if (!audioEl) return;
    audioEl.addEventListener("ended", onClickNext);
    return () => {
      audioEl.removeEventListener("ended", onClickNext);
    };
  }, [ref, onClickNext]);

  // Keyboard shortcuts: Space (play/pause), Left/Right (±5s)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;

      if (e.code === "Space") {
        e.preventDefault();
        if (state.playing) controls.pause();
        else controls.play();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        controls.seek(Math.max(0, state.time - 5));
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        controls.seek(Math.min(state.duration || 0, state.time + 5));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [controls, state.playing, state.time, state.duration]);

  const seekTo = (nextTime: number) => {
    const clamped = Math.max(0, Math.min(state.duration || 0, nextTime));
    controls.seek(clamped);
  };

  return (
    <div className="h-full w-full relative">
      <div className="absolute top-[-16px] w-full">
        <PlayerSlider
          className="w-full cursor-pointer"
          defaultValue={[0]}
          value={[state.time]}
          onValueChange={(value) => controls.seek(value[0])}
          max={state.duration || 100}
        />
      </div>
      {audio}
      <section className="flex flex-row justify-between items-center w-full h-full px-3 lg:px-6 gap-2">
        {/* Left: Playback controls + Time */}
        <div className="h-full flex flex-row items-center gap-2 lg:gap-4 shrink-0">
          <IoPlaySkipBackSharp
            size={22}
            className="cursor-pointer hover:text-neutral-300"
            title="이전 곡"
            onClick={() => {
              if (state.playing && state.time > 5) {
                controls.seek(0);
                return;
              }
              if (prevPlayerQueue.length > 0) playBack();
            }}
          />
          <RiReplay10Line
            size={22}
            className="hidden sm:block cursor-pointer text-neutral-300 hover:text-white"
            title="10초 뒤로"
            onClick={() => seekTo(state.time - 10)}
          />
          {isLoading ? (
            <ClipLoader color="#FFF" size={24} />
          ) : state.playing ? (
            <AiOutlinePause
              size={36}
              className="cursor-pointer hover:scale-105 transition-transform"
              title="일시정지 (Space)"
              onClick={() => controls.pause()}
            />
          ) : (
            <RiPlayFill
              size={36}
              className="cursor-pointer hover:scale-105 transition-transform"
              title="재생 (Space)"
              onClick={() => {
                ensureAudioChain();
                if (activeSong) controls.play();
                else playNext();
              }}
            />
          )}
          <RiForward10Line
            size={22}
            className="hidden sm:block cursor-pointer text-neutral-300 hover:text-white"
            title="10초 앞으로"
            onClick={() => seekTo(state.time + 10)}
          />
          <IoPlaySkipForwardSharp
            size={22}
            className="cursor-pointer hover:text-neutral-300"
            title="다음 곡"
            onClick={onClickNext}
          />
          <div className="text-xs text-neutral-300 tabular-nums ml-1">
            {formatTime(state.time)} / {formatTime(state.duration)}
          </div>
        </div>

        {/* Center: Active song info */}
        <article className="min-w-0 flex-1 flex justify-center">
          <div className="flex flex-row gap-3 items-center max-w-full">
            <div className="relative w-[40px] h-[40px] shrink-0">
              {activeSong?.imageSrc && (
                <Image fill className="object-cover rounded" src={activeSong.imageSrc} alt="img" />
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="truncate text-sm font-medium">{activeSong?.name}</div>
              <div className="text-neutral-400 text-xs truncate">
                {activeSong?.channel}
              </div>
            </div>
          </div>
        </article>

        {/* Right: Hi-Fi EQ, Volume slider, Shuffle, Repeat */}
        <div className="flex flex-row gap-3 items-center shrink-0">
          <button
            type="button"
            onClick={() => setHiFiEnabled((v) => !v)}
            className={cn(
              "hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border transition-colors",
              hiFiEnabled
                ? "border-emerald-400 text-emerald-300 bg-emerald-950/60"
                : "border-neutral-600 text-neutral-400 hover:text-white"
            )}
            title="Hi-Fi 음질 향상 (EQ + 음량 균일화)"
          >
            Hi-Fi {hiFiEnabled ? "ON" : "OFF"}
          </button>

          <div className="hidden lg:flex flex-row items-center gap-2">
            <button
              type="button"
              onClick={() => (state.muted ? controls.unmute() : controls.mute())}
              className="text-neutral-300 hover:text-white"
              title={state.muted ? "음소거 해제" : "음소거"}
            >
              {state.muted || state.volume === 0 ? (
                <IoVolumeMuteOutline size={22} />
              ) : (
                <IoVolumeHighOutline size={22} />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={state.muted ? 0 : state.volume}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (state.muted && v > 0) controls.unmute();
                controls.volume(v);
              }}
              className="w-20 accent-white cursor-pointer h-1"
              aria-label="볼륨"
            />
          </div>

          <button
            type="button"
            onClick={toggleShuffle}
            className={cn(
              "cursor-pointer transition-colors",
              isShuffle ? "text-emerald-400" : "text-neutral-400 hover:text-white"
            )}
            title="셔플 재생"
          >
            <IoShuffle size={22} />
          </button>

          <button
            type="button"
            onClick={cycleRepeatMode}
            className={cn(
              "relative cursor-pointer transition-colors",
              repeatMode !== "off" ? "text-emerald-400" : "text-neutral-400 hover:text-white"
            )}
            title={`반복 재생: ${repeatMode === "off" ? "끔" : repeatMode === "all" ? "전체 반복" : "한 곡 반복"}`}
          >
            <RxLoop size={20} />
            {repeatMode === "one" && (
              <span className="absolute -top-1 -right-1.5 text-[9px] font-bold bg-emerald-500 text-black rounded-full w-3.5 h-3.5 flex items-center justify-center">
                1
              </span>
            )}
          </button>
        </div>
      </section>
    </div>
  );
}

export default function PlayerWrapper() {
  const { isVisiblePlayer } = usePlayerState();
  if (!isVisiblePlayer) return null;
  return (
    <div className="fixed bottom-0 h-[72px] w-full bg-neutral-900 border-t border-neutral-800 z-50">
      <PlayerContent />
    </div>
  );
}
