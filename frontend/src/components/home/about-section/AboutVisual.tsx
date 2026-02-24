export default function AboutVisual() {
  return (
    <div className="relative h-125 hidden lg:flex items-center justify-center">
      <div className="content absolute inset-0 bg-linear-to-t from-purple-500/20 to-cyan-400/10 rounded-2xl blur-3xl"></div>
      <div className="relative z-10 grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div
            data-tilt
            data-tilt-reverse
            data-tilt-scale="1.1"
            className="content bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center hover:border-purple-500/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-default"
          >
            <div className="text-6xl mb-2">🎯</div>
            <p className="text-sm font-semibold">Strategic</p>
          </div>
          <div
            data-tilt
            data-tilt-reverse
            data-tilt-scale="1.1"
            className="content bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] cursor-default"
          >
            <div className="text-6xl mb-2">⚙️</div>
            <p className="text-sm font-semibold">Technical</p>
          </div>
        </div>
        <div className="space-y-4 mt-6">
          <div
            data-tilt
            data-tilt-reverse
            data-tilt-scale="1.1"
            className="content bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center hover:border-purple-500/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-default"
          >
            <div className="text-6xl mb-2">🌍</div>
            <p className="text-sm font-semibold">Global</p>
          </div>
          <div
            data-tilt
            data-tilt-reverse
            data-tilt-scale="1.1"
            className="content bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] cursor-default"
          >
            <div className="text-6xl mb-2">💡</div>
            <p className="text-sm font-semibold">Innovative</p>
          </div>
        </div>
      </div>
    </div>
  );
}
