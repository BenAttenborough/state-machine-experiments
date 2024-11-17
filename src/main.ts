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
    stateChanged: true
  }
}

interface Model {
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
  lives: 0,
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
  model = states[playState.id].update(model, delta)

}

class State {
  id: string;
  draw: (canvas: HTMLCanvasElement) => void;
  update: (m: Model, delta: number) => Model;

  constructor(config) {
    this.id = config.id;
    this.draw = config.draw;
    this.update = config.update;
  }
}

const titleState = new State(
  {
    id: "title",
    draw: (canvas) => {
      const ctx = canvas.getContext("2d");
      ctx.fillText("TITLE STATE", 100, 18);
    },
    update: (m, delta) => {
      return m;
    }
  }
);



const playState = new State(
  {
    id: "play",
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
      // console.log("update");

      if (m.keysPressed.ArrowUp) {
        console.log("Up pressed")
        m.lives = m.lives + 1;
      }
      return m;
    }
  }
);

const states: { [key: string]: State } = {
  [titleState.id]: titleState,
  [playState.id]: playState
}

function functionKeyboardKeydown(e) {
  e.preventDefault();
  if (e.code === "ArrowUp") {
    model.keysPressed.ArrowUp = true;
  }
}

function functionKeyboardKeyup(e) {
  e.preventDefault();
  if (e.code === "ArrowUp") {
    model.keysPressed.ArrowUp = false;
  }
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

function saveInput() {
  console.log('Saving data');
}


function keyboardInput() {
  console.log("Only called once?")
  // window.addEventListener("keydown", processInput);
  window.addEventListener("keydown", functionKeyboardKeydown);
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
        // if (MyGame.stateChanged) {
        //   console.log("State change")
        //   states[playState.id].draw(MyGame.canvas)
        // }
        // MyGame.stateChanged = false;
        // console.log("State change")
        states[playState.id].draw(MyGame.canvas)
      }

      main(); // Start the cycle
    })();
  }
};