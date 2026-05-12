import { motion } from 'motion/react';
import React from 'react';

const loveStory = [
  {
    year: 'August 2022',
    title: 'First Encounter',
    desc: 'Met at a mutual friend\'s art gallery opening in Delhi.',
    image: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=800'
  },
  {
    year: 'October 2023',
    title: 'The Great Indian Coffee Date',
    desc: 'Hours turned into minutes as we realized how much we had in common.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800'
  },
  {
    year: 'January 2025',
    title: 'She Said Yes!',
    desc: 'A romantic proposal under the starlit sky of Udaipur.',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800'
  }
];

export const Timeline: React.FC = () => {
    return (
        <section className="py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-5xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl text-royal-maroon mb-4">Our Love Story</h2>
                    <div className="floral-divider" />
                </motion.div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-royal-gold/20 -translate-x-1/2 hidden md:block" />

                    <div className="space-y-12 md:space-y-32">
                        {loveStory.map((item, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="flex-1 w-full">
                                    <div className="relative group overflow-hidden rounded-2xl aspect-video border-2 border-royal-gold/20">
                                        <img 
                                            src={item.image} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            referrerPolicy="no-referrer"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-royal-maroon/60 to-transparent" />
                                        <div className="absolute bottom-4 left-6">
                                            <span className="text-royal-gold font-serif text-sm tracking-widest">{item.year}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="w-12 h-12 rounded-full bg-royal-gold border-4 border-cream z-10 flex items-center justify-center shrink-0 hidden md:flex">
                                    <div className="w-2 h-2 rounded-full bg-royal-maroon" />
                                </div>

                                <div className={`flex-1 text-center ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <h3 className="text-2xl font-serif text-royal-maroon mb-3">{item.title}</h3>
                                    <p className="text-royal-maroon/70 leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
