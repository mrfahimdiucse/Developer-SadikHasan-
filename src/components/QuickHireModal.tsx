import { motion, AnimatePresence } from 'motion/react';
import { X, Loader2, Send, CheckCircle2 } from 'lucide-react';
import { useState, FormEvent } from 'react';

interface QuickHireModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: string;
}

export default function QuickHireModal({ isOpen, onClose, planName, planPrice }: QuickHireModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: `New Plan Order: ${planName} ($${planPrice})`,
      message: `I would like to start the ${planName} plan ($${planPrice}/month). Please contact me to discuss the next steps.`,
      service: planName
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 3000);
      } else {
        setError('Failed to send order. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#0f0f0f] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
          >
            {isSuccess ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">Order Sent!</h3>
                <p className="text-gray-400">Thank you for your interest in the {planName} plan. I will contact you shortly.</p>
              </div>
            ) : (
              <>
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white">Start {planName} Plan</h3>
                    <p className="text-gray-400 text-sm mt-1">Fill out your details to get started.</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                    <input 
                      required
                      name="name"
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand transition-all text-white placeholder:text-gray-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</label>
                      <input 
                        required
                        name="email"
                        type="email" 
                        placeholder="john@example.com" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand transition-all text-white placeholder:text-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone</label>
                      <input 
                        name="phone"
                        type="text" 
                        placeholder="+123..." 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand transition-all text-white placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-brand/5 border border-brand/10 rounded-2xl">
                    <p className="text-sm text-gray-400">
                      Selected Plan: <span className="text-white font-bold">{planName}</span> - <span className="text-brand font-bold">${planPrice}/month</span>
                    </p>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand hover:bg-brand-hover disabled:bg-gray-700 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg text-lg group"
                  >
                    {isSubmitting ? (
                      <>Processing... <Loader2 className="animate-spin" size={22} /></>
                    ) : (
                      <>Send Order Request <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                    )}
                  </button>

                  {error && (
                    <p className="text-center text-brand text-sm font-medium">{error}</p>
                  )}
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
