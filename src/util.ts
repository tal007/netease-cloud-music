export function checkIsEmpty(value: string | number): boolean {
  if (typeof value === 'number') {
    value = value.toString();
  }

  return !value.trim().length;
}

export function fillNumber(value: number) {
  return value < 10 ? '0' + value : value;
}

// 音乐毫秒转换
export function formatTime(value: string | number) {
  value = parseInt(String(value), 10);
  const min = fillNumber(parseInt(String(value / 60), 10));
  const sec = fillNumber(value % 60);
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
  var newStr = '';
  // eslint-disable-next-line no-control-regex
  var chineseRegex = /[^\x00-\xff]/g;
  var singleChar = '';
  var strLength = str.replace(chineseRegex, '**').length;
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
    newStr += '...';
  }
  return newStr;
}
