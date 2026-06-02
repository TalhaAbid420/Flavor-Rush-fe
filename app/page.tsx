"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import flavorRushLogo from "@/public/Flavor Rush logo.png";
import burgerHeroOne from "@/public/carousel-1.jpg";
import burgerHeroTwo from "@/public/carousel-2.jpg";
import burgerHeroThree from "@/public/carousel-3.jpg";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Second section animations: horizontal slide in for images
  const leftImageX = useTransform(scrollYProgress, [0.1, 0.5], [-1000, 0]);
  const rightImageX = useTransform(scrollYProgress, [0.1, 0.5], [1000, 0]);
  
  // Text appears after images meet
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0.5, 0.8], [0.8, 1]);
  const textY = useTransform(scrollYProgress, [0.5, 0.8], [50, 0]);

  return (
    <main className="min-h-screen bg-zinc-50 selection:bg-yellow-400 selection:text-zinc-900">
      {/* Header/Nav - Modern Floating Glass Pill */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] w-[92%] max-w-5xl bg-black/30 backdrop-blur-2xl px-4 py-3 sm:px-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] flex items-center justify-between border border-white/20 rounded-full transition-all duration-300 hover:bg-black/40">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-1.5 rounded-full border border-white/10 shadow-inner">
            <Image src={flavorRushLogo} alt="Flavor Rush logo" width={36} height={36} priority className="drop-shadow-lg" />
          </div>
          <h1 className="text-lg sm:text-2xl font-black tracking-widest text-white uppercase drop-shadow-md">Flavor Rush</h1>
        </div>
        <Link 
          href="/menu"
          className="rounded-full bg-yellow-400 px-5 py-2 sm:px-8 sm:py-3 text-sm sm:text-base font-black uppercase text-zinc-900 shadow-[0_4px_0_#ca8a0480] transition-all hover:bg-yellow-300 active:translate-y-[4px] active:shadow-none hover:scale-105"
        >
          View Menu
        </Link>
      </header>

      {/* Section 1: Hero */}
      <section className="relative h-screen flex flex-col items-center justify-center bg-zinc-900 text-white overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src={burgerHeroOne}
            alt="Hero background"
            fill
            priority
            className="object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/60 to-zinc-900"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white drop-shadow-xl mb-6"
          >
            Taste the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 drop-shadow-none">Happiness</span>
          </motion.h1>
          <motion.p
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-lg sm:text-2xl text-zinc-300 mb-10 max-w-2xl mx-auto font-medium"
          >
            Experience the finest flavors crafted with passion and fresh ingredients. Your next favorite meal is just a click away.
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link 
              href="/menu"
              className="inline-block rounded-full bg-yellow-400 px-8 py-4 text-lg font-black uppercase text-zinc-900 shadow-[0_6px_0_#ca8a0480] transition-all hover:bg-yellow-300 active:translate-y-[6px] active:shadow-none hover:scale-105"
            >
              Order Now
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">Scroll Down</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-zinc-400 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Section 2: Sticky Scroll */}
      <section ref={containerRef} className="relative h-[300vh] bg-zinc-900">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="w-full h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-center relative">
            
            {/* Left Image */}
            <motion.div 
              style={{ x: leftImageX }}
              className="absolute left-4 md:left-10 top-1/4 md:top-1/2 md:-translate-y-1/2 w-[40vw] md:w-80 max-w-sm aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/10"
            >
              <Image 
                src={burgerHeroTwo}
                alt="Loaded sandwich"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Right Image */}
            <motion.div 
              style={{ x: rightImageX }}
              className="absolute right-4 md:right-10 bottom-1/4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 w-[40vw] md:w-80 max-w-sm aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/10"
            >
              <Image 
                src={burgerHeroThree}
                alt="Burger and wraps"
                fill
                className="object-cover" 
              />
            </motion.div>

            {/* Center Text appearing over/between the images */}
            <motion.div 
              style={{ opacity: textOpacity, scale: textScale, y: textY }}
              className="relative z-20 bg-zinc-900/85 backdrop-blur-xl p-8 sm:p-12 rounded-[2rem] text-center max-w-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
                Handcrafted <br />
                <span className="text-yellow-400">Perfection</span>
              </h2>
              <p className="text-zinc-300 text-lg sm:text-xl leading-relaxed mb-8">
                We believe in quality without compromise. Every pizza is hand-tossed, every burger is made to order, and every ingredient is selected for its superior taste and freshness.
              </p>
              <Link 
                href="/menu"
                className="inline-flex items-center justify-center gap-2 text-yellow-400 font-bold text-lg hover:text-yellow-300 transition-colors group"
              >
                Explore our menu 
                <span className="text-2xl transition-transform group-hover:translate-x-2">&rarr;</span>
              </Link>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Section 3: Features */}
      <section className="py-24 sm:py-32 bg-gradient-to-br from-red-600 via-red-700 to-zinc-900 relative z-20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
        <div className="absolute -left-40 top-20 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl mix-blend-overlay"></div>
        <div className="absolute -right-40 bottom-20 w-96 h-96 bg-red-900/40 rounded-full blur-3xl mix-blend-overlay"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight drop-shadow-md">Why Choose Us?</h2>
            <div className="w-24 h-1.5 bg-yellow-400 mx-auto mt-6 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Fresh Ingredients",
                desc: "Sourced locally and prepared daily to ensure maximum flavor and quality in every bite.",
                icon: "🥬"
              },
              {
                title: "Lightning Fast",
                desc: "Hot and fresh to your doorstep. We take pride in our rapid delivery network.",
                icon: "⚡"
              },
              {
                title: "Secret Recipes",
                desc: "Our unique spice blends and house-made sauces will keep you coming back for more.",
                icon: "🤫"
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-xl p-10 rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/20 flex flex-col items-center text-center relative overflow-hidden group"
              >
                {/* Subtle shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full"></div>
                
                <div className="text-6xl mb-8 bg-red-900/30 border border-white/10 w-24 h-24 flex items-center justify-center rounded-full shadow-inner relative z-10 group-hover:bg-yellow-400/20 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-4 relative z-10 drop-shadow-sm">{feature.title}</h3>
                <p className="text-zinc-100 leading-relaxed text-lg relative z-10">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Call to Action */}
      <section className="py-24 sm:py-32 bg-yellow-400 relative z-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl sm:text-7xl font-black text-zinc-900 mb-8 uppercase tracking-tight">
            Ready for <br className="sm:hidden" /> a rush?
          </h2>
          <p className="text-xl sm:text-2xl text-zinc-800 mb-12 font-medium max-w-2xl mx-auto">
            Join thousands of happy customers and treat yourself to the best flavors in town. Don't let your cravings wait.
          </p>
          <Link 
            href="/menu"
            className="inline-block rounded-full bg-red-600 px-12 py-5 text-xl font-black uppercase text-white shadow-[0_8px_0_#991b1b80] transition-all hover:bg-red-500 active:translate-y-[8px] active:shadow-none hover:scale-105"
          >
            Start Your Order
          </Link>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="bg-zinc-900 py-12 text-center text-zinc-400 relative z-20 border-t border-zinc-800">
        <Image src={flavorRushLogo} alt="Logo" width={40} height={40} className="mx-auto mb-4 grayscale opacity-50" />
        <p className="font-medium text-sm">Copyright © {new Date().getFullYear()} Flavor Rush - All rights reserved</p>
      </footer>

    </main>
  );
}
