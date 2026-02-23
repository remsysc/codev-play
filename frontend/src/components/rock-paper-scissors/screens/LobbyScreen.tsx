"use client";

import { useRpsStore } from "@/store/useRpsStore";
import { useEffect } from "react";

export default function LobbyScreen() {
    const { rooms, getRooms, createRoom, joinRoom, reset } = useRpsStore();

    useEffect(() => {
        getRooms();
    }, [getRooms]);

    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-6 bg-[#282357] text-white max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">
                    Online Lobby
                </h1>
            </div>

            <div className="w-full grid grid-cols-1 gap-4">
                <button
                    onClick={() => createRoom()}
                    className="w-full py-4 px-6 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors font-semibold"
                >
                    ➕ Create Room
                </button>
            </div>

            <div className="w-full">
                <h2 className="text-lg font-semibold mb-4">Available Rooms</h2>
                <div className="grid grid-cols-1 gap-3">
                    {rooms.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">
                            No rooms available
                        </p>
                    ) : (
                        rooms.map((room) => (
                            <div
                                key={room.id}
                                className="flex items-center justify-between p-4 rounded-lg bg-[#39327C] border border-purple-500/30"
                            >
                                <div>
                                    <p className="font-semibold">{room.id}</p>
                                    <p className="text-sm text-gray-400">
                                        {room.players}/2 players
                                    </p>
                                </div>
                                <button
                                    onClick={() => joinRoom(room.id)}
                                    disabled={room.players >= 2}
                                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
                                >
                                    {room.players >= 2 ? "Full" : "Join"}
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <button
                onClick={() => reset()}
                className="mt-4 px-6 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
            >
                Back
            </button>
        </main>
    );
}
