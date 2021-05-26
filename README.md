# 网易云音乐
[开源API接口地址](https://neteasecloudmusicapi.vercel.app/#/?id=%e8%8e%b7%e5%8f%96%e6%ad%8c%e6%9b%b2%e8%af%a6%e6%83%85)

baseURL: https://netease-cloud-music-wheat.vercel.app/

## 接口
- `/login/cellphone`电话登陆 `/login` 邮箱登陆
-  `/song/detail?ids=${data}` 歌曲详情
- `/banner` banner
- `/personalized/newsong?limit=10` 新歌速递，但是很多时候只返回四条数据
- `/personalized?limit=12` 推荐歌单，最大100(好像)
- `/top/song?type=0` 新歌页面新歌速递 全部:0 华语:7 欧美:96 日本:8 韩国:16
- `/lyric?id=33894312` 获取歌词
- `/song/url?id=33894312` 获取播放URL