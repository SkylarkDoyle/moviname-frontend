import { motion } from "framer-motion";

export const MoviePoster = ({
  className,
  title,
  colors,
  delay = 0,
  borderColor = "#333",
  url,
}: {
  className: string;
  title: string;
  colors: string;
  delay?: number;
  borderColor?: string;
  url?: string;
}) => (
  <motion.div
    className={`absolute rounded-lg flex items-center justify-center text-xs font-bold border text-center p-0 shadow-lg ${className}`} // Removed p-2 to let image fill
    style={{
      background: url ? "transparent" : colors,
      borderColor: borderColor,
      filter: "blur(0.5px)",
      textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
      overflow: "hidden", // Ensure image respects border radius
    }}
    animate={{ y: [0, -10, -5, -15, 0] }}
    transition={{ duration: 6, repeat: Infinity, delay }}
  >
    {url ? (
      <img src={url} alt={title} className="w-full h-full object-cover" />
    ) : (
      <div className="p-2 w-full h-full flex items-center justify-center">
        {title}
      </div>
    )}
  </motion.div>
);
