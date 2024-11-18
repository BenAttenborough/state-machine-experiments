document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>STATE MACHINE</h1>
    <canvas id="game-canvas" width="670" height="480"></canvas>
  </div>
`;

let lastTick = performance.now();
const MyGame = initContext();

function initContext() {
  const canvas = document.getElementById("game-canvas")! as HTMLCanvasElement;
  if (!canvas.getContext) {
    throw new Error("No canvas found!");
  }
  return {
    canvas: canvas,
  }
}

interface Model {
  currentState: StateName;
  lives: number;
  keysPressed: {
    ArrowRight: boolean,
    ArrowLeft: boolean,
    ArrowUp: boolean,
    ArrowDown: boolean,
  }
}

let model: Model =
{
  currentState: "TITLE",
  lives: 0,
  keysPressed: {
    ArrowRight: false,
    ArrowLeft: false,
    ArrowUp: false,
    ArrowDown: false,
  },
}

function transitionState(StateName) {
  states[model.currentState].exit();
  model.currentState = StateName;
  // model.stateChanged = true;
  states[model.currentState].init();
}

function update(tFrame = 0) {
  const delta = tFrame - lastTick;
  lastTick = tFrame;
  model = states[model.currentState].update(model, delta)
}

// const StateTitle = "TITLE"
// const StatePlay = "PLAY"
type StateName = "TITLE" | "PLAY";

class State {
  id: StateName;
  init: () => void; // For adding event listeners
  draw: (canvas: HTMLCanvasElement) => void;
  update: (m: Model, delta: number) => Model;
  exit: () => void;

  constructor(config) {
    this.id = config.id;
    this.init = config.init;
    this.draw = config.draw;
    this.update = config.update;
    this.exit = config.exit;
  }
}

const titleState = new State(
  {
    id: "title",
    init: () => {
      // window.addEventListener("keyup", functionKeyboardKeyup);
      console.log("Changed to title state")
    },
    draw: (canvas) => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#000000";

      ctx.fillText("TITLE STATE", 100, 18);
    },
    update: (m, delta) => {
      return m;
    },
    exit: () => {
      console.log("Exiting title state")
    }
  }
);

const playState = new State(
  {
    id: "play",
    init: () => {
      // window.addEventListener("keyup", functionKeyboardKeyup);
      console.log("Changed to play state")
    },
    draw: (canvas: HTMLCanvasElement) => {
      const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, 50, 50);
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText("PLAY STATE " + model.lives, 100, 18);
    },
    update: (m, delta) => {
      return m;
    },
    exit: () => {
      console.log("Exiting play state")
    }
  }
);

const states: { [key: string]: State } = {
  "TITLE": titleState,
  "PLAY": playState
}

function functionKeyboardKeyup(e) {
  e.preventDefault();
  if (e.code === "ArrowUp") {
    console.log("Arrow up");

    if (model.currentState === "TITLE") {
      transitionState("PLAY");
    } else {
      transitionState("TITLE")
    }
  }
}

function keyboardInput() {
  window.addEventListener("keyup", functionKeyboardKeyup);
}

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    // document ready
    keyboardInput();

    (() => {
      function main(tFrame?: number) {
        // console.log("FF")
        // MyGame.stopMain = window.requestAnimationFrame(main);
        window.requestAnimationFrame(main);

        update(tFrame); // Call your update method. In our case, we give it rAF's timestamp.

        states[model.currentState].draw(MyGame.canvas)
      }

      main(); // Start the cycle
    })();
  }
};