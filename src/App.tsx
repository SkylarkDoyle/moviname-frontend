import { useEffect, useState, type ChangeEvent, type DragEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Film, Star } from "lucide-react";
import axios from "axios";

interface MovieData {
  poster_url: string;
  title: string;
  release_date: string;
  overview: string;
  vote_average?: number;
}

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [dragOver, setDragOver] = useState<boolean>(false);

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
    "Tom Hanks' brother voiced Woody in the Toy Story video games?"
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


  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMovie(null);

      const res = await axios.post<MovieData>(`${import.meta.env.VITE_BACKEND_URL}/api/films/analyze`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMovie(res.data);

    } catch (err) {
      console.error(err);
      alert(`Something went wrong, ${err}`);
    }
    finally {
      setLoading(false);
    }
  };

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    setMovie(null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      handleFileChange(files[0]);
    }
  };

  return (
     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Film className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
            <h1 className="text-2xl sm:text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              WhatIsTheMovieName
            </h1>
          </div>
          <p className="text-gray-400 text-xs sm:text-lg font-medium">
            Identify any movie from a single screenshot
          </p>
        </motion.div>

        {/* Upload Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="space-y-6">
            <div
              className={`relative bg-gray-800/50 backdrop-blur-sm border-2 border-dashed rounded-3xl transition-all duration-300 ${
                dragOver 
                  ? 'border-red-400 bg-red-500/10 scale-105' 
                  : file 
                  ? 'border-green-400 bg-green-500/10' 
                  : 'border-gray-600 hover:border-gray-500'
              } ${file ? 'p-4' : 'p-8 sm:p-12'}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {file ? (
                // Image Preview with Scanning Effect
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Upload preview"
                      className="w-full h-64 object-cover"
                    />
                    
                    {/* Google Lens Style Transparent Scanning Effect */}
                    {loading && (
                      <>
                        {/* Transparent glass scan overlay */}
                        <motion.div
                          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent backdrop-blur-sm"
                          initial={{ height: 0, y: 0 }}
                          animate={{ height: "100%", y: 0 }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          style={{
                            background: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)"
                          }}
                        />
                        
                        {/* Subtle moving highlight line */}
                        <motion.div
                          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent shadow-lg"
                          initial={{ y: 0 }}
                          animate={{ y: 256 }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        
                        {/* Corner indicators */}
                        <div className="absolute inset-0 pointer-events-none">
                          <motion.div 
                            className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-white/70"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          <motion.div 
                            className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-white/70"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                          />
                          <motion.div 
                            className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-white/70"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                          />
                          <motion.div 
                            className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-white/70"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }}
                          />
                        </div>
                        
                        {/* Analysis text overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white/90 text-sm font-medium flex items-center justify-center gap-2">
                            <motion.div
                              className="w-2 h-2 bg-white/90 rounded-full"
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 1.2, repeat: Infinity }}
                            />
                            Analyzing image...
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* File info */}
                  <div className="mt-4 text-center">
                    <p className="text-sm font-medium text-gray-300 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  
                  {/* Change file button */}
                  <button
                    onClick={() => handleFileChange(null)}
                    className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                // Upload prompt
                <div className="text-center space-y-4">
                  <motion.div
                    animate={dragOver ? { scale: 1.1 } : { scale: 1 }}
                    className="mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-gray-700/50"
                  >
                    <Upload className="w-8 h-8 text-gray-400" />
                  </motion.div>
                  
                  <div>
                    <p className="text-lg font-semibold mb-2">
                      Drop your screenshot here
                    </p>
                    <p className="text-sm text-gray-400">
                      or click to browse files
                    </p>
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={(e: ChangeEvent<HTMLInputElement>) => 
                  handleFileChange(e.target.files?.[0] || null)
                }
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Upload movie screenshot to WhatIsTheMovieName"
              />
            </div>

            <motion.button
              type="button"
              onClick={handleUpload}
              disabled={!file || loading}
              className="w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-red-500/25"
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Analyzing...' : 'Analyze Screenshot'}
            </motion.button>
          </div>
        </motion.div>

        {/* Loading Modal */}
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
                    <div className="absolute inset-2 rounded-full border-2 border-red-400 border-b-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.75s' }}></div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-medium text-gray-300">
                      Analyzing your screenshot...
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

        

        {/* Movie Result */}
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
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}