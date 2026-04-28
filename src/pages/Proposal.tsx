import React, { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Send, User, Mail, Briefcase, MessageSquare, Loader2 } from 'lucide-react';

export default function Proposal() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      service: formData.get('service'),
      message: formData.get('message'),
      subject: 'New Project Proposal',
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError('Failed to send proposal. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-24 bg-[#080808] min-h-screen">
      {/* Page Header */}
      <section className="relative py-20 border-b border-white/5">
        <div className="container-custom relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-4 tracking-tight text-white"
          >
            Send a Proposal
          </motion.h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tell me about your project and let's create something extraordinary together.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-brand/10 border border-brand/20 p-12 rounded-[40px] text-center"
              >
                <div className="w-20 h-20 bg-brand rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                  <Send size={40} />
                </div>
                <h2 className="text-3xl font-display font-bold text-white mb-4">Proposal Sent Successfully!</h2>
                <p className="text-gray-400 text-lg">
                  Thank you for reaching out. I'll review your project details and get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0f0f0f] border border-white/5 rounded-[40px] p-8 md:p-16 shadow-2xl"
              >
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Details */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <User size={14} className="text-brand" /> Your Full Name
                      </label>
                      <input 
                        required
                        name="name"
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-brand transition-all text-white placeholder:text-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Mail size={14} className="text-brand" /> Email Address
                      </label>
                      <input 
                        required
                        name="email"
                        type="email" 
                        placeholder="john@example.com" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-brand transition-all text-white placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Briefcase size={14} className="text-brand" /> Project Type
                    </label>
                    <select name="service" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-brand transition-all text-white appearance-none cursor-pointer">
                      <option value="web" className="bg-[#0f0f0f]">Web Development</option>
                      <option value="mobile" className="bg-[#0f0f0f]">Mobile App</option>
                      <option value="uiux" className="bg-[#0f0f0f]">UI/UX Design</option>
                      <option value="branding" className="bg-[#0f0f0f]">Branding & Logo</option>
                      <option value="other" className="bg-[#0f0f0f]">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <MessageSquare size={14} className="text-brand" /> Project Details
                    </label>
                    <textarea 
                      required
                      name="message"
                      placeholder="Describe your project, goals, and any specific requirements..." 
                      rows={6}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-brand transition-all text-white placeholder:text-gray-600 resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand hover:bg-brand-hover disabled:bg-gray-700 text-white py-6 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg text-lg group"
                  >
                    {isSubmitting ? (
                      <>Processing... <Loader2 className="animate-spin" size={22} /></>
                    ) : (
                      <>Send Proposal <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>

                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-brand font-medium"
                    >
                      {error}
                    </motion.p>
                  )}
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
