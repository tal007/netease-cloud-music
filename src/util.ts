export function checkIsEmpty(value: string | number): boolean {
  if (typeof value === 'number') {
    value = value.toString();
  }
  
  return !value.trim().length;
}

export function fillNumber(value: number) {
  return value < 10 ? '0' + value : value;
}