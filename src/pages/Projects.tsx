import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { projects } from '../data';

const categories = ["All", "Web Design", "Web Development", "Android App Development", "UI/UX Design", "Graphics Design", "Meta Marketing", "Video Editing"];

export default function Projects() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = activeTab === "All" 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="relative py-32 bg-[#080808] overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1440 400" fill="none">
            <path d="M0 200C150 150 300 250 450 200C600 150 750 250 900 200C1050 150 1200 250 1350 200V400H0V200Z" fill="url(#paint0_linear)" fillOpacity="0.2"/>
            <defs>
              <linearGradient id="paint0_linear" x1="720" y1="200" x2="720" y2="400" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ff2d55"/>
                <stop offset="1" stopColor="#080808" stopOpacity="0"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-display font-bold mb-6 tracking-tight"
          >
            My Project
          </motion.h1>
          <div className="flex items-center justify-center gap-3 text-gray-400 font-medium text-lg">
             <Link to="/" className="hover:text-white transition-colors">Home</Link>
             <ArrowRight size={16} className="text-brand" />
             <span className="text-brand">My All Project</span>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 md:px-8 py-2.5 md:py-3 rounded-full font-bold text-sm md:text-base transition-all ${
                  activeTab === cat 
                  ? "bg-brand text-white shadow-[0_10px_25px_rgba(255,45,85,0.3)]" 
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-20 grid lg:grid-cols-2 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative bg-[#111111] rounded-[32px] overflow-hidden border border-white/5 hover:border-brand/30 transition-all shadow-2xl"
                >
                  {/* Image Container */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-4">
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map(tag => (
                            <span key={tag} className="text-[10px] md:text-[11px] uppercase font-bold tracking-widest text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-2xl md:text-4xl font-display font-bold text-white group-hover:text-brand transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      
                      <button className="bg-brand hover:bg-brand-hover text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap shadow-[0_10px_20px_rgba(255,45,85,0.2)] w-fit">
                        View Design <ExternalLink size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
