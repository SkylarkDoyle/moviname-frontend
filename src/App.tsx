import { useEffect, useState, type ChangeEvent, type DragEvent } from "react";
import { motion } from "framer-motion";
import { Upload, Film, Link } from "lucide-react";
import axios from "axios";
import { extractVideoFrames } from "./utils";
import Loader from "./components/loader/Loader";
import MovieResult from "./components/MovieResult";
import { Splash } from "./components/loader/Splash";
import BGCollage from "./components/BGCollage";
import { useSearchParams } from "react-router-dom";

export interface MovieData {
  poster_url: string;
  title: string;
  release_date: string;
  overview: string;
  vote_average?: number;
}

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
  "video/ogg",
];

export default function App() {
  // Query param handling after initial loading
  const [searchParams] = useSearchParams();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [loadingTime, setLoadingTime] = useState<number>(0);
  const [initialLoading, setInitialLoading] = useState<boolean>(true); // Added initial loader state
  const [imageUrl, setImageUrl] = useState<string>("");

  // Simulate initial loading for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Check query param once on mount
  useEffect(() => {
    const urlParam = searchParams.get("clipUrl");
    if (urlParam) {
      setImageUrl(urlParam); // Only set the state here
    }
  }, [searchParams]);

  // Trigger handleUpload after imageUrl is set and initialLoading is done
  useEffect(() => {
    if (imageUrl && !initialLoading) {
      handleUpload();
    }
  }, [imageUrl, initialLoading]);

  const handleUpload = async () => {
    if (!file && !imageUrl) return;

    try {
      setLoading(true);
      setLoadingTime(0);
      setMovie(null);

      let res;

      if (imageUrl) {
        // Handle URL-based analysis
        res = await axios.post<MovieData>(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/films/analyze_social?url=${encodeURIComponent(imageUrl)}`,
          {},
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      } else if (file) {
        const formData = new FormData();

        if (file.type.startsWith("video/")) {
          const frames = await extractVideoFrames(file, 4);
          frames.forEach((frame) => formData.append("files", frame));
        } else {
          formData.append("files", file);
        }

        res = await axios.post<MovieData>(
          `${import.meta.env.VITE_BACKEND_URL}/api/films/analyze`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }

      if (res) {
        setMovie(res.data);
      }
    } catch (err) {
      console.error(err);
      alert(`Something went wrong, ${err}`);
    } finally {
      setLoading(false);
    }
  };

  // ⬆️ Add this useEffect to increment timer while loading
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (loading) {
      interval = setInterval(() => {
        setLoadingTime((prev) => prev + 1);
      }, 1000);
    } else if (!loading && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading]);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile === null) {
      setFile(null);
      setMovie(null);
      setPreviewUrl("");
      return;
    }

    const FILE_SIZE_LIMIT = 5 * 1024 * 1024;

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      alert(
        "Only images (jpg, png, webp, gif) or videos (mp4, webm, ogg) are allowed."
      );
      return;
    }

    if (FILE_SIZE_LIMIT < selectedFile.size) {
      alert("File size should be less than 5MB.");
      return;
    }

    setFile(selectedFile);
    setMovie(null);
    setPreviewUrl(URL.createObjectURL(selectedFile));
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
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  if (initialLoading) {
    return <Splash />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
      <BGCollage />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-center gap-1 mb-3">
            <Film className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
            <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              movíname
              <motion.span
                className="inline-block w-1 h-1 bg-red-500 rounded-full ml-1"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </h1>
          </div>
          <p className="text-gray-400 text-xs sm:text-lg font-medium">
            Discover Cinema Through AI
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
                  ? "border-red-400 bg-red-500/10 scale-105"
                  : file || imageUrl
                  ? "border-green-400 bg-green-500/10"
                  : "border-gray-600 hover:border-gray-500"
              } ${file || imageUrl ? "p-4" : "p-8 sm:p-12"}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {file ? (
                // Image Preview with Scanning Effect
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden">
                    {file?.type.startsWith("video/") ? (
                      <video
                        src={previewUrl}
                        autoPlay
                        muted
                        // controls
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <img
                        src={previewUrl}
                        alt="preview"
                        className="w-full h-64 object-cover"
                      />
                    )}
                    {/* <img
                      src={URL.createObjectURL(file)}
                      alt="Upload preview"
                      className="w-full h-64 object-cover"
                    />
                     */}
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
                            ease: "easeInOut",
                          }}
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
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
                            ease: "easeInOut",
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
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: 0.3,
                            }}
                          />
                          <motion.div
                            className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-white/70"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: 0.6,
                            }}
                          />
                          <motion.div
                            className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-white/70"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: 0.9,
                            }}
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
                    <svg
                      className="w-4 h-4 text-red"
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
                      Drop your movie screenshot/clip here
                    </p>
                    <p className="text-sm text-gray-400">
                      or click to select a file
                    </p>
                  </div>
                </div>
              )}
              <input
                type="file"
                accept="image/*,video/*"
                disabled={!!imageUrl}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFileChange(e.target.files?.[0] || null)
                }
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Upload clips to movíname"
              />{" "}
              {/* Divider */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-full max-w-md flex items-center gap-4 my-6"
              >
                <div className="flex-1 h-px bg-gray-700"></div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-sm text-gray-500 font-medium">
                    or Drop a link to your clip
                  </p>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full">
                    New (V2)
                  </span>
                </div>
                <div className="flex-1 h-px bg-gray-700"></div>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="w-full max-w-md"
              >
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Link />
                  </div>
                  <input
                    type="url"
                    value={imageUrl}
                    placeholder="Supports X (Twitter), Instagram, TikTok"
                    disabled={!!file}
                    className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border-2 border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:bg-gray-800/70 transition-all duration-300 hover:border-gray-500"
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Option restriction message */}
            {(file || imageUrl) && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-amber-400 text-center mb-2 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Please either upload clip or paste URL, not both
              </motion.p>
            )}
            <motion.button
              type="button"
              onClick={handleUpload}
              disabled={
                (!file && !imageUrl) || (!!file && !!imageUrl) || loading
              }
              className="w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-red-500/25"
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Analyzing..." : "Discover"}
            </motion.button>
          </div>
        </motion.div>

        {/* Loading Modal */}
        <Loader loading={loading} loadingTime={loadingTime} />

        {/* Movie Result */}
        <MovieResult movie={movie} setMovie={setMovie} />
      </div>
    </div>
  );
}
