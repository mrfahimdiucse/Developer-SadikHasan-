import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ArrowRight, Loader2 } from 'lucide-react';
import { personalInfo } from '../data';
import { useState, FormEvent } from 'react';

const ContactInfoCard = ({ icon: Icon, title, content1, content2 }: { icon: any, title: string, content1: string, content2: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-[#111111] p-10 rounded-2xl border border-white/5 flex flex-col items-center text-center group hover:border-brand/30 transition-all"
  >
    <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center text-brand mb-6 group-hover:scale-110 transition-transform">
      <Icon size={28} />
    </div>
    <h3 className="text-2xl font-display font-bold mb-4">{title}</h3>
    <div className="text-gray-400 space-y-1">
      <p>{content1}</p>
      {content2 && content1 !== content2 && <p>{content2}</p>}
    </div>
  </motion.div>
);

export default function Contact() {
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
    <div className="pt-20">
      {/* Page Header */}
      <section className="relative py-32 bg-[#080808] overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            Contact
          </motion.h1>
          <div className="flex items-center justify-center gap-3 text-gray-400 font-medium text-lg">
             <Link to="/" className="hover:text-white transition-colors">Home</Link>
             <ArrowRight size={16} className="text-brand" />
             <span className="text-brand">Contact</span>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <ContactInfoCard 
              icon={MapPin}
              title="Address"
              content1={personalInfo.address.split(',')[0]}
              content2={personalInfo.address.split(',').slice(1).join(',')}
            />
            <ContactInfoCard 
              icon={Mail}
              title="E-Mail"
              content1={personalInfo.email}
              content2={personalInfo.secondaryEmail || ''}
            />
            <ContactInfoCard 
              icon={Phone}
              title="Call Me"
              content1={personalInfo.phone}
              content2=""
            />
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-32">
        <div className="container-custom">
          <div className="bg-[#0f0f0f] rounded-[40px] p-8 md:p-20 border border-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent opacity-50" />
            
            <div className="grid lg:grid-cols-2 gap-20 relative z-10">
              {/* Left Column */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-brand font-bold tracking-[0.3em] text-sm mb-6 block uppercase">GET IN TOUCH</span>
                <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-8 leading-[1.1]">
                  Elevate your brand <br /> with Me
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md">
                  I am ready to help you bring your ideas to life. Whether it's a new website, a complex web application, or a fresh design, let's create something amazing together.
                </p>
                <div className="w-24 h-1 bg-brand rounded-full" />
              </motion.div>

              {/* Right Column - Form */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <input 
                      type="text" 
                      name="name"
                      placeholder="Your Name" 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-brand/50 transition-all text-white placeholder:text-gray-600 focus:bg-white/[0.07]"
                    />
                    <input 
                      type="text" 
                      name="phone"
                      placeholder="Phone Number" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-brand/50 transition-all text-white placeholder:text-gray-600 focus:bg-white/[0.07]"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Your Email" 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-brand/50 transition-all text-white placeholder:text-gray-600 focus:bg-white/[0.07]"
                    />
                    <input 
                      type="text" 
                      name="subject"
                      placeholder="Subject" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-brand/50 transition-all text-white placeholder:text-gray-600 focus:bg-white/[0.07]"
                    />
                  </div>

                  <textarea 
                    name="message"
                    placeholder="Your Message" 
                    required
                    rows={6}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-brand/50 transition-all text-white placeholder:text-gray-600 focus:bg-white/[0.07] resize-none"
                  ></textarea>

                  <motion.button 
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-brand hover:bg-brand-hover disabled:bg-gray-700 text-white px-12 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-[0_20px_40px_rgba(255,45,85,0.3)] text-lg"
                  >
                    {isSubmitting ? (
                      <>Processing... <Loader2 className="animate-spin" size={22} /></>
                    ) : (
                      <>Get In Touch <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </motion.button>

                  {status && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 text-center font-medium ${status.type === 'success' ? 'text-green-500' : 'text-brand'}`}
                    >
                      {status.message}
                    </motion.p>
                  )}
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
