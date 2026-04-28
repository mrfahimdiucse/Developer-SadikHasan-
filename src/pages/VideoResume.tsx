import { motion } from 'motion/react';
import { Play, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VideoResume() {
  return (
    <div className="pt-40 pb-20 container-custom min-h-[80vh] flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-24 h-24 bg-brand rounded-full flex items-center justify-center mb-8 relative"
      >
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-brand rounded-full opacity-30"
        />
        <Play className="text-white fill-white relative z-10 ml-1" size={40} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-5xl md:text-7xl font-display font-bold mb-6"
      >
        Video Resume <span className="text-brand">Coming Soon</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12"
      >
        I'm currently perfecting my story to show you exactly how I can help bring your next project to life. Stay tuned!
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link 
          to="/" 
          className="inline-flex items-center gap-3 text-white hover:text-brand transition-colors font-bold group"
        >
          <ArrowLeft className="transform group-hover:-translate-x-2 transition-transform" /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
