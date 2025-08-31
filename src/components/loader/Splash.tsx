import { motion } from 'framer-motion'
import { MoviePoster } from './MoviePoster'

export const Splash = () => {
  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-2xl h-96 flex justify-center items-center">
          {/* Movie Collage Background */}
          <div className="absolute inset-0 opacity-15 overflow-hidden">
            <MoviePoster
              className="w-20 h-32 top-5 left-12 text-green-400"
              title="THUNDERBOLTS*"
              colors="linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
              delay={0}
            />
            <MoviePoster
              className="w-24 h-36 top-20 right-16 text-white"
              title="LILO & STITCH"
              colors="linear-gradient(135deg, #ff6b9d 0%, #4ecdc4 50%, #45b7d1 100%)"
              delay={1}
            />
            <MoviePoster
              className="w-18 h-28 bottom-10 left-20 text-green-900"
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
          
          {/* Sliding film strip */}
          <motion.div
            className="absolute top-1/5 w-48 h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-30"
            animate={{ x: [-200, 600] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Main Logo */}
          <div className="relative z-10 text-center">
            <motion.h1 
              className="text-6xl sm:text-8xl font-extrabold bg-gradient-to-br from-white via-gray-200 to-white bg-clip-text text-transparent mb-4 tracking-tight"
              animate={{ 
                filter: [
                  "drop-shadow(0 0 20px rgba(255,255,255,0.1))",
                  "drop-shadow(0 0 40px rgba(255,255,255,0.2)) drop-shadow(0 0 60px rgba(255,255,255,0.1))",
                  "drop-shadow(0 0 20px rgba(255,255,255,0.1))"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              movíname
              <motion.span
                className="inline-block w-3 h-3 bg-red-500 rounded-full ml-3"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.h1>
            <p className="text-xl font-light text-gray-500 uppercase tracking-widest">
              Discover Cinema
            </p>
          </div>
        </div>
      </div>
  )
}
