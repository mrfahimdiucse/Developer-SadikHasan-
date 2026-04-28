import { motion } from 'motion/react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import SectionHeading from '../components/SectionHeading';
import Experience from '../components/Experience';
import Portfolio from '../components/Portfolio';
import { ArrowRight, Loader2 } from 'lucide-react';
import { stats, personalInfo, skills, testimonials } from '../data';
import { useState, FormEvent } from 'react';

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus({ type: 'error', message: 'Something went wrong. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main>
      <Hero />
      
      {/* Stats Section */}
      <section className="py-20 bg-bg-dark border-t border-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 bg-gradient-to-br from-brand/20 to-transparent p-8 md:p-12 rounded-3xl border border-brand/20 flex flex-col sm:flex-row items-center gap-6 md:gap-10">
              <span className="text-7xl md:text-9xl font-display font-bold text-brand leading-none">{personalInfo.experienceYears}</span>
              <div className="text-center sm:text-left">
                <h3 className="text-xl md:text-3xl font-display font-bold mb-4">Years Of Experience</h3>
                <p className="text-gray-400 text-xs md:text-sm">Driven by passion and a commitment to excellence, delivering high-quality web solutions for over {personalInfo.experienceYears} years.</p>
              </div>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.slice(1).map((stat, i) => (
                <div key={i} className="bg-bg-card p-8 rounded-2xl border border-gray-900 hover:border-gray-800 transition-colors text-center">
                  <h4 className="text-3xl font-display font-bold mb-2">{stat.value}</h4>
                  <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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

      <Services />

      {/* Featured Project Section */}
      <section className="py-24 bg-bg-card overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading 
                subtitle="LATEST SERVICE" 
                title="Inspiring The World One Project"
                description="Business consulting experts provide expert advice and guide businesses to help them improve their performance efficiency, and organizational"
              />
              
              <div className="space-y-6">
                {[
                  { title: "A Portfolio of Creativity", text: "Business consulting experts provide expert advice and guide businesses to help them improve their performance efficiency." },
                  { title: "My Portfolio of Innovation", text: "My work is driven by the belief that thoughtful design and strategic planning can empower brands, transform businesses" },
                  { title: "A Showcase of My Projects", text: "In this portfolio, you'll find a curated selection of projects that highlight my skills in Main Areas, e.g., responsive web design" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="p-8 bg-bg-dark rounded-2xl border border-gray-800 hover:border-brand/40 transition-colors group cursor-default"
                  >
                    <h4 className="text-lg font-bold mb-3 group-hover:text-brand transition-colors">
                      <span className="text-brand mr-2">0{i+1}.</span> {item.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" 
                  alt="Spotlight" 
                  className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>
              {/* Accents */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand/5 blur-[100px] z-0 rounded-full" />
              <div className="absolute -right-8 -bottom-8 bg-brand w-32 h-32 rounded-full border-8 border-bg-dark z-20" />
            </div>
          </div>
        </div>
      </section>

      <Experience />
      <Portfolio />

      {/* Brands section */}
      <section className="py-20 bg-bg-dark border-t border-gray-900">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60">
            {['Fiverr', 'People Per Hour', 'Freelancer'].map((brand) => (
              <div key={brand} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer py-4 group">
                <span className="text-2xl md:text-3xl font-display font-bold tracking-tighter group-hover:text-brand transition-colors uppercase">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-bg-card">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-brand mb-6">
                 <svg width="45" height="35" viewBox="0 0 45 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.9375 0C17.0625 0 20.25 3.375 20.25 7.5V11.25C20.25 21.375 12.375 30 1.875 33.75L0 31.875C8.4375 27 12.9375 19.5 12.9375 12.75V11.25H7.5C3.375 11.25 0 7.875 0 3.75C0 1.875 0.75 0 12.9375 0ZM37.6875 0C41.8125 0 45 3.375 45 7.5V11.25C45 21.375 37.125 30 26.625 33.75L24.75 31.875C33.1875 27 37.6875 19.5 37.6875 12.75V11.25H32.25C28.125 11.25 24.75 7.875 24.75 3.75C24.75 1.875 25.5 0 37.6875 0Z" fill="currentColor"/>
                 </svg>
              </div>
              <p className="text-2xl md:text-3xl font-display font-bold mb-10 leading-tight">
                "{testimonials[0].quote}"
              </p>
              <div>
                <h4 className="font-bold text-lg">{testimonials[0].author}</h4>
                <p className="text-brand text-sm font-medium">{testimonials[0].role}</p>
              </div>
            </div>
            <div>
              <div className="relative rounded-[40px] overflow-hidden max-w-md mx-auto aspect-[4/5]">
                <img 
                  src={testimonials[0].image} 
                  alt="Testimonial" 
                  className="w-full h-full object-cover grayscale"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-24 bg-bg-dark">
        <div className="container-custom">
          <div className="bg-bg-card rounded-[40px] p-8 md:p-16 border border-gray-800 shadow-2xl flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <span className="text-brand font-bold tracking-[0.2em] text-xs mb-4 block uppercase">GET IN TOUCH</span>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
                Elevate your brand with Me
              </h2>
              <p className="text-gray-500">I am ready to help you bring your ideas to life. Whether it's a new website, a complex web application, or a fresh design, let's create something amazing together.</p>
            </div>
            <div className="lg:w-2/3">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" id="appointment-form" onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  required
                  className="bg-bg-dark border border-gray-800 rounded-xl px-6 py-4 focus:border-brand outline-none transition-colors"
                />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone Number" 
                  className="bg-bg-dark border border-gray-800 rounded-xl px-6 py-4 focus:border-brand outline-none transition-colors"
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email" 
                  required
                  className="bg-bg-dark border border-gray-800 rounded-xl px-6 py-4 focus:border-brand outline-none transition-colors"
                />
                <input 
                  type="text" 
                  name="subject"
                  placeholder="Subject" 
                  className="bg-bg-dark border border-gray-800 rounded-xl px-6 py-4 focus:border-brand outline-none transition-colors"
                />
                <textarea 
                  name="message"
                  placeholder="Your Message" 
                  required
                  rows={4}
                  className="md:col-span-2 bg-bg-dark border border-gray-800 rounded-xl px-6 py-4 focus:border-brand outline-none transition-colors resize-none"
                />
                <div className="md:col-span-2">
                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-brand hover:bg-brand-hover disabled:bg-gray-700 text-white py-4 rounded-xl font-bold transition-all shadow-[0_10px_30px_rgba(255,45,85,0.2)] flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>Processing... <Loader2 className="animate-spin" size={20} /></>
                    ) : (
                      <>Get In Touch <ArrowRight size={20} /></>
                    )}
                  </button>
                  {status && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 text-center font-medium ${status.type === 'success' ? 'text-green-500' : 'text-brand'}`}
                    >
                      {status.message}
                    </motion.p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
