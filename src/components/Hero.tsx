import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';
import { Link } from 'react-scroll';

export const Hero: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      id="home" 
      ref={ref} 
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="https://t4.ftcdn.net/jpg/19/37/30/29/240_F_1937302909_UhRo6OagTjPZoIlOuuP8ayeGhFq9gau3.jpg" 
          alt="Royal Wedding Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Decorative Ornaments */}
      <div className="absolute inset-0 z-10 pointer-events-none">
         <div className="absolute top-0 left-0 w-64 h-64 border-l-4 border-t-4 border-royal-gold/30 m-8 rounded-tl-[100px]" />
         <div className="absolute bottom-0 right-0 w-64 h-64 border-r-4 border-b-4 border-royal-gold/30 m-8 rounded-br-[100px]" />
      </div>

      {/* Hero Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ opacity }}
        className="relative z-20 text-center px-4"
      >
        <motion.p 
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-royal-gold font-serif text-sm md:text-xl uppercase mb-6"
        >
          Shubh Vivah
        </motion.p>

        <h1 className="text-6xl md:text-9xl font-accent text-cream drop-shadow-2xl mb-8 leading-tight">
          Aarav <span className="text-royal-gold">&</span> Meera
        </h1>

        <div className="flex flex-col items-center gap-4">
          <div className="h-px w-24 bg-royal-gold/50" />
          <p className="text-xl md:text-3xl text-sandalwood font-serif tracking-widest italic">
            25th November 2026
          </p>
          <div className="h-px w-24 bg-royal-gold/50" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12"
        >
          <Link to="intro" smooth={true} duration={1000} className="cursor-pointer">
            <button className="royal-button bg-transparent backdrop-blur-sm border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-royal-maroon transition-all group">
              Explore Our Journey
              <span className="block h-px w-0 group-hover:w-full bg-royal-maroon transition-all duration-500" />
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-royal-gold/70"
      >
        <span className="text-[10px] uppercase tracking-tighter">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-royal-gold/70 to-transparent" />
      </motion.div>
    </section>
  );
};
