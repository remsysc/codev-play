import { FeatureCardProps } from "@/types/home";

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="feature bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className='text-xl font-bold mb-3 font-["Outfit"]'>{title}</h3>
      <p className='text-gray-400 leading-6 font-["Roboto"]'>{description}</p>
    </div>
  );
}
