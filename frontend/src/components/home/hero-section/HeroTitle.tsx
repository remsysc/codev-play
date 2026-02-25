import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HeroTitle() {
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col justify-center">
      <h1 className='hero-title opacity-0 translate-y-12.5 text-4xl md:text-5xl lg:text-7xl font-bold font-["Outfit"] mb-6 leading-[0.9] max-w-2xl'>
        UNLOCK ENDLESS FUN FILLED WITH{" "}
        <span className="whitespace-nowrap bg-linear-to-r from-purple-500  to-cyan-400 inline-block text-transparent bg-clip-text hover:text-shadow-[0_0_25px_rgba(99,102,241,0.6)] cursor-default duration-300">
          CODEV PLAY
        </span>
      </h1>
      <p className='hero-title opacity-0 translate-y-12.5 text-lg md:text-xl text-gray-300 leading-6 mb-8 max-w-lg font-["Roboto"]'>
        Where Codev hangout and play — a friendly space to experiment, learn,
        and build together.
      </p>
      <div className="hero-title opacity-0 translate-y-12.5 flex gap-4">
        <Button
          onClick={() => router.push("/login?view=register")}
          className="px-8 py-3 text-lg cursor-pointer bg-linear-to-r hover:text-white hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]"
        >
          Get Started
        </Button>
        <Button
          variant="outline"
          className="px-8 py-3 text-lg text-white border-white hover:bg-white/10 cursor-pointer"
        >
          Learn More
        </Button>
      </div>
    </div>
  );
}
