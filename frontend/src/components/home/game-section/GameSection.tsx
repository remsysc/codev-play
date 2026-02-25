"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import GameGridCard from "./GameGridCard";
import { gameImages } from "@/data/gameImage";

export default function GameSection() {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#game",
        start: "top 60%",
      },
    });

    tl.fromTo(
      ".game-card",
      { scale: 0.8, opacity: 0, filter: "blur(10px)" },
      {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power4.inOut",
        delay: 0.3,
        stagger: 0.2,
      },
      "-=0.75",
    );
  }, []);

  return (
    <section
      id="game"
      className="mx-auto max-w-6xl px-8 pt-28 pb-20 text-center font-['Outfit']"
    >
      <h3 className="mb-10 text-4xl font-bold tracking-tight text-white">
        Available Game
      </h3>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-3">
        {gameImages.map((game) => (
          <Link key={game.id} href={`/preview/${game.name.toLowerCase()}`}>
            <GameGridCard name={game.name} image={game.src} />
          </Link>
        ))}
      </div>
    </section>
  );
}
