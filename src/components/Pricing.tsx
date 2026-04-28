import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { useState } from 'react';
import QuickHireModal from './QuickHireModal';

import { pricingPlans } from '../data';

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<{name: string, price: string} | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGetStarted = (name: string, price: string) => {
    setSelectedPlan({ name, price });
    setIsModalOpen(true);
  };

  return (
    <section className="py-24 bg-bg-dark">
      <div className="container-custom">
        <SectionHeading 
          subtitle="MY PRICE PLAN"
          title="Flexible Pricing for Every Vision"
          description="A range of options designed to fit your unique project needs, from simple landing pages to comprehensive web solutions."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-12 rounded-[40px] border transition-all ${
                plan.isPopular 
                  ? 'bg-bg-card border-brand shadow-[0_20px_50px_rgba(255,45,85,0.1)]' 
                  : 'bg-bg-card border-gray-900'
              }`}
            >
              <span className="text-white font-bold text-sm mb-4 block">{plan.name}</span>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-brand text-2xl font-bold">$</span>
                <span className="text-5xl font-display font-bold">{plan.price}</span>
                <span className="text-gray-500 text-sm ml-2">Per Month</span>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-gray-400 text-sm">
                    <div className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                      <Check size={12} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleGetStarted(plan.name, plan.price)}
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                plan.isPopular 
                  ? 'bg-brand text-white hover:bg-brand-hover' 
                  : 'bg-bg-dark border border-gray-800 text-white hover:border-brand'
              }`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedPlan && (
        <QuickHireModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
        />
      )}
    </section>
  );
}
