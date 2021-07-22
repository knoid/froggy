import zipLoader from "../shared/zipLoader";

async function main() {
  const zipFile = await zipLoader();

  const textarea = document.createElement("textarea");
  textarea.cols = 48;
  textarea.rows = 35;

  const selectElement = document.createElement("select");
  selectElement.addEventListener("input", async function () {
    textarea.innerText = "Loading…";
    const option = this.selectedOptions[0];
    if (option) {
      const fileContents = await zipFile
        .file(option.innerText)
        .async("arraybuffer");
      const data = new DataView(fileContents);

      textarea.innerText = Array.from(new Uint8Array(fileContents))
        .map((int8) => int8.toString(16).padStart(2, "0"))
        .join(" ");

      const header = String.fromCharCode(
        ...Array.from(new Uint8Array(fileContents, 0, 4))
      );
      const byteSize = data.getUint32(3 * 4, true);
      const pointsCount = data.getUint32(4 * 4, true);
      console.log({ header, byteSize, pointsCount });

      // const d = new DataView(fileContents, 0x14, 0x14 + byteSize - 4);
      // const xx = [];
      // const yy: number[] = [];
      // for (let s = 0; s < pointsCount; s++) {
      //   const x = d.getInt32(s * 10, true);
      //   const y = d.getInt32(s * 10 + 4, true);
      //   xx.push(x);
      //   yy.push(y);
      // }

      const xd = new DataView(fileContents, 0x10 + byteSize);
      const detailedPointsCount = xd.getUint32(0x0, true);
      let cx = xd.getFloat32(0x4, true);
      let cy = xd.getFloat32(0x8, true);
      console.log({ detailedPointsCount, cx, cy });

      // const xx: number[] = [];
      // const yy: number[] = [];
      // for (let i = 0; i < detailedPointsCount - 1; i++) {
      //   const x = xd.getInt8(0xc + i * 4 + 2);
      //   const y = xd.getInt8(0xc + i * 4 + 3);
      //   cx += x / 100;
      //   cy += y / 100;
      //   xx.push(cx);
      //   yy.push(cy);
      // }

      const diffPoints = new Int8Array(
        fileContents,
        0x10 + byteSize + 0xc,
        4 * (detailedPointsCount - 1)
      );
      const xx = diffPoints.filter((v, i) => i % 4 === 2);
      const yy = diffPoints.filter((v, i) => i % 4 === 3);

      // console.log(
      //   Array.from(xx)
      //     .map((x, i) => `(${x},${yy[i]})`)
      //     .join("\n")
      // );
    }
  });
  selectElement.size = 30;

  document.body.appendChild(selectElement);
  document.body.appendChild(textarea);

  zipFile.forEach((path) => {
    if (path.endsWith(".dat")) {
      const option = document.createElement("option");
      option.innerText = path;
      selectElement.appendChild(option);
    }
  });
}

main();
