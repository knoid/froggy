import { logger, WIN_HEIGHT, WIN_WIDTH } from "./constants";
import LoadingScreen from "./LoadingScreen";
import MainMenu from "./MainMenu";
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
  scene.addEventListener("remove", async () => {
    // scene.remove();
    scene = new MainMenu(r);
    log("scene change", scene);
  });

  function attachEventListener(type: string) {
    canvas.addEventListener(type, ({ pageX, pageY }: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = pageX - rect.x;
      const y = pageY - rect.y;
      scene.dispatchEvent(new MouseEvent(type, { clientX: x, clientY: y }));
    });
  }

  attachEventListener("click");
  attachEventListener("mousedown");
  attachEventListener("mousemove");
  attachEventListener("mouseup");

  await loadingScreen.loadResources();

  function drawLoading(timestamp: number) {
    const timediff = timestamp - lastTime;
    lastTime = timestamp;
    scene.logic(timediff);
    scene.draw(mainCtx);
    requestAnimationFrame(drawLoading);
  }

  requestAnimationFrame(drawLoading);
}
