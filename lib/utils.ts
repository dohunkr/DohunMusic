import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled;
}

export function getRandomElementFromArray<T>(arr: T[]): T | undefined {
  const len = arr?.length;
  if (!len) return undefined;
  return arr[getRandomInt(0, len - 1)];
}

export function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
  const resultArray: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    resultArray.push(arr.slice(i, i + chunkSize));
  }
  return resultArray;
}

export function generateGenreList() {
  return [
    "잠잘 때",
    "인디 & 얼터너티브",
    "계절 변화를 위한 테마",
    "국내 발라드",
    "국내 록/얼터너티브",
    "슬픔",
    "연말연시",
    "국내 댄스",
    "RnB 및 소울",
    "랙",
    "힙합",
    "에너지 충전",
    "파티",
    "운동",
    "로맨스",
    "집중",
    "출퇴근길",
  ];
}
