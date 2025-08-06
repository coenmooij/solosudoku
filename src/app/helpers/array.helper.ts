export function numberSort(a: number, b: number): number {
  return a - b;
}

export function stringSort(a: string, b: string): number {
  return a.localeCompare(b);
}
