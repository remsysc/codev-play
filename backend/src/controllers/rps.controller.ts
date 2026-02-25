import { Request, Response } from "express";
import { getIO } from "../config/socket-server";
import { RockPaperScissorsService } from "../services/rpsGame.service";
import { roomManager, userSocketMap } from "../config/socket-server";
import { RPSModel } from "../models/rps.model";
import { RPSType } from "../utils/rps.logic";
import { GameController } from "./game.controller";

const rpsService = new RockPaperScissorsService(new RPSModel());
type ChoiceBody = { player: string; choice: RPSType };

export class RPSController extends GameController<RockPaperScissorsService> {
  constructor(service: RockPaperScissorsService) {
    super(service);
  }

  async makeMoveController(
    req: Request<{ gameId: string }, any, ChoiceBody>,
    res: Response,
  ) {
    try {
      const { choice } = req.body;

      const userId = req.user?.id ? Number(req.user.id) : null;
      const game = await this.service.playMove(
        req.params.gameId,
        userId,
        choice,
      );
      res.json(game);
    } catch (err) {
      const error = err as Error;
      res.status(400).json({ error: error.message || "Invalid move" });
    }
  }
}

/*export const createGameController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const Id = Number(req.user.id);
    if (Id == null) {
      throw new Error("User ID cannot be null.");
    }

    const gameData = req.body.gameData;
    const game = await rpsService.startGame(gameData, Id);

    res.status(201).json(game);
  } catch (err) {
    const error = err as Error;

    res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
};

export const joinGameController = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const gameId = String(req.params!.gameId);

    const game = await rpsService.joinGame(gameId, userId);
    console.log(game);

    const socketId = userSocketMap.get(String(userId));
    console.log(socketId);

    const playerRoom = socketId ? roomManager.getPlayerRoom(socketId) : null;
    console.log(playerRoom);

    if (!playerRoom) {
      res.status(404).json({ error: "User has not joined a room!" });
      return;
    }

    const playerRoomId = playerRoom?.id;
    getIO().to(playerRoomId).emit("rps:join", game);

    res.json(game);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};

export const getGameController = async (
  req: Request<{ gameId: string }>,
  res: Response,
): Promise<void> => {
  try {
    const game = await rpsService.fetchGame(req.params.gameId);
    res.json(game);
  } catch (err) {
    const error = err as Error;
    res.status(404).json({ error: error.message || "Game not found" });
  }
};

type ChoiceBody = { player: string; choice: RPSType };
export const makeMoveController = async (
  req: Request<{ gameId: string }, any, ChoiceBody>,
  res: Response,
): Promise<void> => {
  try {
    const { choice } = req.body;

    const userId = req.user?.id ? Number(req.user.id) : null;
    const game = await rpsService.playMove(req.params.gameId, userId, choice);

    const socketId = userSocketMap.get(String(userId));
    const playerRoom = socketId ? roomManager.getPlayerRoom(socketId) : null;

    if (!playerRoom) {
      res.status(404).json({ error: "User has not joined a room!" });
      return;
    }

    const playerRoomId = playerRoom?.id;
    getIO().to(playerRoomId).emit("rps:update", game);

    res.json(game);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message || "Invalid move" });
  }
};

export const resetGameController = async (
  req: Request<{ gameId: string }>,
  res: Response,
): Promise<void> => {
  try {
    const game = await rpsService.resetExistingGame(req.params.gameId);

    const userId = String(game.player_x);
    const socketId = userSocketMap.get(userId);
    const room = socketId ? roomManager.getPlayerRoom(socketId) : null;
    if (room) {
      getIO().to(room.id).emit("rps:reset", game);
    } else {
      res.status(404).json({ error: "User has not joined a room!" });
      return;
    }

    res.json(game);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message || "Failed to reset game" });
  }
};

export const listActiveGamesController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const games = await rpsService.listActiveGames();
    res.json(games);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};*/
