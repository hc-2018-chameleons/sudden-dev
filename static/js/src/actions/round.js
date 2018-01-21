export const START_ROUND = "START_ROUND";
export const TIME_TICK = "TIME_TICK";
export const END_ROUND = "END_ROUND";

export const startRound = (round) => {
    return { type: START_ROUND,
             round: round
    };
};

export const startRound = (round) => {
    return { type: START_ROUND,
             round: round
    };
};

export const timeTick = () => {
    return { type: TIME_TICK };
};
