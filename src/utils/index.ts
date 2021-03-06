import { Lyric } from "types/lyric";
import { MusicItemProps } from "types/musicItem";

export function checkIsEmpty(value: string | number): boolean {
  if (typeof value === "number") {
    value = value.toString();
  }

  return !value.trim().length;
}

// export function isViod() {}

// export function clearObject(o:{}) {
//   const obj = {...o}
//   for (const key in obj) {
//     if (obj[key] !== undefined) {

//     }
//   }
// }

export function fillNumber(value: number | string) {
  return value < 10 ? "0" + value : value;
}

// 音乐毫秒转换
export function formatTime(value: string | number) {
  value = parseInt(String(value), 10) / 1000;
  let min = fillNumber(parseInt(String(value / 60), 10));
  let sec = fillNumber(parseInt(String(value % 60), 10));
  min = isNaN(min as number) ? "00" : min;
  sec = isNaN(sec as number) ? "00" : sec;
  return `${min}:${sec}`;
}

/**
 *  判断字符串长度，其中将双字节字符串的长度变为2
 *
 * @export
 * @param {string} str 需要传入的字符串
 * @param {number} n 如果需要，达到某个限定值即 return 不再进行for循环
 * @return {*}  {number}
 */
export function mySubString(str: string, len: number, hasDot: boolean = true) {
  var newLength = 0;
  var newStr = "";
  // eslint-disable-next-line no-control-regex
  var chineseRegex = /[^\x00-\xff]/g;
  var singleChar = "";
  var strLength = str.replace(chineseRegex, "**").length;
  for (var i = 0; i < strLength; i++) {
    singleChar = str.charAt(i).toString();
    if (singleChar.match(chineseRegex) != null) {
      newLength += 2;
    } else {
      newLength++;
    }
    if (newLength > len) {
      break;
    }
    newStr += singleChar;
  }
  if (hasDot && strLength > len) {
    newStr += "...";
  }
  return newStr;
}

/**
 * 歌词处理
 *
 * @export
 * @param {string} str
 */
export function dealWithLyric(str: string): Lyric[] {
  const lyricArr = str.split("\n");
  lyricArr.pop();
  return lyricArr.map((item) => {
    const time = item.split("]")[0].split("[")[1];
    const min: number = parseFloat(time.split(":")[0]);
    const sec: number = parseFloat(time.split(":")[1]);
    const duration: number = min * 60 + sec * 1;
    return {
      time,
      duration,
      text: item.split("]")[1].trim(),
    };
  });
}

// 节流
export function throttle() {}

// 防抖
export function debounce(method: Function, delay: number) {
  let timer: null | number = null;
  return (...args: any) => {
    if (timer) {
      window.clearTimeout(timer);
      timer = null;
    }
    timer = window.setTimeout(function () {
      method(...args);
    }, delay);
  };
}

// 处理需要收费或者会员的歌曲
export function filterMusic(musicList: MusicItemProps[]) {
  // * 8 才是免费的 1是购买单曲 3是购买专辑
  return musicList.filter((music) => {
    if (music.fee) {
      return music.fee === 8;
    }
    return music;
  });
}
