/** @jest-environment jsdom */
import Drawable from "./Drawable";
import Emitter from "./Emitter";
import Rotatable from "./Rotatable";

test("mixed in class maintains its properties", () => {
  class BaseMixin extends Emitter implements Drawable {
    x = 1;
    y = 2;
    foo = true;
    isPointInside() {
      return false;
    }
    draw() {
      // noop
    }
    remove() {
      // noop
    }
  }

  class MixedIn extends Rotatable(BaseMixin) {}

  let mixedIn1: MixedIn;
  mixedIn1 = new MixedIn();
  mixedIn1 = new MixedIn();

  expect(mixedIn1.foo).toBe(true);
  expect(mixedIn1.rotation).toBe(0);

  const mixedIn2 = new MixedIn();
  expect(mixedIn2.foo).toBe(true);
  expect(mixedIn2.rotation).toBe(0);
});
