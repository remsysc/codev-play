"use client";

import { useRpsStore } from "@/store/useRpsStore";
import ChoiceSection from "@/components/rock-paper-scissors/game/ChoiceSection";
import ResultDisplay from "@/components/rock-paper-scissors/game/ResultDisplay";
import ScoreBoard from "@/components/rock-paper-scissors/game/ScoreBoard";

export default function GameScreen() {
    const game = useRpsStore();

    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-6 bg-[#282357] text-white">
            <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">
                    Rock Paper Scissors
                </h1>
                <span className="text-xs text-purple-400 border border-purple-500/40 rounded-full px-2 py-0.5">
                    {game.mode === "online" ? "🌐 Online" : "🤖 vs CPU"}
                </span>
            </div>

            <ChoiceSection
                phase={game.phase}
                playerChoice={game.playerChoice}
                onChoice={game.submitChoice}
            />

            <ResultDisplay
                phase={game.phase}
                currentRound={game.currentRound}
                winnerId={game.winnerId}
                onNextRound={game.nextRound}
                onReset={game.reset}
                bestOf={game.bestOf}
                mode={game.mode}
            />

            <ScoreBoard
                score={game.score}
                history={game.history}
                mode={game.mode}
                winsNeeded={game.winsNeeded}
                bestOf={game.bestOf}
                onReset={game.reset}
            />
        </main>
    );
}
