type StateName = "TITLE" | "PLAY";

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

