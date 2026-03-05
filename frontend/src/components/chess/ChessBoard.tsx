"use client";

import { useState, useCallback, useEffect } from "react";
import { Chess } from "chess.js";
import type { ValidationResult, GameStatus } from "@/store/chess/useChessStore";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type Square = string;
type Color = "w" | "b";

interface Props {
    position: string;
    activeColor: Color;
    status: GameStatus;
    onMove: (from: Square, to: Square, promotion?: string) => void;
    validationResult: ValidationResult | null;
    orientation?: Color;
    disabled?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1] as const;

const T = "\uFE0E";
const PIECE_GLYPHS: Record<string, string> = {
    K: `♔${T}`, Q: `♕${T}`, R: `♖${T}`, B: `♗${T}`, N: `♘${T}`, P: `♙${T}`,
    k: `♚${T}`, q: `♛${T}`, r: `♜${T}`, b: `♝${T}`, n: `♞${T}`, p: `♟${T}`,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseFen(fen: string): Record<Square, string> {
    const pieces: Record<Square, string> = {};
    const rows = fen.split(" ")[0].split("/");
    rows.forEach((row, rankIdx) => {
        let fileIdx = 0;
        for (const char of row) {
            if (/\d/.test(char)) {
                fileIdx += parseInt(char, 10);
            } else {
                pieces[`${FILES[fileIdx]}${8 - rankIdx}`] = char;
                fileIdx++;
            }
        }
    });
    return pieces;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChessBoard({
    position,
    activeColor,
    status,
    onMove,
    validationResult,
    orientation = "w",
    disabled = false,
}: Props) {
    const [selected, setSelected] = useState<Square | null>(null);
    const [legalSquares, setLegalSquares] = useState<Set<Square>>(new Set());
    const [promotionPending, setPromotionPending] = useState<{ from: Square; to: Square } | null>(null);
    const [isFlashing, setIsFlashing] = useState(false);

    const pieceMap = parseFen(position);
    const files = orientation === "w" ? FILES : [...FILES].reverse();
    const ranks = orientation === "w" ? RANKS : [...RANKS].reverse();

    // Only show turn indicator while game is in progress
    const isGameActive = status === "playing" || status === "check";

    // Flash ring on invalid move
    useEffect(() => {
        if (validationResult && !validationResult.valid) {
            setIsFlashing(true);
            const t = setTimeout(() => setIsFlashing(false), 400);
            return () => clearTimeout(t);
        }
    }, [validationResult]);

    // Clear selection when turn changes
    useEffect(() => {
        setSelected(null);
        setLegalSquares(new Set());
    }, [activeColor]);

    // Compute legal move targets for the selected square
    const getLegalSquares = useCallback((square: Square, fen: string): Set<Square> => {
        try {
            const engine = new Chess(fen);
            const moves = engine.moves({ square: square as any, verbose: true });
            return new Set(moves.map((m: any) => m.to));
        } catch {
            return new Set();
        }
    }, []);

    const handleSquareClick = useCallback(
        (square: Square) => {
            if (disabled || promotionPending) return;

            // Clicking a legal target square — make the move
            if (selected && legalSquares.has(square)) {
                const piece = pieceMap[selected];
                const isPromotion =
                    (piece === "P" && square[1] === "8") ||
                    (piece === "p" && square[1] === "1");

                if (isPromotion) {
                    setPromotionPending({ from: selected, to: square });
                    setSelected(null);
                    setLegalSquares(new Set());
                    return;
                }

                onMove(selected, square);
                setSelected(null);
                setLegalSquares(new Set());
                return;
            }

            // Clicking the already-selected square — deselect
            if (selected === square) {
                setSelected(null);
                setLegalSquares(new Set());
                return;
            }

            // Clicking a new piece — select it and compute legal moves
            if (pieceMap[square]) {
                setSelected(square);
                setLegalSquares(getLegalSquares(square, position));
                return;
            }

            // Clicking empty square with nothing selected — do nothing
            setSelected(null);
            setLegalSquares(new Set());
        },
        [disabled, selected, legalSquares, pieceMap, promotionPending, position, onMove, getLegalSquares]
    );

    const handlePromotion = useCallback(
        (piece: string) => {
            if (!promotionPending) return;
            onMove(promotionPending.from, promotionPending.to, piece);
            setPromotionPending(null);
        },
        [promotionPending, onMove]
    );

    return (
        <div className="relative select-none flex flex-col items-center gap-2">

            {/* Turn indicator — only shown while game is active */}
            {isGameActive ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card">
                    <span
                        className={cn(
                            "w-3 h-3 rounded-full border border-border transition-colors duration-300",
                            activeColor === "w" ? "bg-white" : "bg-zinc-900"
                        )}
                        aria-hidden="true"
                    />
                    <span className="font-roboto text-xs text-muted-foreground">
                        {activeColor === "w" ? "White" : "Black"} to move
                    </span>
                </div>
            ) : (
                <div className="h-8" aria-hidden="true" />
            )}

            {/* File labels — top */}
            <div className="flex pl-5 mb-0.5">
                {files.map((f) => (
                    <span
                        key={f}
                        className="w-14 lg:w-16 xl:w-18 text-center font-mono text-[10px] text-muted-foreground uppercase tracking-widest"
                        aria-hidden="true"
                    >
                        {f}
                    </span>
                ))}
            </div>

            <div className="flex items-stretch">
                {/* Rank labels — left */}
                <div className="flex flex-col justify-around w-5 mr-0.5">
                    {ranks.map((r) => (
                        <span
                            key={r}
                            className="h-14 lg:h-16 xl:h-18 flex items-center justify-center font-mono text-[10px] text-muted-foreground"
                            aria-hidden="true"
                        >
                            {r}
                        </span>
                    ))}
                </div>

                {/* Board grid */}
                <div
                    role="grid"
                    aria-label="Chess board"
                    className={cn(
                        "grid grid-cols-8 shadow-xl transition-all duration-150 rounded-sm overflow-hidden",
                        isFlashing
                            ? "ring-2 ring-destructive ring-offset-2 ring-offset-background"
                            : "ring-1 ring-border"
                    )}
                >
                    {ranks.map((rank) =>
                        files.map((file) => {
                            const square = `${file}${rank}`;
                            const piece = pieceMap[square];
                            const isLight = (FILES.indexOf(file) + rank) % 2 === 0;
                            const isSelected = selected === square;
                            const isLegal = legalSquares.has(square);
                            const isCapture = isLegal && !!piece;
                            const isWhitePiece = piece === piece?.toUpperCase();

                            return (
                                <button
                                    key={square}
                                    role="gridcell"
                                    aria-label={`${square}${piece ? ` ${PIECE_GLYPHS[piece] ?? piece}` : ""}`}
                                    aria-selected={isSelected}
                                    disabled={disabled}
                                    onClick={() => handleSquareClick(square)}
                                    className={cn(
                                        "w-14 h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18 relative flex items-center justify-center transition-[filter,box-shadow] duration-75",
                                        isLight ? "bg-[#aaaaaa]" : "bg-[#1a1a1a]",
                                        isSelected && "brightness-150 shadow-[inset_0_0_0_3px_rgba(255,255,255,0.4)]",
                                        !disabled && !isSelected && "hover:brightness-125",
                                        disabled ? "cursor-default" : "cursor-pointer"
                                    )}
                                >
                                    {/* Legal move dot — empty square */}
                                    {isLegal && !isCapture && (
                                        <span
                                            className="absolute w-[33%] h-[33%] rounded-full bg-white/30 pointer-events-none z-10"
                                            aria-hidden="true"
                                        />
                                    )}

                                    {/* Legal capture ring — occupied square */}
                                    {isCapture && (
                                        <span
                                            className="absolute inset-0 rounded-none ring-inset ring-4 ring-white/40 pointer-events-none z-10"
                                            aria-hidden="true"
                                        />
                                    )}

                                    {piece && (
                                        <span
                                            className={cn(
                                                "text-[2.35rem] lg:text-[2.6rem] xl:text-[2.8rem] leading-none pointer-events-none",
                                                isWhitePiece
                                                    ? "text-white filter-[drop-shadow(0_0_1px_#000)_drop-shadow(0_0_1px_#000)_drop-shadow(0_1px_3px_rgba(0,0,0,0.3))]"
                                                    : "text-black filter-[drop-shadow(0_0_1px_rgba(255,255,255,255))_drop-shadow(0_0_2px_rgba(255,255,255,255))_drop-shadow(0_1px_3px_rgba(0,0,0,0.3))]"
                                            )}
                                            aria-hidden="true"
                                        >
                                            {PIECE_GLYPHS[piece] ?? piece}
                                        </span>
                                    )}
                                </button>
                            );
                        })
                    )}
                </div>

                {/* Rank labels — right */}
                <div className="flex flex-col justify-around w-5 ml-0.5">
                    {ranks.map((r) => (
                        <span
                            key={r}
                            className="h-14 lg:h-16 xl:h-18 flex items-center justify-center font-mono text-[10px] text-muted-foreground"
                            aria-hidden="true"
                        >
                            {r}
                        </span>
                    ))}
                </div>
            </div>

            {/* File labels — bottom */}
            <div className="flex pl-5 mt-0.5">
                {files.map((f) => (
                    <span
                        key={f}
                        className="w-14 lg:w-16 xl:w-18 text-center font-mono text-[10px] text-muted-foreground uppercase tracking-widest"
                        aria-hidden="true"
                    >
                        {f}
                    </span>
                ))}
            </div>

            {/* Promotion picker overlay */}
            {promotionPending && (
                <div
                    role="dialog"
                    aria-label="Choose promotion piece"
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/90 backdrop-blur-sm z-10 rounded-sm"
                >
                    <p className="font-roboto text-xs text-muted-foreground uppercase tracking-widest">
                        Promote to
                    </p>
                    <div className="flex gap-2">
                        {["q", "r", "b", "n"].map((p) => (
                            <button
                                key={p}
                                onClick={() => handlePromotion(p)}
                                aria-label={`Promote to ${p}`}
                                className="w-14 h-14 flex items-center justify-center rounded-md border border-border bg-card text-[2rem] hover:bg-accent hover:border-primary/50 transition-colors cursor-pointer"
                            >
                                {PIECE_GLYPHS[p]}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}