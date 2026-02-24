import { Server, Socket } from "socket.io";
import { RoomManager } from "../../utils/RoomManager";
import logger from "../../utils/logger";

export function registerDisconnectEvents(io: Server, socket: Socket, roomManager: RoomManager) {
  
  socket.on("disconnect", (reason) => {
    logger.info(`User ${socket.id} disconnected`, { reason });

    // Find and leave any room the player was in
    const playerRoom = roomManager.getPlayerRoom(socket.id);
    if (playerRoom) {
      roomManager.leaveRoom(playerRoom.id, socket.id);

      // Notify others in the room
      socket.to(playerRoom.id).emit("player:left", {
        playerId: socket.id,
        room: roomManager.getRoomInfo(playerRoom.id),
      });

      // Broadcast updated room list
      io.emit("rooms:list", roomManager.listRooms());
    }
  });

  socket.on("error", (err) => {
    logger.error("Socket Error", { error: err });
  });
}
