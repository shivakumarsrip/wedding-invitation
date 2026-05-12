import { motion } from 'motion/react';
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const RSVP: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    guests: '1',
    attendance: 'yes',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const path = 'rsvps';
      await addDoc(collection(db, path), {
        name: formData.name,
        guests: formData.guests,
        attendance: formData.attendance,
        message: formData.message,
        createdAt: serverTimestamp()
      });

      setIsSubmitted(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#800020', '#FFFDD0']
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'rsvps');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="rsvp" className="py-24 px-6 bg-cream text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto glass-card p-12 rounded-3xl"
        >
          <div className="w-20 h-20 bg-royal-gold/20 rounded-full flex items-center justify-center text-royal-gold mx-auto mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 className="text-4xl font-serif text-royal-maroon mb-4">Shukriya!</h2>
          <p className="text-xl text-royal-maroon/70">Thank you for your response. We can't wait to celebrate with you!</p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-24 px-6 bg-cream relative overflow-hidden">
        {/* Decorative borders */}
        <div className="absolute top-0 inset-x-0 h-4 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] opacity-20 border-t border-royal-gold/20" />

      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl text-royal-maroon mb-4">Are You Coming?</h2>
          <p className="text-royal-gold font-serif italic text-lg">Please RSVP by October 15, 2026</p>
          <div className="floral-divider" />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="glass-card bg-sandalwood/20 p-8 md:p-12 rounded-3xl shadow-inner relative z-10"
        >
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-royal-maroon text-sm font-semibold uppercase tracking-widest mb-2">Guest Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/50 border border-royal-maroon/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-royal-gold transition-all"
                  placeholder="Your Full Name"
                />
              </div>

              <div>
                <label className="block text-royal-maroon text-sm font-semibold uppercase tracking-widest mb-2">Number of Guests</label>
                <select 
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  className="w-full bg-white/50 border border-royal-maroon/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-royal-gold transition-all"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="3">Small Family (3-4)</option>
                  <option value="5">Group (5+)</option>
                </select>
              </div>

              <div>
                <label className="block text-royal-maroon text-sm font-semibold uppercase tracking-widest mb-2">Attendance</label>
                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, attendance: 'yes'})}
                    className={`flex-1 py-3 rounded-lg border transition-all ${formData.attendance === 'yes' ? 'bg-royal-maroon text-royal-gold border-royal-gold' : 'bg-white/50 border-royal-maroon/10 text-royal-maroon hover:border-royal-gold'}`}
                  >
                    Joyfully Attend
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, attendance: 'no'})}
                    className={`flex-1 py-3 rounded-lg border transition-all ${formData.attendance === 'no' ? 'bg-royal-maroon text-royal-gold border-royal-gold' : 'bg-white/50 border-royal-maroon/10 text-royal-maroon hover:border-royal-gold'}`}
                  >
                    Regretfully Decline
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex-1">
                <label className="block text-royal-maroon text-sm font-semibold uppercase tracking-widest mb-2">Message for the Couple</label>
                <textarea 
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/50 border border-royal-maroon/10 rounded-lg px-4 py-4 focus:outline-none focus:ring-1 focus:ring-royal-gold transition-all resize-none"
                  placeholder="Write something sweet..."
                />
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`royal-button w-full shadow-lg transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-royal-gold/20'}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Response'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
