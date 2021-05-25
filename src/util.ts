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
  const min = parseInt(String(value / 60), 10);
  const sec = value % 60;
  return `${min}:${sec}`;
}
