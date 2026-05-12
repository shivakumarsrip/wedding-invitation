import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';

export const PetalBackground: React.FC = () => {
    const [petals, setPetals] = useState<any[]>([]);

    useEffect(() => {
        const petalCount = 20;
        const newPetals = Array.from({ length: petalCount }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 10,
            duration: 10 + Math.random() * 10,
            size: 10 + Math.random() * 20,
            rotation: Math.random() * 360,
        }));
        setPetals(newPetals);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            {petals.map((petal) => (
                <motion.div
                    key={petal.id}
                    initial={{ y: -50, x: petal.left + "vw", rotate: petal.rotation, opacity: 0 }}
                    animate={{ 
                        y: "110vh", 
                        x: (petal.left + (Math.random() * 20 - 10)) + "vw",
                        rotate: petal.rotation + 720,
                        opacity: [0, 0.6, 0.6, 0]
                    }}
                    transition={{ 
                        duration: petal.duration, 
                        repeat: Infinity, 
                        delay: petal.delay,
                        ease: "linear"
                    }}
                    className="absolute"
                >
                    <svg 
                        width={petal.size} 
                        height={petal.size} 
                        viewBox="0 0 24 24" 
                        fill="#D4AF37" 
                        style={{ opacity: 0.3 }}
                    >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
};
