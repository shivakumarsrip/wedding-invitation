import { motion } from 'motion/react';
import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

export const Venue: React.FC = () => {
    return (
        <section className="py-24 px-6 bg-cream relative overflow-hidden">
             {/* Background Pattern */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />

            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl text-royal-maroon mb-4">The Venue</h2>
                    <div className="floral-divider" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 w-full">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-0 rounded-3xl overflow-hidden shadow-2xl h-[400px]"
                    >
                         <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112130.34708796859!2d76.99427027599723!3d28.56752003884102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd2b86555555%3A0x600c0f9da74a0f8b!2sThe%20Grand%20Palace%20Hotel!5e0!3m2!1sen!2sin!4v1715450450000!5m2!1sen!2sin" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-center space-y-8"
                    >
                        <div className="space-y-4">
                            <span className="text-royal-gold font-serif italic text-xl">Where Magic Happens</span>
                            <h3 className="text-4xl font-serif text-royal-maroon leading-tight">The Royale Palace,<br />Manesar, Gurugram</h3>
                        </div>

                        <div className="space-y-6 text-royal-maroon/70">
                            <p className="leading-relaxed">
                                Nestled amidst the lush greenery of Aravalli hills, The Royale Palace is a testament to Rajasthani grandeur and contemporary luxury. We have chosen this sanctuary to celebrate the beginning of our life together.
                            </p>
                            
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-12 h-12 rounded-full bg-royal-gold/10 flex items-center justify-center text-royal-gold group-hover:bg-royal-gold group-hover:text-royal-maroon transition-all">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-royal-maroon">Location</h4>
                                    <p className="text-sm">Sector 45, NH-8, Manesar, Gurugram, Haryana - 122051</p>
                                </div>
                            </div>

                            <div className="pt-4">
                               <a 
                                 href="https://maps.google.com" 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="royal-button inline-flex items-center gap-3"
                               >
                                 <Navigation className="w-4 h-4" />
                                 Get Directions
                               </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
