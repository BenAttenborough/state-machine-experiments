type StateName = "TITLE" | "PLAY";

interface Model {
    currentState: StateName;
    score: number;
    keysPressed: {
        ArrowRight: boolean,
        ArrowLeft: boolean,
        ArrowUp: boolean,
        ArrowDown: boolean,
    }
}

