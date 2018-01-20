export const PLAYER_ADD = "PLAYER_ADD";
export const PLAYER_REMOVE = "PLAYER_REMOVE";

export const playerAdd = (player) => {
  return { type: PLAYER_ADD, player: player };
};

export const playerRemove = (player) => {
  return { type: PLAYER_REMOVE, player: player };
};
