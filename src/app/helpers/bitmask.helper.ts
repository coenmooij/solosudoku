export class BitmaskHelper {
  public static unset(mask: number, value: number): number {
    return mask & ~(1 << value);
  }

  public static set(mask: number, value: number): number {
    return mask | (1 << value);
  }

  public static isSet(mask: number, value: number): boolean {
    return (mask & (1 << value)) !== 0;
  }

  public static isEmpty(mask: number): boolean {
    return mask === 0;
  }

  public static toArray(mask: number): number[] {
    const array: number[] = [];
    for (let value: number = 1; value <= 9; value++) {
      if (this.isSet(mask, value)) {
        array.push(value);
      }
    }
    return array;
  }

  public static toString(mask: number, length: number = 10): string {
    return '0b' + mask.toString(2).padStart(length, '0');
  }

  public static count(mask: number): number {
    let count: number = 0;
    while (mask) {
      count += mask & 1;
      mask >>>= 1;
    }
    return count;
  }

  public static first(mask: number, length: number = 10): number {
    for (let value: number = 0; value < length; value++) {
      if (this.isSet(mask, value)) return value;
    }
    return -1;
  }
}
