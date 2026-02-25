import { Button } from "@/components/ui/button";

export default function AboutCTA() {
  return (
    <div className="text-center">
      <h3 className='CTA text-3xl font-bold mb-6 font-["Outfit"]'>
        Ready to Join the Fun?
      </h3>
      <p className='CTA text-gray-400 mb-8 text-lg max-w-2xl mx-auto font-["Roboto"]'>
        Start playing today and become part of a thriving community of
        developers and gamers.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button className="CTA px-8 py-3 text-lg cursor-pointer bg-linear-to-r hover:text-white hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]">
          Join Now
        </Button>
        <Button
          variant="outline"
          className="CTA px-8 py-3 text-lg text-white border-white hover:bg-white/10 cursor-pointer"
        >
          Explore Games
        </Button>
      </div>
    </div>
  );
}
