import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MovieData } from "../App";
import { SquareArrowOutUpRightIcon, Star } from "lucide-react";
import { generateShareUrl } from "../utils/shareUtils";

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
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(
                      movie.title + " movie watch now"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block hover:opacity-80 transition-opacity"
                  >
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      {movie.title}{" "}
                      <SquareArrowOutUpRightIcon className="inline-block w-4 h-4" />
                    </h2>
                  </a>

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

                <p className="h-[120px] overflow-auto text-gray-300 leading-relaxed text-sm sm:text-base">
                  {movie.overview}
                </p>
                <p className="text-red-500 text-[10px] italic">
                  AI-generated results may not always be accurate.
                </p>

                <div className="pt-2 w-full space-y-4">
                  <motion.button
                    onClick={async () => {
                      const shareUrl = await generateShareUrl(movie);
                      if (navigator.share) {
                        try {
                          await navigator.share({
                            title: `Movíname: ${movie.title}`,
                            text: `Found it! The movie is ${movie.title}. Identify any movie from a clip for free here:`,
                            url: shareUrl,
                          });
                        } catch (err) {
                          console.log("Share cancelled or failed", err);
                        }
                      } else {
                        // Fallback: Copy to clipboard
                        navigator.clipboard.writeText(shareUrl);
                        alert("Link copied to clipboard!");
                      }
                    }}
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg shadow-red-500/25"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                    Share Result
                  </motion.button>

                  <div className="flex items-center justify-center gap-6 pt-2">
                    {[
                      {
                        name: "Twitter",
                        icon: (
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        ),
                        action: (url: string) =>
                          window.open(
                            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                              url
                            )}&text=${encodeURIComponent(
                              `Found it! The movie is ${movie.title}. Identify any movie from a clip for free here:`
                            )}`,
                            "_blank"
                          ),
                      },
                      {
                        name: "Facebook",
                        icon: (
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        ),
                        action: (url: string) =>
                          window.open(
                            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                              url
                            )}`,
                            "_blank"
                          ),
                      },
                      {
                        name: "Instagram",
                        icon: (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <rect
                              x="2"
                              y="2"
                              width="20"
                              height="20"
                              rx="5"
                              ry="5"
                            />
                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                          </svg>
                        ),
                        action: async (url: string) => {
                          if (navigator.share) {
                            try {
                              await navigator.share({
                                title: movie.title,
                                text: `Found it! The movie is ${movie.title}. Identify any movie from a clip for free here:`,
                                url: url,
                              });
                            } catch (e) {
                              navigator.clipboard.writeText(url);
                              alert(
                                "Link copied! Paste it in your Instagram Stories or Bio."
                              );
                            }
                          } else {
                            navigator.clipboard.writeText(url);
                            alert(
                              "Instagram doesn't support direct links. Link copied to clipboard - paste it in your stories!"
                            );
                          }
                        },
                      },
                      {
                        name: "TikTok",
                        icon: (
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.65-1.58-1.02v4.95c.06 4.91-2.26 9.17-6.06 10.45-3.05 1.02-6.42.36-9.08-1.56-2.65-1.92-3.8-5.32-2.9-8.49.9-3.17 3.51-5.63 6.69-6.31.85-.18 1.73-.24 2.6-.14v4.2c-1.11-.2-2.31-.07-3.29.5-.98.57-1.63 1.54-1.74 2.67-.11 1.14.36 2.22 1.25 2.95.89.73 2.11.95 3.2.59 1.09-.36 1.95-1.25 2.24-2.37.15-.56.17-1.15.15-1.72V.02h-.16z" />
                          </svg>
                        ),
                        action: async (url: string) => {
                          // TikTok doesn't have a direct share URL scheme for web.
                          // Best fallback is copying link with instructions.
                          if (navigator.share) {
                            try {
                              await navigator.share({
                                title: movie.title,
                                text: `Found it! The movie is ${movie.title}. Identify any movie from a clip for free here:`,
                                url: url,
                              });
                            } catch (e) {
                              navigator.clipboard.writeText(url);
                              alert(
                                "Link copied! Open TikTok and paste it in your bio or message."
                              );
                            }
                          } else {
                            navigator.clipboard.writeText(url);
                            alert(
                              "Link copied! Open TikTok and paste it in your bio or message."
                            );
                          }
                        },
                      },
                      {
                        name: "WhatsApp",
                        icon: (
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.445 0 .081 5.363.079 11.969c0 2.112.551 4.17 1.597 6.01L0 24l6.193-1.623c1.777.969 3.79 1.481 5.851 1.481h.004c6.605 0 11.97-5.364 11.972-11.971a11.817 11.817 0 00-3.505-8.468z" />
                          </svg>
                        ),
                        action: (url: string) =>
                          window.open(
                            `https://api.whatsapp.com/send?text=${encodeURIComponent(
                              `Found it! The movie is ${movie.title}. Identify any movie from a clip for free here: ${url}`
                            )}`,
                            "_blank"
                          ),
                      },
                    ].map((platform, i) => (
                      <motion.a
                        key={platform.name}
                        href="#"
                        onClick={async (e) => {
                          e.preventDefault();
                          const shareUrl = await generateShareUrl(movie);
                          platform.action(shareUrl);
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        whileHover={{ scale: 1.2, color: "#ef4444" }}
                        className="text-gray-400 transition-colors"
                        aria-label={`Share on ${platform.name}`}
                      >
                        {platform.icon}
                      </motion.a>
                    ))}
                  </div>
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
