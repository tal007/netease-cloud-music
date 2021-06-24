export interface HomeNewMusicItemProps {
  alg: string;
  canDislike: boolean;
  id: number;
  name: string;
  picUrl: string;
  song: {
    alias: string[];
    album: {
      artists: [
        {
          name: string;
          id: number;
        }
      ];
    };
    duration: number;
  };
}

export interface MusicItemProps {
  name: string;
  id: number;
  picUrl?: string;
  fee?: number;
  dt?: number;
  alia?: string[];
  al?: { name: string; id: number; picUrl: string };
  ar?: { name: string; id: number }[];
  publishTime?: number;

  duration?: number;
  alias?: string[];
  album?: {
    id: number;
    name: string;
    picUrl: string;
    publishTime: number;
  };
  artists?: [
    {
      name: string;
      id: number;
    }
  ];
}
