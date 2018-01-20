export const START_ROUND = "START_ROUND";

export const startRound = (round) => {
    return { type: START_ROUND,
             round: round
    };
};
