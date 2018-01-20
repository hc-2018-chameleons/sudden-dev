export const START_ROUND = "START_ROUND";
export const NEXT_PLAYER = "NEXT_PLAYER";

export const startRound = (round) => {
    return { type: START_ROUND,
             round: round
    };
};

export const nextPlayer = () => {
    return { type: NEXT_PLAYER };
};
