"use client";

import { useRpsStore } from "@/store/useRpsStore";

export default function RoomScreen() {
    const { roomId, isHost, startMatch, leaveRoom } = useRpsStore();

    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-6 bg-[#282357] text-white">
            <h1 className="text-3xl font-bold tracking-tight">Room</h1>
            <div className="text-center">
                <p className="text-lg font-semibold">Room ID: {roomId}</p>
                <p className="text-gray-400 mt-2">
                    {isHost
                        ? "Waiting for opponent to join..."
                        : "Waiting for host to start game..."}
                </p>
            </div>

            {isHost && (
                <button
                    onClick={() => startMatch()}
                    className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 transition-colors font-semibold"
                >
                    Start Game
                </button>
            )}

            <button
                onClick={() => leaveRoom()}
                className="px-6 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
            >
                Leave Room
            </button>
        </main>
    );
}
