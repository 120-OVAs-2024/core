import type { CSSEntries } from 'unocss';

import { directionMap } from './mapping';

export const marginSpacing = ([, direction, number]: string[]): CSSEntries | undefined => {
  if (!number) return undefined;

  const value = +number;
  const remValue = `${value * 0.5}rem`;
  const vhValue = value <= 2 ? `1vh` : `${value - 1}vh`;

  return [[`margin${directionMap[direction]}`, `min(${remValue}, ${vhValue})`]];
};

export const paddingSpacing = ([, direction, number]: string[]): CSSEntries | undefined => {
  if (!number) return undefined;

  const value = +number;
  const remStart = value <= 2 ? 0.5 : Math.floor((value - 1) / 2) * 0.5 + 0.5;
  const remEnd = value % 2 === 0 ? value / 2 : (value - 1) / 2 + 0.5;

  return [[`padding${directionMap[direction]}`, `clamp(${remStart}rem, ${value}%, ${remEnd}rem)`]];
};

// 'u-p-20'.match(/^u-p([xylrtb]?)-(.+)$/)
