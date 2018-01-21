export const START_ROUND = "START_ROUND";
export const TIME_TICK = "TIME_TICK";
export const RESULTS = "RESULTS";

export const startRound = (round) => {
    return { type: START_ROUND,
             round: round
    };
};

export const timeTick = () => {
    return { type: TIME_TICK };
};

export const testResults = (results) => {
    return { type: RESULTS, results: results};
};
