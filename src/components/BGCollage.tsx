import { motion } from "framer-motion";
import { MoviePoster } from "./loader/MoviePoster";

const BGCollage = () => {
  return (
    <>
      {/* Movie Collage Background - Persistent - Added background collage */}
      <div className="fixed inset-0 opacity-15 z-0 overflow-hidden">
        <MoviePoster
          className="w-20 h-32 top-20 left-12 text-green-400"
          title="THUNDERBOLTS*"
          colors="linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
          delay={0}
        />
        <MoviePoster
          className="w-24 h-36 top-24 right-16 text-white"
          title="LILO & STITCH"
          colors="linear-gradient(135deg, #ff6b9d 0%, #4ecdc4 50%, #45b7d1 100%)"
          delay={1}
        />
        <MoviePoster
          className="w-18 h-28 bottom-16 left-20 text-green-900"
          title="MINECRAFT"
          colors="linear-gradient(135deg, #228b22 0%, #32cd32 50%, #90ee90 100%)"
          delay={2}
        />
        <MoviePoster
          className="w-22 h-32 bottom-20 right-10 text-cyan-400"
          title="TRON: ARES"
          colors="linear-gradient(135deg, #000000 0%, #ff4500 50%, #000000 100%)"
          borderColor="#ff4500"
          delay={3}
        />
        <MoviePoster
          className="w-19 h-28 top-1/2 left-5 text-red-800"
          title="SNOW WHITE"
          colors="linear-gradient(135deg, #8b0000 0%, #ff1493 50%, #ffffff 100%)"
          delay={4}
        />
        <MoviePoster
          className="w-16 h-24 top-1/3 right-5 text-white"
          title="ZOOTOPIA 2"
          colors="linear-gradient(135deg, #ff8c00 0%, #32cd32 50%, #1e90ff 100%)"
          delay={5}
        />
      </div>

      {/* Sliding film strips - Added film strip animations */}
      <motion.div
        className="fixed top-1/5 w-48 h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-30 z-1"
        animate={{
          x: [
            -200,
            typeof window !== "undefined" ? window.innerWidth + 200 : 800,
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="fixed bottom-1/4 w-32 h-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-20 z-1"
        animate={{
          x: [
            typeof window !== "undefined" ? window.innerWidth + 100 : 900,
            -200,
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
          delay: 4,
        }}
      />

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
    </>
  );
};

export default BGCollage;
