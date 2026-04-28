import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Trophy, Briefcase, Users, Package, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Services from '../components/Services';
import Experience from '../components/Experience';
import Pricing from '../components/Pricing';

import { stats, skills, personalInfo } from '../data';

export default function About() {
  return (
    <main className="pt-24">
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
            className="text-6xl md:text-8xl font-display font-bold mb-6 tracking-tight text-white"
          >
            About Me
          </motion.h1>
          <div className="flex items-center justify-center gap-3 text-gray-400 font-medium text-lg">
             <Link to="/" className="hover:text-white transition-colors">Home</Link>
             <ArrowRight size={16} className="text-brand" />
             <span className="text-brand">About Me</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <Services />

      {/* Skills Section */}
      <section className="py-20 bg-bg-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <SectionHeading title="Design Skill" />
              <div className="space-y-8">
                {skills.design.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-3 items-end">
                      <span className="font-bold text-sm tracking-widest">{skill.name}</span>
                      <span className="text-xs text-gray-500 font-bold">{skill.progress}%</span>
                    </div>
                    <div className="h-[3px] bg-gray-900 w-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: 'easeOut', delay: i * 0.1 }}
                        className="h-full bg-brand shadow-[0_0_10px_#ff2d55]" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading title="Development Skill" />
              <div className="space-y-8">
                {skills.dev.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-3 items-end">
                      <span className="font-bold text-sm tracking-widest">{skill.name}</span>
                      <span className="text-xs text-gray-500 font-bold">{skill.progress}%</span>
                    </div>
                    <div className="h-[3px] bg-gray-900 w-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: 'easeOut', delay: i * 0.1 }}
                        className="h-full bg-brand shadow-[0_0_10px_#ff2d55]" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Table Section */}
      <section className="py-20 bg-bg-dark border-t border-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Big Experience Card */}
            <div className="lg:col-span-6 bg-gradient-to-br from-brand/20 to-transparent p-8 md:p-12 rounded-[40px] border border-brand/20 flex flex-col sm:flex-row items-center gap-6 md:gap-10">
              <span className="text-7xl md:text-9xl font-display font-bold text-brand leading-none">{personalInfo.experienceYears}</span>
              <div className="text-center sm:text-left">
                <h3 className="text-xl md:text-3xl font-display font-bold mb-4">Years Of Experience</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  Leveraging {personalInfo.experienceYears} years of hands-on experience in web design and development to create impactful digital experiences that drive growth.
                </p>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-bg-card p-10 rounded-[20px] border border-gray-900 hover:border-gray-800 transition-colors text-center">
                  <h4 className="text-4xl font-display font-bold mb-2">{stat.value}</h4>
                  <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education & Experience */}
      <Experience />

      {/* Pricing */}
      <Pricing />

      {/* Contact Form */}
      <section className="py-32 bg-[#080808]">
        <div className="container-custom">
          <div className="bg-[#0f0f0f] rounded-[40px] p-8 md:p-20 border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-20 relative z-10">
              <div>
                <span className="text-brand font-bold tracking-[0.3em] text-sm mb-6 block uppercase">GET IN TOUCH</span>
                <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-8 leading-[1.1]">
                  Elevate your brand <br /> with Me
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md">
                  I am ready to help you bring your ideas to life. Whether it's a new website, a complex web application, or a fresh design, let's create something amazing together.
                </p>
                <div className="w-24 h-1 bg-brand rounded-full" />
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-brand/50 transition-all text-white placeholder:text-gray-600 grow" />
                  <input type="text" placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-brand/50 transition-all text-white placeholder:text-gray-600 grow" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="email" placeholder="Your Email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-brand/50 transition-all text-white placeholder:text-gray-600 grow" />
                  <input type="text" placeholder="Subject" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-brand/50 transition-all text-white placeholder:text-gray-600 grow" />
                </div>
                <textarea placeholder="Your Message" rows={6} className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-brand/50 transition-all text-white placeholder:text-gray-600 resize-none grow"></textarea>
                <button className="w-full bg-brand hover:bg-brand-hover text-white px-12 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg text-lg">
                  Get In Touch <ArrowRight size={22} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
