import { motion } from 'motion/react';
import React, { useState, useEffect } from 'react';

export const Countdown: React.FC = () => {
  const targetDate = new Date('2026-06-25T10:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000"
          alt="Wedding Decor"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-royal-maroon/80 mix-blend-multiply" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-cream font-accent text-4xl md:text-5xl mb-12"
        >
          Counting Down to Our Forever
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-royal-gold/30 flex flex-col items-center"
            >
              <span className="text-4xl md:text-6xl font-serif text-royal-gold mb-2 tabular-nums">
                {unit.value < 10 ? `0${unit.value}` : unit.value}
              </span>
              <span className="text-sandalwood text-xs uppercase tracking-[0.3em] font-medium">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
