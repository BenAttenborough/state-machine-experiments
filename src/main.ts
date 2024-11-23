import "./style.css";
import { State } from "./State";
import { titleState } from "./states/title";
import { playState } from "./states/play";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="main">
    <h1 class="title">STATE MACHINE</h1>
    <canvas id="game-canvas" width="670" height="480"></canvas>
  </div>
`;

let lastTick = performance.now();

function getGlobalCanvas(): HTMLCanvasElement {
  const canvas = document.getElementById("game-canvas")! as HTMLCanvasElement;
  if (!canvas.getContext) {
    throw new Error("No canvas found!");
  }
  const ratio = window.devicePixelRatio;
  canvas.width = 670 * ratio;
  canvas.height = 480 * ratio;
  canvas.style.width = 670 + "px";
  canvas.style.height = 480 + "px";
  canvas.getContext("2d")!.scale(ratio, ratio);
  return canvas;
}

const globalCanvas = getGlobalCanvas();

let model: Model =
{
  currentState: "TITLE",
  score: 0,
  keysPressed: {
    ArrowRight: false,
    ArrowLeft: false,
    ArrowUp: false,
    ArrowDown: false,
  },
}

function update(tFrame = 0) {
  const delta = tFrame - lastTick;
  lastTick = tFrame;
  model = states[model.currentState].update(model, delta)
}

const states: { [key: string]: State } = {
  "TITLE": titleState,
  "PLAY": playState
}

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    // document ready
    console.log("debug")
    states[model.currentState].init(states, model, (new AbortController()));

    (() => {
      function main(tFrame?: number) {
        window.requestAnimationFrame(main);
        update(tFrame); // Call your update method. In our case, we give it rAF's timestamp.
        states[model.currentState].draw(globalCanvas, model)
      }
      main(); // Start the cycle
    })();
  }
};