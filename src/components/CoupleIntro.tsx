import { motion } from 'motion/react';
import React from 'react';

export const CoupleIntro: React.FC = () => {
  return (
    <section id="intro" className="py-24 px-6 relative overflow-hidden bg-cream">
      {/* Background Motifs */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-5 -translate-y-1/2 translate-x-1/2">
        <img src="https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&q=80&w=800" alt="Mandala" className="w-full h-full object-contain" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl text-royal-maroon mb-4">Meet the Couple</h2>
          <div className="floral-divider" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Groom */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center group"
          >
            <div className="relative p-4 mb-8">
              <div className="absolute inset-0 border-2 border-royal-gold/30 rounded-full scale-110 group-hover:scale-105 transition-transform duration-700" />
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-royal-gold relative z-10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800" 
                  alt="Aarav" 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <h3 className="text-3xl font-serif text-royal-maroon mb-2">Aarav Sharma</h3>
            <p className="text-royal-gold font-accent text-2xl mb-4 italic">The Handsome Groom</p>
            <p className="text-royal-maroon/70 leading-relaxed max-w-sm">
              A visionary architect with a passion for traditional craftsmanship and modern design. Always found with a camera in hand, capturing the beauty of mundane moments.
            </p>
          </motion.div>

          {/* Bride */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center group"
          >
            <div className="relative p-4 mb-8">
              <div className="absolute inset-0 border-2 border-royal-gold/30 rounded-full scale-110 group-hover:scale-105 transition-transform duration-700" />
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-royal-gold relative z-10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1583939485744-26023f6d45d8?auto=format&fit=crop&q=80&w=800" 
                  alt="Meera" 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <h3 className="text-3xl font-serif text-royal-maroon mb-2">Meera Kapoor</h3>
            <p className="text-royal-gold font-accent text-2xl mb-4 italic">The Beautiful Bride</p>
            <p className="text-royal-maroon/70 leading-relaxed max-w-sm">
              An educator and classical dancer who finds joy in old-world poetry and spicy street food. Her grace is only matched by her infectious laughter.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
