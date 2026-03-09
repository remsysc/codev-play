import { Request, Response } from "express";
import { RockPaperScissorsService } from "@/services/rps/rps.service";
import { RPSType } from "@/types/rps.types";
import { GameController } from "./game.controller";

type ChoiceBody = { player: string; choice: RPSType };

export class RPSController extends GameController<RockPaperScissorsService> {
  constructor(service: RockPaperScissorsService) {
    super(service);
  }

  async makeChoiceController(
    req: Request<{ gameId: string }, any, ChoiceBody>,
    res: Response,
  ) {
    try {
      const { choice } = req.body;

      const userId = req.user?.id ? Number(req.user.id) : null;
      if (userId === null) {
        return res.status(400).json({ error: "User not found" });
      }

      const game = await this.service.playMove(
        req.params.gameId,
        userId,
        choice,
      );
      console.log(game);
      res.json(game);
    } catch (err) {
      const error = err as Error;
      res.status(400).json({ error: error.message || "Invalid move" });
    }
  }

  async getHistoryController(req: Request<{ gameId: string }>, res: Response) {
    try {
      return res.json({
        history: [],
        message: "Round History not yet implemented",
      });
    } catch (err) {
      const error = err as Error;
      res
        .status(500)
        .json({ error: error.message || "Failed to fetch history" });
    }
  }
}
