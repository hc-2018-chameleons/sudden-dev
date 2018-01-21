export const PLAYER_UPDATE = "PLAYER_UPDATE";
export const PLAYER_YOU = "PLAYER_YOU";

export const playerUpdate = (players) => {
  return { type: PLAYER_UPDATE, players: players };
};

export const playerYou = (id) => {
  return { type: PLAYER_YOU, you: id};
};
