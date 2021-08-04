import { logger, WIN_HEIGHT, WIN_WIDTH } from "./constants";
import LoadingScreen from "./LoadingScreen";
import Resources from "./Resources";
import Scene from "./Scene";

const log = logger.extend("movie");

export default async function movie(
  r: Resources,
  container: HTMLElement
): Promise<void> {
  const mainCtx = r.getCanvas(WIN_WIDTH, WIN_HEIGHT);
  const canvas = mainCtx.canvas;

  // Append canvas to container
  container.appendChild(canvas);

  const loadingScreen = new LoadingScreen(r);

  // 'global' variables
  let lastTime = 0;
  let scene: Scene = loadingScreen;

  function listenSceneChange(e: CustomEvent<Scene>) {
    scene.removeEventListener("sceneChange", listenSceneChange);
    scene.remove();
    scene = e.detail;
    log("scene change", scene);
    scene.addEventListener("sceneChange", listenSceneChange);
  }
  scene.addEventListener("sceneChange", listenSceneChange);

  function attachEventListener(type: string) {
    document.addEventListener(type, ({ buttons, pageX, pageY }: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = pageX - rect.x;
      const y = pageY - rect.y;
      scene.dispatchEvent(
        new MouseEvent(type, { buttons, clientX: x, clientY: y })
      );
    });
  }

  attachEventListener("mousedown");
  attachEventListener("mousemove");
  attachEventListener("mouseout");
  attachEventListener("mouseup");

  await loadingScreen.loadResources();

  function drawLoading(timestamp: number) {
    const timeDiff = timestamp - lastTime;
    lastTime = timestamp;
    scene.logic(timeDiff);
    scene.draw(mainCtx);
    requestAnimationFrame(drawLoading);
  }

  requestAnimationFrame(drawLoading);
}
