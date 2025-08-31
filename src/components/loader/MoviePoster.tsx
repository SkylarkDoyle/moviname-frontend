import { motion } from 'framer-motion';


export const MoviePoster = ({ 
    className, 
    title, 
    colors, 
    delay = 0,
    borderColor = "#333"
  }: {
    className: string;
    title: string;
    colors: string;
    delay?: number;
    borderColor?: string;
  }) => (
    <motion.div 
      className={`absolute rounded-lg flex items-center justify-center text-xs font-bold border text-center p-2 shadow-lg ${className}`}
      style={{
        background: colors,
        borderColor: borderColor,
        filter: 'blur(0.5px)',
        textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
      }}
      animate={{ y: [0, -10, -5, -15, 0] }}
      transition={{ duration: 6, repeat: Infinity, delay }}
    >
      {title}
    </motion.div>
  );