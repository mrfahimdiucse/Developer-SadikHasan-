import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Share2, Link as LinkIcon, Filter, ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { projects } from '../data';

const categories = ["All", "Web Design", "Web Development", "Android App Development", "UI/UX Design", "Graphics Design", "Meta Marketing", "Video Editing"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-bg-dark overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <SectionHeading 
            subtitle="LATEST PORTFOLIO"
            title="Transforming Ideas into Exceptional"
            description="Business consulting experts provide expert advice and guide businesses to help them improve their performance efficiency, and organizational"
          />
          
          <div className="flex flex-wrap gap-4 mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
                  activeCategory === cat 
                    ? 'bg-brand border-brand text-white shadow-[0_5px_15px_rgba(255,45,85,0.3)]' 
                    : 'bg-bg-card border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.slice(0, 7).map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`group relative bg-bg-card rounded-[40px] overflow-hidden border border-gray-900 card-hover ${
                  index < 4 ? "lg:col-span-3" : "lg:col-span-4"
                }`}
              >
                <div className="aspect-square md:aspect-[16/10] lg:aspect-square overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                     <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:bg-brand hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                       <LinkIcon size={20} />
                     </button>
                     <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:bg-brand hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
                       <Share2 size={20} />
                     </button>
                  </div>
                </div>
                
                <div className="p-8 border-t border-white/5 bg-gradient-to-b from-black/20 to-black/80">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[9px] uppercase tracking-widest font-bold text-gray-400 bg-white/5 px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-display font-bold group-hover:text-brand transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">{project.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length > 7 && (
          <div className="mt-16 text-center">
            <Link 
              to="/project" 
              className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white px-10 py-4 rounded-full font-bold transition-all border border-white/10 hover:border-brand"
            >
              View All Projects <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
