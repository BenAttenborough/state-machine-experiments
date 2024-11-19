

export class State {
    id: StateName;
    init: (states: { [key: string]: State }, model: Model) => void; // For adding event listeners
    draw: (canvas: HTMLCanvasElement, model: Model) => void;
    update: (m: Model, delta: number) => Model;
    exit: (states: { [key: string]: State }, model: Model) => void;

    constructor(config) {
        this.id = config.id;
        this.init = config.init;
        this.draw = config.draw;
        this.update = config.update;
        this.exit = config.exit;
    }
}

export function transitionState(stateName: StateName, states: { [key: string]: State }, model: Model) {
    states[model.currentState].exit(states, model);
    model.currentState = stateName;
    states[model.currentState].init(states, model);
}