export type Position = { x: number; y: number };

export enum GameStatus {
  PLAYING = "PLAYING",
  GAMEOVER = "GAMEOVER",
  FINISHED = "FINISHED",
}

export enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}
