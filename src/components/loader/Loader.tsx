import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = ({
  loading,
  loadingTime,
}: {
  loading: boolean;
  loadingTime: number;
}) => {
  // Movie trivia facts for loading screen
  const triviaFacts = [
    "The average movie takes about 106 days to film?",
    "The first movie theater opened in 1905 in Pittsburgh?",
    "Alfred Hitchcock never won an Oscar for Best Director?",
    "The Wilhelm Scream has been used in over 400 films?",
    "The longest movie ever made is 87 hours long?",
    "Charlie Chaplin once lost a Charlie Chaplin look-alike contest?",
    "The movie 'Titanic' cost more to make than the actual Titanic?",
    "Walt Disney was afraid of mice despite creating Mickey Mouse?",
    "The code in 'The Matrix' is actually sushi recipes?",
    "Steven Spielberg was rejected from film school three times?",
    "The first film sequel was made in 1916?",
    "Movie theaters make most of their profit from concessions?",
    "The loudest sound in cinema history was in 'Interstellar'?",
    "Tom Hanks' brother voiced Woody in the Toy Story video games?",
  ];

  const [currentTrivia, setCurrentTrivia] = useState("");

  const getRandomTrivia = () => {
    const randomIndex = Math.floor(Math.random() * triviaFacts.length);
    return triviaFacts[randomIndex];
  };

  // Add this useEffect after the state declarations
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (loading) {
      // Set initial trivia
      setCurrentTrivia(getRandomTrivia());
      // Rotate trivia every 3 seconds while loading
      interval = setInterval(() => {
        setCurrentTrivia(getRandomTrivia());
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading]);
  return (
    <AnimatePresence>
      {loading && (
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
            className="bg-gray-800/90 backdrop-blur-md rounded-3xl p-8 max-w-md w-full space-y-8 border border-gray-700/50"
          >
            {/* Do you know section */}
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                <span className="text-2xl">🎬</span>
                Do you know?
              </h3>
              <motion.p
                key={currentTrivia}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-300 leading-relaxed text-sm"
              >
                {currentTrivia}
              </motion.p>
            </div>

            {/* Loader section */}
            <div className="text-center space-y-4">
              <div className="relative mx-auto w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
                <div className="absolute inset-0 rounded-full border-4 border-red-500 border-t-transparent animate-spin"></div>
                <div
                  className="absolute inset-2 rounded-full border-2 border-red-400 border-b-transparent animate-spin"
                  style={{
                    animationDirection: "reverse",
                    animationDuration: "0.75s",
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {loadingTime}s
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-lg font-medium text-gray-300">
                   Searching the reel for answers...
                </p>
                <p className="text-sm text-gray-500">
                  This may take a few moments
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
