import JSZip from "jszip";

export default function zipLoader(): Promise<JSZip> {
  function onDragOver(e: Event) {
    e.preventDefault();
  }

  return new Promise((resolve) => {
    function onDrop(ev: DragEvent) {
      ev.preventDefault();

      const files: File[] = [];
      if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < ev.dataTransfer.items.length; i++) {
          // If dropped items aren't files, reject them
          if (ev.dataTransfer.items[i].kind === "file") {
            const file = ev.dataTransfer.items[i].getAsFile();
            files.push(file);
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (let i = 0; i < ev.dataTransfer.files.length; i++) {
          files.push(ev.dataTransfer.files[i]);
        }
      }

      const file = files.find((file) => file.type.includes("zip"));
      if (file) {
        document.removeEventListener("dragover", onDragOver);
        document.removeEventListener("drop", onDrop);
        resolve(JSZip.loadAsync(file));
      }
    }

    document.addEventListener("dragover", onDragOver);
    document.addEventListener("drop", onDrop);
  });
}
