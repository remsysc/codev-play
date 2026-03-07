"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Types

interface Props {
    /**
     * true  = this player received the offer (show Accept / Decline)
     * false = this player sent the offer (show Cancel)
     */
    isRecipient?: boolean;
    onAccept: () => void;
    onDecline: () => void;
}

// Component

export default function DrawOfferModal({
    isRecipient = true,
    onAccept,
    onDecline,
}: Props) {
    const dialogRef = useRef<HTMLDivElement>(null);

    // Trap focus inside modal and close on Escape
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onDecline();
        };
        window.addEventListener("keydown", handleKey);
        dialogRef.current?.focus();
        return () => window.removeEventListener("keydown", handleKey);
    }, [onDecline]);

    return (
        // Backdrop
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            role="presentation"
            onClick={(e) => { if (e.target === e.currentTarget) onDecline(); }}
        >
            {/* Dialog */}
            <div
                ref={dialogRef}
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="draw-title"
                aria-describedby="draw-desc"
                tabIndex={-1}
                className="w-full max-w-sm mx-4 rounded-lg border border-border bg-card p-6 shadow-xl outline-none"
            >
                <h2 id="draw-title" className="font-outfit text-lg font-semibold mb-1">
                    {isRecipient ? "Draw Offered" : "Draw Offer Sent"}
                </h2>
                <p id="draw-desc" className="font-roboto text-sm text-muted-foreground mb-6">
                    {isRecipient
                        ? "Your opponent has offered a draw. Do you want to accept?"
                        : "Waiting for your opponent to respond to your draw offer."}
                </p>

                <div className="flex justify-end gap-2">
                    {isRecipient ? (
                        <>
                            <Button variant="outline" className="font-roboto" onClick={onDecline}>
                                Decline
                            </Button>
                            <Button className="font-roboto" onClick={onAccept}>
                                Accept Draw
                            </Button>
                        </>
                    ) : (
                        <Button variant="outline" className="font-roboto" onClick={onDecline}>
                            Cancel Offer
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}