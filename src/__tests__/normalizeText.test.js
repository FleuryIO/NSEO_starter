import { describe, it, expect } from 'vitest';
import { normalizeText } from '../pages/Intention.jsx';

describe('normalizeText', () => {
  it('minuscule + trim + espaces condensés', () => {
    expect(normalizeText('  HeLLo   World  ')).toBe('hello world');
  });
});