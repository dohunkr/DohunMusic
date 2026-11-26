import { Playlist, Song, TopSong } from "@/types";
import { getRandomInt } from "./utils";

export const allSongs: Song[] = [
  {
    name: "관음드래곤즈의 김태형 응원가",
    channelId: 1,
    channel: "도헌",
    src: "/music/50meru - Canopus.mp4",
    imageSrc: "/img/baseball-1.jpg",
  },
  {
    name: "관음드래곤즈의 전시형 응원가",
    channelId: 1,
    channel: "도헌",
    src: "/music/50meru - Vega.mp4",
    imageSrc: "/img/baseball-2.jpg",
  },
  {
    name: "관음드래곤즈의 조승윤 응원가",
    channelId: 1,
    channel: "도헌",
    src: "/music/50meru - aldebaran.mp4",
    imageSrc: "/img/baseball-3.jpg",
  },
  {
    name: "관음드래곤즈의 정재한 응원가",
    channelId: 1,
    channel: "도헌",
    src: "/music/50meru - constellations.mp4",
    imageSrc: "/img/baseball-4.jpg",
  },
  {
    name: "관음드래곤즈의 현재욱 응원가",
    channelId: 1,
    channel: "도헌",
    src: "/music/CattyBGM - 불 붙인 양초.mp4",
    imageSrc: "/img/baseball-5.jpg",
  },
  {
    name: "관음드래곤즈의 양진우 응원가",
    channelId: 1,
    channel: "도헌",
    src: "/music/ClearnEars - Christmas.mp4",
    imageSrc: "/img/baseball-6.jpg",
  },
  {
    name: "관음드래곤즈의 박태준 응원가",
    channelId: 1,
    channel: "도헌",
    src: "/music/daldam music - 붕 뜬 코끼리.mp4",
    imageSrc: "/img/baseball-7.jpg",
  },
  {
    name: "관음드래곤즈의 전재민 응원가",
    channelId: 1,
    channel: "도헌",
    src: "/music/daldam music - 밥.mp4",
    imageSrc: "/img/baseball-8.jpg",
  },
  {
    name: "관음드래곤즈의 권용준 응원가",
    channelId: 1,
    channel: "도헌",
    src: "/music/daldam music - 차.mp4",
    imageSrc: "/img/baseball-9.jpg",
  },
];

export const getSongsBychannel = (channel: string) => {
  return allSongs.filter((song) => song.channel === channel);
};

export const dummyPlaylistArray: Playlist[] = [
  {
    id: 1,
    owner: "도헌",
    playlistName: "관음드래곤즈 야구응원가 모음",
    coverImageSrc: "/img/baseball-10.jpg",
    songList: getSongsBychannel("도헌"),
  },
  {
    id: 2,
    owner: "도헌",
    playlistName: "2026축제",
    coverImageSrc: "/img/ClearnEars - butter.jpeg",
    songList: [],
  },
];

export const getAllPlaylist = async () => [...dummyPlaylistArray];

export const getPlaylistByOwner = (owner: string) => {
  return dummyPlaylistArray.filter((playlist) => playlist.owner === owner);
};

export const getPlaylistById = async (id: number) => {
  return dummyPlaylistArray.find((playlist) => playlist.id === id);
};

export const getSongListTop10 = async (): Promise<TopSong[]> =>
  allSongs.map((song, idx) => ({
    prevRank: idx,
    rank: idx,
    ...song,
  }));

export const dummyChannelList = [
  {
    id: 1,
    subscribers: 41800,
    name: "도헌",
    songList: getSongsBychannel("도헌"),
    playlistArray: getPlaylistByOwner("도헌"),
  },
];

export const getChannelById = async (id: number) => {
  return dummyChannelList.find((channel) => channel.id === id);
};

export const homeCategoryList = [
  {
    label: "운동",
    src: "https://images.unsplash.com/photo-1487956382158-bb926046304a",
  },
  {
    label: "행복한 기분",
    src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
  },
  {
    label: "에너지 충전",
    src: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94",
  },
  {
    label: "휴식",
    src: "https://images.unsplash.com/photo-1528962862197-29c4f24ccc04",
  },
  {
    label: "집중",
    src: "https://images.unsplash.com/photo-1472745433479-4556f22e32c2",
  },
  {
    label: "출퇴근길",
    src: "https://images.unsplash.com/photo-1657073895095-b050616ab369",
  },
  {
    label: "로맨스",
    src: "https://images.unsplash.com/photo-1581700501514-95e559cff7e9",
  },
  {
    label: "파티",
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  },
  {
    label: "슬픔",
    src: "https://images.unsplash.com/photo-1534330207526-8e81f10ec6fc",
  },
  {
    label: "잠잘 때",
    src: "https://images.unsplash.com/photo-1429117237875-aa29229d99f0",
  },
];

export const getDummyGenreList = () => {
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
};

export const dummymusicGenreList = () => getRandomInt(0, 10);
