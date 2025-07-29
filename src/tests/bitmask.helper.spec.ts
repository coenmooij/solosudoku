import { BitmaskHelper } from '@solosudoku/helpers';

describe('BitmaskHelper', () => {
  it('should add', () => {
    const result: number = BitmaskHelper.set(0b0000, 2);
    expect(result).toBe(0b0100);
  });

  it('should add idempotent', () => {
    let result: number = BitmaskHelper.set(0b0000, 2);
    expect(result).toBe(0b0100);

    result = BitmaskHelper.set(result, 2);
    expect(result).toBe(0b0100);
  });

  it('should unset', () => {
    const result: number = BitmaskHelper.unset(0b1110, 2);
    expect(result).toBe(0b1010);
  });

  it('should unset idempotent', () => {
    let result: number = BitmaskHelper.unset(0b1110, 2);
    expect(result).toBe(0b1010);

    result = BitmaskHelper.unset(result, 2);
    expect(result).toBe(0b1010);
  });

  it('should set and unset', () => {
    let result: number = BitmaskHelper.set(0b0000, 2);
    expect(result).toBe(0b0100);

    result = BitmaskHelper.unset(result, 2);
    expect(result).toBe(0b0000);
  });

  it('should check if set', () => {
    const result: boolean = BitmaskHelper.isSet(0b0100, 2);
    expect(result).toBeTrue();
  });

  it('should check if not set', () => {
    const result: boolean = BitmaskHelper.isSet(0b0100, 1);
    expect(result).toBeFalse();
  });

  it('should be empty', () => {
    const result: boolean = BitmaskHelper.isEmpty(0b0000);
    expect(result).toBeTrue();
  });

  it('should not be empty', () => {
    const result: boolean = BitmaskHelper.isEmpty(0b0100);
    expect(result).toBeFalse();
  });

  it('should not be empty', () => {
    const result: boolean = BitmaskHelper.isEmpty(0b1110);
    expect(result).toBeFalse();
  });

  it('should convert to array', () => {
    const array: number[] = BitmaskHelper.toArray(0b0100);
    expect(array).toEqual([2]);
  });

  it('should convert to empty array', () => {
    const array: number[] = BitmaskHelper.toArray(0b0000);
    expect(array).toEqual([]);
  });

  it('should convert to full array', () => {
    const array: number[] = BitmaskHelper.toArray(0b1110);
    expect(array).toEqual([1, 2, 3]);
  });

  it('should convert to partial array', () => {
    const array: number[] = BitmaskHelper.toArray(0b0110);
    expect(array).toEqual([1, 2]);
  });

  describe('count', () => {
    it('should count', () => {
      const mask: number = 0b1110;
      const count: number = BitmaskHelper.count(mask);

      expect(count).toBe(3);
    });

    it('should count twice', () => {
      const mask: number = 0b0101;
      const count: number = BitmaskHelper.count(mask);

      expect(count).toBe(2);
    });

    it('should count thrice', () => {
      const mask: number = 0b10101;
      const count: number = BitmaskHelper.count(mask);

      expect(count).toBe(3);
    });
  });
});
