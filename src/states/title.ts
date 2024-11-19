import { State, transitionState } from "../State";

export const titleState = new State(
    {
        id: "title",
        init: (states, model) => {
            window.addEventListener("keyup", (e) => { titleKeyboardKeyup(states, model, e) });
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
        exit: (states, model) => {
            window.removeEventListener("keyup", (e) => { titleKeyboardKeyup(states, model, e) });
            console.log("Exiting title state")
        }
    }
);


function titleKeyboardKeyup(states: { [key: string]: State }, model: Model, e) {
    e.preventDefault();
    if (e.code === "ArrowUp") {
        console.log("Arrow up TITLE");

        if (model.currentState === "TITLE") {
            transitionState("PLAY", states, model);
        } else {
            transitionState("TITLE", states, model)
        }
    }
}