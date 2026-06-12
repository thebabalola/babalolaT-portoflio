import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const navOrder = ['/', '/about', '/skills', '/projects', '/contact'];
let prevIndex = 0;

const pageVariants = {
  initial: (direction) => ({
    x: direction > 0 ? '100vw' : '-100vw',
    opacity: 0,
  }),
  in: {
    x: 0,
    opacity: 1,
  },
  out: (direction) => ({
    x: direction < 0 ? '100vw' : '-100vw',
    opacity: 0,
  }),
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const PageTransition = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  let currentIndex = navOrder.indexOf(currentPath);
  if (currentIndex === -1) currentIndex = 0; // Default to Hero if unknown
  
  const direction = currentIndex - prevIndex;
  
  // We don't update prevIndex during render to avoid issues, we update it right away.
  prevIndex = currentIndex;

  return (
    <motion.div
      key={currentPath}
      custom={direction}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
