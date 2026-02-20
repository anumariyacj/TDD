// Example TDD
import { describe, it, expect } from 'bun:test';

type CalcInput = {
  a: number;
  b: number;
  op: 'add' | 'sub' | 'mul' | 'div';
};

type TestCase = {
  name: string;
  input: CalcInput;
  want?: number;
  wantError?: string;
};

const calculator = ({ a, b, op }: CalcInput): number => {
  if (op === 'add') return a + b;
  if (op === 'sub') return a - b;
  if (op === 'mul') return a * b;

  if (op === 'div') {
    if (b === 0) throw new Error('zero_division');
    return a / b;
  }

  throw new Error('unknown_op');
};

const cases: TestCase[] = [
  {
    name: 'adds positive numbers',
    input: { a: 10, b: 5, op: 'add' },
    want: 15,
  },
  {
    name: 'subtracts numbers',
    input: { a: 10, b: 5, op: 'sub' },
    want: 5,
  },
  {
    name: 'multiplies numbers',
    input: { a: 4, b: 3, op: 'mul' },
    want: 12,
  },
  {
    name: 'divides numbers',
    input: { a: 20, b: 5, op: 'div' },
    want: 4,
  },
  {
    name: 'errors on division by zero',
    input: { a: 10, b: 0, op: 'div' },
    wantError: 'zero_division',
  },
];

describe('Calculator TDD', () => {
  for (const tc of cases) {
    it(tc.name, () => {
      if (tc.wantError) {
        expect(() => calculator(tc.input)).toThrow(tc.wantError);
      } else {
        const got = calculator(tc.input);
        expect(got).toBe(tc.want!);
      }
    });
  }
});
