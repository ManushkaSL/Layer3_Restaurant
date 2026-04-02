/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "motion/react";
import { 
  Menu, 
  X, 
  ArrowRight, 
  Instagram, 
  Facebook, 
  MapPin, 
  Phone, 
  Clock,
  ChevronDown,
  UtensilsCrossed
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

// Subtle hover sound
const playHoverSound = () => {
  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.05);

  gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.05);
};

const CustomCursor = () => {
  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div 
        className="custom-cursor hidden md:block"
        style={{ x: cursorX, y: cursorY }}
      />
      <motion.div 
        className="custom-cursor-outline hidden md:block"
        style={{ 
          x: useSpring(cursorX, { stiffness: 250, damping: 20 }), 
          y: useSpring(cursorY, { stiffness: 250, damping: 20 }),
          left: -10,
          top: -10
        }}
      />
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      className="fixed top-0 left-0 w-full z-50 py-6 transition-all duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-display font-bold tracking-tighter"
          onMouseEnter={playHoverSound}
        >
          LAYER<span className="text-brand-gold">³</span>
        </motion.div>

        <div className="hidden md:flex space-x-12 items-center">
          {["Concept", "Menu", "Reserve", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[10px] uppercase tracking-[0.4em] font-medium hover:text-brand-gold transition-colors"
              onMouseEnter={playHoverSound}
            >
              {item}
            </a>
          ))}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden hover:text-brand-gold transition-colors" onMouseEnter={playHoverSound}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </motion.nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const [videoError, setVideoError] = useState(false);
  
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0 grayscale-0 opacity-60">
        {!videoError ? (
          <video 
            src="/vdo.mp4"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={() => setVideoError(true)}
          />
        ) : (
          <img 
            src="https://images.unsplash.com/photo-1534422298391-e4f8c170db06?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-brand-black/60 to-brand-black" />
      </motion.div>
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1 className="text-7xl md:text-9xl font-sans tracking-tighter mb-6 drop-shadow-2xl">
            L A Y E R<span className="text-brand-gold">³</span>
          </h1>
          <p className="text-brand-white/60 font-sans tracking-[0.6em] uppercase text-[10px] md:text-xs">
            The Art of Minimalist Dining
          </p>
        </motion.div>
      </div>
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        clheherassName="absolute bottom-12 left-1/2 -translate-x-1/2 text-brand-gold/40"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const bgColor = useTransform(scrollYProgress, [0.3, 0.5], ["#0B0B0B", "#F5F5F5"]);
  const textColor = useTransform(scrollYProgress, [0.3, 0.5], ["#F5F5F5", "#0B0B0B"]);

  return (
    <motion.div style={{ backgroundColor: bgColor, color: textColor }} className="min-h-screen font-sans">
      <CustomCursor />
      <Navbar />
      <Hero />

      <section id="concept" className="py-32 px-6 md:px-12 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold mb-4 block">Philosophy</span>
          <h2 className="text-5xl font-serif italic mb-8">Pure Contrast</h2>
          <p className="text-lg font-light leading-relaxed opacity-80">
            We believe in the power of simplicity. Our kitchen focuses on three distinct layers: 
            The Raw, The Processed, and The Final. Every dish is a study in texture and monochrome aesthetics.
          </p>
        </motion.div>
        <div className="aspect-square bg-gray-900 overflow-hidden grayscale relative">
          <div className="absolute inset-0 border-2 border-brand-gold/20 m-6 pointer-events-none" />
          <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000" className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
        </div>
      </section>

      <section id="menu" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-center space-x-8 mb-20">
          <div className="h-[1px] w-12 bg-brand-gold" />
          <h2 className="text-5xl font-serif italic text-center">The Collection</h2>
          <div className="h-[1px] w-12 bg-brand-gold" />
        </div>
        <div className="grid md:grid-cols-2 gap-16">
          {[
            { n: "Obsidian Risotto", d: "Black rice, squid ink, gold leaf", p: "45" },
            { n: "Marble Wagyu", d: "A5 beef, white truffle, ash", p: "110" },
            { n: "Pearl Scallop", d: "Cauliflower silk, sea foam", p: "55" },
            { n: "Lunar Sphere", d: "White chocolate, charcoal, smoke", p: "30" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              onMouseEnter={playHoverSound}
              className="border-b border-current/20 pb-8 group cursor-pointer hover:border-brand-gold transition-colors duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-medium uppercase tracking-widest group-hover:text-brand-gold transition-all">{item.n}</h3>
                <span className="font-serif italic text-lg text-brand-gold">{item.p}</span>
              </div>
              <p className="opacity-60 font-light">{item.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="showcase" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold mb-4 block">Visuals</span>
          <h2 className="text-5xl font-serif italic">The Plates</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800",
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800",
            "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800",
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800"
          ].map((src, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="aspect-[3/4] overflow-hidden bg-gray-900 relative group cursor-crosshair border border-brand-gold/0 hover:border-brand-gold/50 transition-all duration-700"
              onMouseEnter={playHoverSound}
            >
              <motion.img 
                src={src} 
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-32 text-center">
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#C9A14A", color: "#0B0B0B" }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-5 border border-brand-gold text-brand-gold text-xs uppercase tracking-[0.4em] font-bold transition-all duration-500"
        >
          Reserve Your Table
        </motion.button>
      </section>

      <footer id="contact" className="py-32 px-6 md:px-12 border-t border-current/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-bold mb-6">LAYER<span className="text-brand-gold">³</span></h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <Instagram size={20} onMouseEnter={playHoverSound} className="cursor-pointer hover:text-brand-gold transition-colors" />
              <Facebook size={20} onMouseEnter={playHoverSound} className="cursor-pointer hover:text-brand-gold transition-colors" />
            </div>
          </div>
          <div className="space-y-2 opacity-70">
            <p className="text-[10px] uppercase tracking-widest font-bold mb-4 text-brand-gold">Visit</p>
            <p>77 Monochrome St.</p>
            <p>New York, NY 10012</p>
          </div>
          <div className="space-y-2 opacity-70">
            <p className="text-[10px] uppercase tracking-widest font-bold mb-4 text-brand-gold">Hours</p>
            <p>Tue - Sat: 18:00 - Late</p>
            <p>Sun - Mon: Closed</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
