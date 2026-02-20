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
  switch (op) {
    case 'add':
      return a + b;

    case 'sub':
      return a - b;

    case 'mul':
      return a * b;

    case 'div':
      if (b === 0) throw new Error('zero_division');
      return a / b;

    default:
      throw new Error('unknown_op');
  }
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
    name: 'adds negative numbers',
    input: { a: -10, b: -5, op: 'add' },
    want: -15,
  },
  {
    name: 'multiplies negative and positive',
    input: { a: -4, b: 3, op: 'mul' },
    want: -12,
  },
  {
    name: 'subtracts to result in negative number',
    input: { a: 5, b: 10, op: 'sub' },
    want: -5,
  },

  {
    name: 'errors on division by zero',
    input: { a: 10, b: 0, op: 'div' },
    wantError: 'zero_division',
  },

  {
    name: 'multiplies by zero',
    input: { a: 10, b: 0, op: 'mul' },
    want: 0,
  },

  {
    name: 'multiplies zero by zero',
    input: { a: 0, b: 0, op: 'mul' },
    want: 0,
  },

  {
    name: 'divides decimals',
    input: { a: 10.5, b: 2, op: 'div' },
    want: 5.25,
  },
  {
    name: 'divides resulting in a repeating decimal',
    input: { a: 10, b: 3, op: 'div' },
    want: 3.3333333333333335,
  },

  {
    name: 'add zero',
    input: { a: 5, b: 0, op: 'add' },
    want: 5,
  },

  {
    name: 'subtracting from zero',
    input: { a: 0, b: 10, op: 'sub' },
    want: -10,
  },

  {
    name: '0.1 + 0.2',
    input: { a: 0.1, b: 0.2, op: 'add' },
    want: 0.30000000000000004,
  },
];

describe('Calculator TDD', () => {
  for (const tc of cases) {
    it(tc.name, () => {
      if (tc.wantError) {
        expect(() => calculator(tc.input)).toThrow(tc.wantError);
      } else {
        const got = calculator(tc.input);
        if (!Number.isInteger(tc.want!)) {
          expect(got).toBeCloseTo(tc.want!, 20);
        } else {
          expect(got).toBe(tc.want!);
        }
      }
    });
  }
});
