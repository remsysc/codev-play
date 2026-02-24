export default function AboutHeader() {
  return (
    <div className="text-center mb-20">
      <h2 className='about-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-["Outfit"]'>
        About{" "}
        <span className="bg-linear-to-r from-purple-500 to-cyan-400 inline-block text-transparent bg-clip-text">
          Codev Play
        </span>
      </h2>
      <p className='about-title text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-["Roboto"]'>
        A vibrant community where coders play, learn, and build together
      </p>
    </div>
  );
}
