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
  const ctx = canvas.getContext("2d");
  return {
    ctx: ctx!,
    stateChanged: true
  }
}

function draw() {
  const canvas = document.getElementById("game-canvas")! as HTMLCanvasElement;
  MyGame.ctx.clearRect(0, 0, canvas.width, canvas.height);
  MyGame.ctx.fillStyle = "#000000";
  MyGame.ctx.fillRect(0, 0, canvas.width, canvas.height);
  MyGame.ctx.fillStyle = "#FFFFFF";
  MyGame.ctx.fillText("MAIN MENU" , 100, 18);

}

function update(tFrame = 0) {
  const delta = tFrame - lastTick;
  lastTick = tFrame;
  // handleKeyboardInput(MyGame, delta);
}

class State {
  draw: (CanvasRenderingContext2D) => void;

  constructor(draw) {
    this.draw = draw;
  }
}

const STATE_TITLE = "title"
const STATE_PLAY = "play"

const titleState = new State(
  (canvas) => {
    canvas.fillText("TITLE STATE" , 100, 18);
  }
);

const playState = new State(
  (canvas) => {
    // canvas.clearRect(0, 0, canvas.width, canvas.height);
    canvas.fillStyle = "#000000";
    canvas.fillRect(0, 0, 50, 50);
    canvas.fillRect(0, 0, canvas.width, canvas.height);
    // canvas.fillStyle = "#FFFFFF";
    canvas.fillText("MAIN MENU" , 100, 18);
  }
);

const states : { [key: string]: State} = {
  [STATE_TITLE]: titleState,
  [STATE_PLAY]: playState
}

document.onreadystatechange = () => {
    if (document.readyState === "complete") {
      // document ready
      // keyboardInput();
  
      (() => {
        function main(tFrame?: number) {
          // MyGame.stopMain = window.requestAnimationFrame(main);
  
          update(tFrame); // Call your update method. In our case, we give it rAF's timestamp.
          if (MyGame.stateChanged) {
            console.log("State change")
            // draw();
            states[STATE_PLAY].draw(MyGame.ctx)
          }
          MyGame.stateChanged = false;
        }
  
        main(); // Start the cycle
      })();
    }
  };