import { State, transitionState } from "../State";

export const titleState = new State(
    {
        id: "title",
        init: (states, model, abortEventHandler) => {
            window.addEventListener("keyup", (e) => { titleKeyboardKeyup(states, model, abortEventHandler, e) }, { signal: abortEventHandler.signal });
            console.log("Changed to title state")
        },
        draw: (canvas) => {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "bold 20px sans-serif"
            ctx.fillText("TITLE STATE", 270, 48);
            ctx.fillText("Press spacebar to continue", 195, 400);
        },
        update: (m, delta) => {
            return m;
        },
        exit: (states, model, abortEventHandler) => {
            abortEventHandler.abort();
            console.log("Exiting title state")
        }
    }
);


function titleKeyboardKeyup(states: { [key: string]: State }, model: Model, abortEventHandler: AbortController, e) {
    e.preventDefault();
    if (e.code === "Space") {
        console.log("Space TITLE");
        transitionState("PLAY", states, model, abortEventHandler);
    }
}