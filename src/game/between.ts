/**
 * Cycles value around upper and lower margins
 */
export default function between(
  min: number,
  max: number,
  value: number
): number {
  return ((value - min) % (max - min)) + min;
}
