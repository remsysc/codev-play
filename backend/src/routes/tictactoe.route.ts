import { Router } from "express";
import {
  createGameController,
  getGameController,
  makeMoveController,
  resetGameController,
  listActiveGamesController,
  joinGameController,
} from "@/controllers/tictactoe.controller";
import { auth } from "@/middleware/auth.middleware";

const router = Router();

router.post("/create", auth, createGameController);
router.get("/active", auth, listActiveGamesController);
router.get("/:gameId", auth, getGameController);
router.post("/:gameId/join", auth, joinGameController);
router.post("/:gameId/move", auth, makeMoveController);
router.post("/:gameId/reset", auth, resetGameController);

export default router;
