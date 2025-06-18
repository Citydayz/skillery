"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiAlertCircle, FiInfo, FiX } from "react-icons/fi";

interface NotificationProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const variants = {
  initial: { opacity: 0, y: 50, scale: 0.3 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
};

const icons = {
  success: <FiCheck className="w-5 h-5" />,
  error: <FiX className="w-5 h-5" />,
  info: <FiInfo className="w-5 h-5" />,
  warning: <FiAlertCircle className="w-5 h-5" />,
};

const colors = {
  success: "bg-green-50 text-green-800 border-green-200",
  error: "bg-red-50 text-red-800 border-red-200",
  info: "bg-blue-50 text-blue-800 border-blue-200",
  warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
};

export function Notification({
  message,
  type = "info",
  isVisible,
  onClose,
  duration = 5000,
}: NotificationProps) {
  React.useEffect(() => {
    if (isVisible && duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg border ${colors[type]} flex items-center gap-3`}
        >
          <div className="flex-shrink-0">{icons[type]}</div>
          <p className="text-sm font-medium">{message}</p>
          <button
            onClick={onClose}
            className="flex-shrink-0 hover:opacity-70 transition-opacity"
          >
            <FiX className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
