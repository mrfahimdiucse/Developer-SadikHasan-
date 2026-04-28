import { motion } from 'motion/react';
import SectionHeading from './SectionHeading';
import { services } from '../data';

export default function Services() {
  return (
    <section id="services" className="py-24 bg-bg-dark">
      <div className="container-custom">
        <SectionHeading 
          subtitle="MY SERVICES"
          title="Elevated Designs Personalized the best Experiences"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-bg-card p-10 rounded-2xl border border-gray-800 hover:border-brand/40 transition-all group card-hover text-center"
            >
              <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center text-brand mb-8 mx-auto group-hover:scale-110 transition-transform">
                <service.icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-brand font-medium text-xs tracking-wider mb-6 uppercase">{service.count}</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
