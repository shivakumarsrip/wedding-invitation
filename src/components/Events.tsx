import { motion } from 'motion/react';
import React from 'react';
import { Calendar, Clock, MapPin, Heart } from 'lucide-react';

const events = [
  {
    title: 'Mehendi Ceremony',
    date: 'Nov 23, 2026',
    time: '4:00 PM onwards',
    venue: 'Grand Ballroom, Royale Palace',
    icon: <Heart className="w-6 h-6" />,
    color: 'bg-[#006400]' // Deep green for Mehendi
  },
  {
    title: 'Sangeet Night',
    date: 'Nov 24, 2026',
    time: '7:30 PM onwards',
    venue: 'Imperial Lawns, Royale Palace',
    icon: <Calendar className="w-6 h-6" />,
    color: 'bg-royal-maroon'
  },
  {
    title: 'The Wedding Ceremony',
    date: 'Nov 25, 2026',
    time: '10:00 AM onwards',
    venue: 'Temple Shikhara, Royale Palace',
    icon: <Heart className="w-6 h-6" />,
    color: 'bg-royal-red'
  },
  {
    title: 'Grand Reception',
    date: 'Nov 25, 2026',
    time: '8:00 PM onwards',
    venue: 'Royal Court, Royale Palace',
    icon: <Clock className="w-6 h-6" />,
    color: 'bg-[#4B0082]' // Deep Indigo for night
  }
];

export const Events: React.FC = () => {
  return (
    <section id="events" className="py-24 px-6 bg-sandalwood/30">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-royal-gold font-serif italic text-xl">The Celebrations</span>
          <h2 className="text-4xl md:text-6xl text-royal-maroon mt-2 mb-4">Wedding Itinerary</h2>
          <div className="floral-divider" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="glass-card p-0 rounded-2xl overflow-hidden group hover:translate-y-[-10px] transition-all duration-500"
            >
              <div className={`h-2 ${event.color} w-full`} />
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-royal-gold/10 flex items-center justify-center text-royal-gold mb-6 group-hover:scale-110 transition-transform duration-500">
                  {event.icon}
                </div>
                <h3 className="text-2xl font-serif text-royal-maroon mb-4">{event.title}</h3>
                
                <div className="space-y-3 text-royal-maroon/70 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4 text-royal-gold" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 text-royal-gold" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-start justify-center gap-2">
                    <MapPin className="w-4 h-4 text-royal-gold shrink-0 mt-0.5" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-royal-maroon/10 w-full">
                   <button className="text-royal-gold text-xs uppercase tracking-widest font-bold hover:text-royal-maroon transition-colors">
                     View on map
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
