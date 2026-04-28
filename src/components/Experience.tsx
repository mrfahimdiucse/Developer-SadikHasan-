import { motion } from 'motion/react';
import SectionHeading from './SectionHeading';
import { education, experience } from '../data';

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-bg-dark border-t border-gray-900">
      <div className="container-custom">
        <SectionHeading 
          subtitle="EDUCATION & EXPERIENCE"
          title="Empowering Creativity through"
          description="Leveraging years of expertise to deliver high-quality web solutions that meet unique business needs and drive meaningful engagement."
          centered
        />

        <div className="mb-24">
          <h3 className="text-3xl font-display font-bold mb-10 flex items-center gap-4">
            Education <div className="h-0.5 bg-brand flex-grow max-w-xs" />
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-bg-card p-10 rounded-2xl border border-gray-800 hover:border-brand/40 transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <h4 className="text-xl font-bold group-hover:text-brand transition-colors">{item.role}</h4>
                  <span className="text-brand font-bold bg-brand/10 px-4 py-1 rounded-full text-xs">{item.period}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-display font-bold mb-10 flex items-center gap-4">
            Experiences <div className="h-0.5 bg-brand flex-grow max-w-xs" />
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <div className="space-y-8">
               {experience.map((exp, i) => (
                 <motion.div 
                   key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                   className="relative pl-8 border-l-2 border-gray-800 hover:border-brand transition-all"
                 >
                   <div className="absolute top-0 left-0 -translate-x-[9px] w-4 h-4 bg-brand rounded-full shadow-[0_0_10px_#ff2d55]" />
                   <span className="text-brand text-xs font-bold uppercase tracking-widest mb-2 block">experience</span>
                   <h4 className="text-xl font-bold mb-2">{exp.company}</h4>
                   <p className="text-gray-300 font-medium text-sm mb-4">{exp.role}</p>
                   <p className="text-gray-500 text-sm">{exp.description}</p>
                 </motion.div>
               ))}
             </div>
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="rounded-3xl overflow-hidden shadow-2xl"
             >
               <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000" 
                alt="Workspace" 
                className="w-full grayscale hover:grayscale-0 transition-all duration-700"
               />
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
