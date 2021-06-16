interface LoginAccount {
  anonimousUser: boolean;
  ban: number;
  baoyueVersion: number;
  createTime: number;
  donateVersion: number;
  id: number;
  salt: string;
  status: number;
  tokenVersion: number;
  type: number;
  userName: string;
  vipType: number;
  viptypeVersion: number;
  whitelistAuthority: number;
}

// 绑定的三方，微博微信QQ等
interface LoginBinding {
  bindingTime: number;
  expired: boolean;
  expiresIn: number;
  id: number;
  refreshTime: number;
  tokenJsonStr: string;
  type: number;
  url: string;
  userId: number;
}

// 这个才是有用的
interface LoginProfile {
  accountStatus: number;
  authStatus: number;
  authority: number;
  avatarDetail: null;
  avatarImgId: number;
  avatarImgIdStr: string;
  avatarImgId_str: string;
  avatarUrl: string;
  backgroundImgId: number;
  backgroundImgIdStr: string;
  backgroundUrl: string;
  birthday: number;
  city: number;
  defaultAvatar: false;
  description: string;
  detailDescription: string;
  djStatus: number;
  eventCount: number;
  expertTags: null;
  experts: {};
  followed: false;
  followeds: number;
  follows: number;
  gender: number;
  mutual: false;
  nickname: string;
  playlistBeSubscribedCount: number;
  playlistCount: number;
  province: number;
  remarkName: null;
  signature: string;
  userId: number;
  userType: number;
  vipType: number;
}

interface LoginData {
  account: LoginAccount;
  bindings?: Array<LoginBinding>;
  cookie: string;
  profile: LoginProfile;
  token: string;
}

// banner
interface Banner {
  imageUrl: "http://p1.music.126.net/p-X_FB0qUI0RVwn3CpQeTg==/109951166003834354.jpg";
  targetId: 1844442105;
  targetType: 1;
  titleColor: "red";
  typeTitle: "独家";
}

// 新歌速递
// 1844442105
interface MusicItem {
  name: string;
  id: number;
  mvid: number;
  alias: string[];
  artists: [
    {
      name: string;
      id: number;
    }
  ];
  album: {
    picUrl: string;
    name: string;
  };
  duration: number;
}

type MusicList = MusicItem[];

// 歌词
interface Lyric {
  time: string;
  duration: number;
  text: string;
}
