import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import AdBanner from "./AdBanner";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const ErrorModal = ({ isOpen, onClose, message }: ErrorModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-gray-800/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 max-w-md w-full border border-red-500/20 shadow-2xl shadow-red-500/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Icon */}
              <AdBanner />

              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>

              {/* Header */}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Oops! Error</h3>
                <p className="text-gray-400 text-sm">
                  Something went wrong while processing your request.
                </p>
              </div>

              {/* Error Message */}
              <div className="w-full bg-red-500/5 rounded-xl p-4 border border-red-500/10">
                <p className="text-red-200 font-medium text-sm break-words">
                  {message || "An unknown error occurred."}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg shadow-red-500/25 active:scale-95 flex items-center justify-center gap-2 group"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorModal;
