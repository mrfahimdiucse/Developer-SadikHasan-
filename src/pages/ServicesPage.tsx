import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { services, pricingPlans } from '../data';
import { useState, FormEvent } from 'react';
import QuickHireModal from '../components/QuickHireModal';

const ServiceCard = ({ number, title, desc }: { number: string, title: string, desc: string, key?: any }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-[#111111] p-8 rounded-2xl border border-white/5 hover:border-brand/30 transition-all group"
  >
    <div className="flex items-start gap-4">
      <span className="text-xl font-display font-bold text-brand">{number}.</span>
      <div>
        <h3 className="text-xl font-display font-bold text-white mb-4 group-hover:text-brand transition-colors">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  </motion.div>
);

const PricingCard = ({ title, price, highlighted = false, features, onSelect }: { title: string, price: string, highlighted?: boolean, features: string[], key?: any, onSelect: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`p-10 rounded-[32px] border transition-all ${
      highlighted 
      ? "bg-[#141414] border-brand scale-105 z-10 shadow-[0_30px_60px_rgba(255,45,85,0.15)]" 
      : "bg-[#111111] border-white/5 hover:border-white/10"
    }`}
  >
    <span className="text-gray-400 font-bold text-sm mb-4 block">{title}</span>
    <div className="mb-8">
      <span className="text-4xl font-display font-bold text-white">$ {price}</span>
      <span className="text-gray-500 text-sm ml-2">Per Month</span>
    </div>
    
    <ul className="space-y-4 mb-10">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
          <div className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center text-brand">
            <Check size={12} />
          </div>
          {f}
        </li>
      ))}
    </ul>

    <button 
      onClick={onSelect}
      className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
      highlighted 
      ? "bg-brand text-white shadow-lg" 
      : "bg-white/5 text-white hover:bg-white/10"
    }`}>
      Get Started <ArrowRight size={16} />
    </button>
  </motion.div>
);

export default function ServicesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<{name: string, price: string} | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectPlan = (name: string, price: string) => {
    setSelectedPlan({ name, price });
    setIsModalOpen(true);
  };

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
            My Service
          </motion.h1>
          <div className="flex items-center justify-center gap-3 text-gray-400 font-medium text-lg">
             <Link to="/" className="hover:text-white transition-colors">Home</Link>
             <ArrowRight size={16} className="text-brand" />
             <span className="text-brand">Service</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <ServiceCard 
                key={i}
                number={(i + 1).toString().padStart(2, '0')}
                title={service.title}
                desc={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container-custom">
          <div className="text-center mb-20">
            <span className="text-brand font-bold tracking-[0.3em] text-sm mb-6 block uppercase">MY PRICE PLAN</span>
            <h2 className="text-5xl md:text-6xl font-display font-bold text-white max-w-2xl mx-auto leading-tight">
              Flexible Pricing for Every Vision
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <PricingCard 
                key={i}
                title={plan.name}
                price={plan.price}
                highlighted={plan.isPopular}
                features={plan.features}
                onSelect={() => handleSelectPlan(plan.name, plan.price)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-32">
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <input 
                      type="text" 
                      name="name"
                      placeholder="Your Name" 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-brand/50 transition-all text-white placeholder:text-gray-600 grow" 
                    />
                    <input 
                      type="text" 
                      name="phone"
                      placeholder="Phone Number" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-brand/50 transition-all text-white placeholder:text-gray-600 grow" 
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Your Email" 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-brand/50 transition-all text-white placeholder:text-gray-600 grow" 
                    />
                    <input 
                      type="text" 
                      name="subject"
                      placeholder="Subject" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-brand/50 transition-all text-white placeholder:text-gray-600 grow" 
                    />
                  </div>
                  <textarea 
                    name="message"
                    placeholder="Your Message" 
                    required
                    rows={6} 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-brand/50 transition-all text-white placeholder:text-gray-600 resize-none grow"
                  ></textarea>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand hover:bg-brand-hover disabled:bg-gray-700 text-white px-12 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg text-lg"
                  >
                    {isSubmitting ? (
                      <>Processing... <Loader2 className="animate-spin" size={22} /></>
                    ) : (
                      <>Get In Touch <ArrowRight size={22} /></>
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedPlan && (
        <QuickHireModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
        />
      )}
    </div>
  );
}
