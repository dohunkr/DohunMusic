import { create } from "zustand";
import { Song } from "@/types";

export type RepeatMode = "off" | "all" | "one";

interface PlayerState {
  isVisiblePlayer: boolean;
  setIsVisiblePlayer: (isVisiblePlayer: boolean) => void;
  activeSong?: Song | null;
  prevPlayerQueue: Song[];
  nextPlayerQueue: Song[];
  isShuffle: boolean;
  repeatMode: RepeatMode;
  toggleShuffle: () => void;
  cycleRepeatMode: () => void;
  addSongList: (songList: Song[]) => void;
  playNext: () => void;
  playBack: () => void;
}

const usePlayerState = create<PlayerState>((set) => ({
  isVisiblePlayer: false,
  setIsVisiblePlayer: (isVisiblePlayer) => set({ isVisiblePlayer }),
  activeSong: null,
  prevPlayerQueue: [],
  nextPlayerQueue: [],
  isShuffle: false,
  repeatMode: "off",
  toggleShuffle: () => set((prev) => ({ isShuffle: !prev.isShuffle })),
  cycleRepeatMode: () =>
    set((prev) => ({
      repeatMode:
        prev.repeatMode === "off"
          ? "all"
          : prev.repeatMode === "all"
          ? "one"
          : "off",
    })),
  addSongList: (songList) =>
    set((prev) => {
      if (!songList || songList.length === 0) return prev;
      const prevSong = prev.activeSong;
      const cloneSongList = [...songList];
      if (prev.isShuffle && cloneSongList.length > 1) {
        for (let i = cloneSongList.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [cloneSongList[i], cloneSongList[j]] = [cloneSongList[j], cloneSongList[i]];
        }
      }
      const currentSong = cloneSongList.splice(0, 1)?.[0];
      return {
        activeSong: currentSong,
        prevPlayerQueue: prevSong
          ? [prevSong, ...prev.prevPlayerQueue]
          : prev.prevPlayerQueue,
        nextPlayerQueue: [...cloneSongList],
        isVisiblePlayer: true,
      };
    }),
  playNext: () =>
    set((prev) => {
      const currentSong = prev.activeSong;
      const nextQueue = [...prev.nextPlayerQueue];

      if (nextQueue.length === 0) {
        if (prev.repeatMode === "all" && prev.prevPlayerQueue.length > 0) {
          const fullQueue = [...prev.prevPlayerQueue].reverse();
          if (currentSong) fullQueue.push(currentSong);
          const nextSong = fullQueue.shift() ?? null;
          return {
            activeSong: nextSong,
            nextPlayerQueue: fullQueue,
            prevPlayerQueue: [],
          };
        }
        return prev;
      }

      const pickIdx = prev.isShuffle
        ? Math.floor(Math.random() * nextQueue.length)
        : 0;
      const [nextSrc] = nextQueue.splice(pickIdx, 1);

      return {
        activeSong: nextSrc,
        nextPlayerQueue: nextQueue,
        prevPlayerQueue: [
          ...(currentSong ? [currentSong] : []),
          ...prev.prevPlayerQueue,
        ],
      };
    }),
  playBack: () =>
    set((prev) => {
      if (prev.prevPlayerQueue.length === 0) return prev;
      const currentSong = prev.activeSong;
      const prevQueue = [...prev.prevPlayerQueue];
      const [preSrc] = prevQueue.splice(0, 1);
      return {
        activeSong: preSrc,
        nextPlayerQueue: [
          ...(currentSong ? [currentSong] : []),
          ...prev.nextPlayerQueue,
        ],
        prevPlayerQueue: prevQueue,
      };
    }),
}));

export default usePlayerState;
