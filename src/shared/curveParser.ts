type Coords2D = [number, number];
type Curve = Coords2D[];

export function curveParser(fileContents: ArrayBuffer): Curve {
  const data = new DataView(fileContents);

  const header = String.fromCharCode(
    ...Array.from(new Uint8Array(fileContents, 0, 4))
  );

  if (header !== "CURV") {
    throw new Error("invalid curve file");
  }

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
