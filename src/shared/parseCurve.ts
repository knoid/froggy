/**
 * This code is based on hclxing's python implementation on "Reverse
 * Engineering Zuma Deluxe’s level file" [blog post][1].
 * [1]: https://hclxing.wordpress.com/2017/06/27/reverse-engineering-zuma-deluxes-level-file/
 */

export type Coords2D = [number, number];
export type CurvePoints = Coords2D[];

export default function parseCurve(fileContents: ArrayBuffer): CurvePoints {
  const data = new DataView(fileContents);

  const header = String.fromCharCode(
    ...Array.from(new Uint8Array(fileContents, 0, 4))
  );
  console.assert(header === "CURV", "invalid header %s", header);

  const byteSize = data.getUint32(3 * 4, true);
  // const pointsCount = data.getUint32(4 * 4, true);

  const xd = new DataView(fileContents, 0x10 + byteSize);
  const detailedPointsCount = xd.getUint32(0x0, true);
  const cx = xd.getFloat32(0x4, true);
  const cy = xd.getFloat32(0x8, true);

  const diffPoints = new Int8Array(
    fileContents,
    0x10 + byteSize + 0xc,
    4 * (detailedPointsCount - 1)
  );
  const xx = diffPoints.filter((v, i) => i % 4 === 2);
  const yy = diffPoints.filter((v, i) => i % 4 === 3);

  return [[cx, cy], ...Array.from(xx).map((x, i): Coords2D => [x, yy[i]])];
}
