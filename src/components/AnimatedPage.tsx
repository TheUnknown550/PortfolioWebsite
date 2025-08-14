
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedPageProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 40,
    scale: 0.98,
    filter: "blur(8px)",
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  out: {
    opacity: 0,
    y: -40,
    scale: 0.98,
    filter: "blur(8px)",
    transition: {
      duration: 0.35,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const AnimatedPage: React.FC<AnimatedPageProps> = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={typeof window !== 'undefined' ? window.location.pathname : 'page'}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        className="min-h-[60vh]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedPage;
