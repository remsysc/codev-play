import { Server, Socket } from "socket.io";
import { RoomManager } from "../../utils/RoomManager";
import { TicTacToeService } from "../../services/tictactoaGame.service";
import { ticTacToeModel } from "../../models/tictactoe.model";
import logger from "../../utils/logger";

const tttService = new TicTacToeService(new ticTacToeModel());

export function registerGameEvents(io: Server, socket: Socket, roomManager: RoomManager, userSocketMap: Map<string, string>) {
  
  socket.on("game:join", (data: { gameId: string }) => {
    try {
      const playerRoom = roomManager.getPlayerRoom(socket.id);
      if (!playerRoom) {
        socket.emit("game:error", { message: "You must be in a room to join a game" });
        return;
      }

      // Set the gameId for the room
      roomManager.setGameId(playerRoom.id, data.gameId);
      
      // Join the game-specific socket room
      socket.join(`game:${data.gameId}`);
      
      socket.emit("game:joined", {
        success: true,
        gameId: data.gameId,
        roomId: playerRoom.id,
      });

      logger.info(`User ${socket.id} joined game ${data.gameId} in room ${playerRoom.id}`);
    } catch (err) {
      logger.error("Error joining game", { error: err });
      socket.emit("game:error", { message: "Failed to join game" });
    }
  });

  socket.on("game:move", async (data: { gameId: string; row: number; col: number }) => {
    try {
      const playerRoom = roomManager.getPlayerRoom(socket.id);
      if (!playerRoom) {
        socket.emit("game:error", { message: "You must be in a room to make a move" });
        return;
      }

      // Get user ID from socket map
      let userId = null;
      for (const [uid, sid] of userSocketMap.entries()) {
        if (sid === socket.id) {
          userId = uid;
          break;
        }
      }

      if (!userId) {
        socket.emit("game:error", { message: "User not authenticated" });
        return;
      }

      // Make the move through the game service
      const game = await tttService.playMove(data.gameId, parseInt(userId), data.row, data.col);
      
      // Update room game state
      roomManager.setGameState(playerRoom.id, game);

      // Broadcast the move to all players in the game room
      io.to(`game:${data.gameId}`).emit("game:move", {
        gameId: data.gameId,
        move: { row: data.row, col: data.col },
        game: game,
        playerId: socket.id,
      });

      logger.info(`User ${socket.id} made move ${data.row},${data.col} in game ${data.gameId}`);
    } catch (err) {
      logger.error("Error making move", { error: err });
      socket.emit("game:error", { message: "Failed to make move" });
    }
  });
}
