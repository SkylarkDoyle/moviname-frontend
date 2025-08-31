import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MovieData } from "../App";
import { Star } from "lucide-react";

const MovieResult = ({
  movie,
  setMovie,
}: {
  movie: MovieData | null;
  setMovie: React.Dispatch<React.SetStateAction<MovieData | null>>;
}) => {
  return (
    <AnimatePresence>
      {movie && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-800/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex flex-col sm:flex-row">
              {/* Poster */}
              <div className="sm:w-1/3 relative">
                <img
                  src={movie.poster_url}
                  alt={`${movie.title} poster`}
                  className="w-full h-64 sm:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent sm:hidden"></div>
              </div>

              {/* Content */}
              <div className="sm:w-2/3 p-6 sm:p-8 space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    {movie.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="text-gray-400">
                      {new Date(movie.release_date).getFullYear()}
                    </span>

                    {movie.vote_average && (
                      <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-full">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-yellow-400 font-medium">
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="h-[80px] overflow-auto text-gray-300 leading-relaxed text-sm sm:text-base">
                  {movie.overview}
                </p>

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-all duration-200 border border-white/20"
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setMovie(null)}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors z-10"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MovieResult;
