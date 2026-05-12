import { motion } from 'motion/react';
import React from 'react';
import { Instagram, Facebook, Twitter, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
export const Footer: React.FC = () => {
  return (
    <footer className="bg-royal-maroon text-cream py-20 px-6 relative overflow-hidden">
      {/* Decorative Border */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-royal-gold to-transparent" />

      <div className="max-w-7xl mx-auto text-center space-y-12">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="space-y-4"
        >
          <div className="w-16 h-16 bg-cream/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Link to="/admin">
              <Heart className="w-8 h-8 text-royal-gold fill-royal-gold hover:scale-110 hover:drop-shadow-lg transition-all cursor-pointer" />
            </Link>
          </div>
          <h2 className="text-5xl font-accent text-royal-gold italic">Thank You</h2>
          <p className="text-sandalwood font-serif text-xl tracking-widest uppercase mt-4">
            For being part of our beautiful journey
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-6">
            <span className="text-royal-gold text-2xl font-serif">#AaravWedsMeera</span>
            <div className="flex gap-6 text-cream/60">
              <Instagram className="w-6 h-6 hover:text-royal-gold cursor-pointer transition-colors" />
              <Facebook className="w-6 h-6 hover:text-royal-gold cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 hover:text-royal-gold cursor-pointer transition-colors" />
            </div>
        </div>

        <div className="pt-20 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/40 uppercase tracking-[0.2em]">
          <p>© 2026 Crafted with Love for Aarav & Meera</p>
          <div className="flex gap-8">
            <span className="hover:text-cream cursor-pointer transition-colors">Our Wedding</span>
            <span className="hover:text-cream cursor-pointer transition-colors">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
