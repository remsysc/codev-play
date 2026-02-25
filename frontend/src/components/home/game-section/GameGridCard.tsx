import Image from "next/image";
import { GameGridCardProps } from "@/types/home";

export default function GameGridCard({ name, image }: GameGridCardProps) {
  return (
    <div className="game-card rounded-xl border border-white/10 bg-white/10 p-4 hover:border-purple-500/50 hover:bg-white/5 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          data-tilt
          data-tilt-reverse
          data-tilt-scale="1.1"
          src={image}
          alt={name}
          width={500}
          height={500}
          className="object-cover"
        />
      </div>
      <h3 className="mt-3 text-base font-bold">{name}</h3>
    </div>
  );
}
