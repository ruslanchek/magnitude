// @ts-ignore
import stringToColor from 'string-to-color';
import Color from 'color';

export function colorHash(str: string): Color {
  return Color(stringToColor(str));
}
