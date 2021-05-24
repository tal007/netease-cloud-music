export function checkIsEmpty(value: string | number): boolean {
  if (typeof value === 'number') {
    value = value.toString();
  }
  
  return !value.trim().length;
}