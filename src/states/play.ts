import { State, transitionState } from "../State";

export const playState = new State(
    {
        id: "play",
        init: (states, model) => {
            window.addEventListener("keyup", (e) => { playKeyboardKeyup(states, model, e) });
            console.log("Changed to play state")
        },
        draw: (canvas: HTMLCanvasElement, model: Model) => {
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
        exit: (states, model) => {
            window.removeEventListener("keyup", (e) => { playKeyboardKeyup(states, model, e) });
            console.log("Exiting play state")
        }
    }
);

function playKeyboardKeyup(states: { [key: string]: State }, model: Model, e) {
    e.preventDefault();
    if (e.code === "ArrowUp") {
        console.log("Arrow up PLAY");

        if (model.currentState === "TITLE") {
            transitionState("PLAY", states, model);
        } else {
            transitionState("TITLE", states, model)
        }
    }
}