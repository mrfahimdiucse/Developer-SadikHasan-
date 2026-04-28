import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = ['Web Developer.', 'Web Designer.'];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setDisplayText(
        isDeleting
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1)
      );

      setTypingSpeed(isDeleting ? 80 : 150);

      if (!isDeleting && displayText === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      } else {
        timer = setTimeout(handleType, typingSpeed);
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed]);

  return (
    <section id="hero" className="relative flex items-end pt-32 lg:pt-0 min-h-[700px] md:min-h-[800px] lg:h-screen overflow-hidden bg-[#080808]">
      {/* Background Image / Pattern */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none"
        style={{ backgroundImage: 'url(https://imglink.cc/cdn/FshUon6Y1P.png)' }}
      />
      
      <div className="container-custom relative z-10 w-full mb-0">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-12 lg:gap-20">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1 pb-16 lg:pb-24 lg:max-w-[600px] w-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-brand font-bold tracking-[0.4em] text-sm md:text-base mb-6 block uppercase"
              >
                Hello
              </motion.span>
              
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-8 leading-[1.1] tracking-tight">
                i'm <span className="text-brand">Sadik Hasan</span> a <br />
                <span className="bg-gradient-to-r from-brand to-[#ff5c7c] bg-clip-text text-transparent inline-block min-h-[1.2em]">
                  {displayText}
                  <span className="text-white animate-pulse">|</span>
                </span>
              </h1>
              
              <p className="text-gray-400 text-xs md:text-base lg:text-lg mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0">
                I bridge the gap between design and functionality, creating full-scale web applications that are as beautiful as they are powerful. Let's build something extraordinary together.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link to="/video-resume" className="bg-brand hover:bg-brand-hover text-white px-7 md:px-9 py-3.5 md:py-4 rounded-full font-bold flex items-center gap-3 transition-all shadow-[0_15px_35px_rgba(255,45,85,0.3)] group text-sm md:text-base">
                  View Resume <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Right Content / Image Side */}
          <div className="order-1 lg:order-2 relative flex items-end justify-center lg:justify-end lg:flex-1 h-full">
            {/* Main Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative z-10 w-full max-w-[300px] md:max-w-[450px] lg:max-w-none flex items-end justify-center lg:justify-end lg:translate-x-32"
            >
              <img 
                src="https://imglink.cc/cdn/xHzLE0i2xm.png" 
                alt="Sadik Hasan" 
                className="w-auto h-auto max-h-[50vh] md:max-h-[60vh] lg:max-h-[88vh] object-contain z-10 drop-shadow-[0_20px_80px_rgba(255,45,85,0.15)]"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
