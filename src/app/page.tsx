"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Baby,
  BookOpen,
  ShieldCheck,
  Stethoscope,
  HeartPulse,
  Globe,
  Users,
  ArrowRight,
  Sparkles,
  Leaf,
  Heart,
  ChevronDown,
  Info,
} from "lucide-react";

const features = [
  {
    icon: Baby,
    title: "Guida Genitori",
    subtitle: "Navigazione Prodotti",
    description:
      "Aiuta i genitori a trovare i prodotti giusti per i bisogni del bambino, con un percorso intuitivo e rassicurante che mette il benessere al primo posto.",
    gradient: "from-green-500 to-emerald-400",
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    icon: BookOpen,
    title: "Educazione & Prevenzione",
    subtitle: "Cura Preventiva",
    description:
      "Contenuti educativi su immunità, sonno, digestione e benessere respiratorio. Informazioni affidabili per genitori consapevoli.",
    gradient: "from-sky-500 to-blue-400",
    color: "text-sky-500",
    bg: "bg-sky-50",
  },
  {
    icon: ShieldCheck,
    title: "Sicurezza Prodotto",
    subtitle: "Raccomandazioni Smart",
    description:
      "Controllo automatico di idoneità per età, dosaggi, controindicazioni e sovrapposizioni. La sicurezza dei bambini prima di tutto.",
    gradient: "from-violet-500 to-purple-400",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    icon: Stethoscope,
    title: "Supporto Professionisti",
    subtitle: "Healthcare Pro",
    description:
      "Informazioni scientifiche rapide per pediatri e farmacisti: ingredienti, formulazioni, profili d'uso e materiali condivisibili.",
    gradient: "from-amber-500 to-orange-400",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: HeartPulse,
    title: "Post-Acquisto",
    subtitle: "Assistenza Clienti",
    description:
      "Guide d'uso, routine giornaliere, promemoria riordino e supporto per la somministrazione ai bambini.",
    gradient: "from-rose-500 to-pink-400",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    icon: Globe,
    title: "Wellness Check",
    subtitle: "Engagement Sito Web",
    description:
      "Check-up benessere interattivo per i visitatori del sito. Genera uno snapshot personalizzato e suggerimenti preventivi.",
    gradient: "from-teal-500 to-cyan-400",
    color: "text-teal-500",
    bg: "bg-teal-50",
  },
  {
    icon: Users,
    title: "Outreach B2B",
    subtitle: "Relazioni Professionali",
    description:
      "Intelligence per identificare cliniche, farmacie e distributori. Messaggi personalizzati e follow-up strategici.",
    gradient: "from-indigo-500 to-violet-400",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
];

const stats = [
  { value: "92%", label: "Genitori soddisfatti" },
  { value: "50+", label: "Prodotti nutraceutici" },
  { value: "3min", label: "Tempo medio consulenza" },
  { value: "100%", label: "Sicurezza verificata" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <main className="relative">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 glass"
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo-horizontal.png" alt="EE Partner" width={140} height={40} className="h-9 w-auto" />
          </div>
          <Link
            href="/demo"
            className="px-5 py-2 bg-[var(--accent)] text-white text-sm font-medium rounded-full hover:bg-[var(--accent-hover)] transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25"
          >
            Prova la Demo
          </Link>
        </div>
      </motion.nav>

      {/* Demo Banner */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-green-50/90 backdrop-blur-sm border-b border-green-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 py-2 flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-green-500 flex-shrink-0" />
          <p className="text-xs text-green-600 font-medium">
            Questa è una demo interattiva — Tutti i dati mostrati sono simulati a scopo dimostrativo
          </p>
        </div>
      </div>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="orb w-[600px] h-[600px] bg-green-300 top-[-200px] right-[-200px]" />
        <div className="orb w-[400px] h-[400px] bg-teal-300 bottom-[-100px] left-[-100px]" />
        <div className="orb w-[300px] h-[300px] bg-emerald-200 top-[30%] left-[20%]" />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 md:px-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10"
          >
            <Image src="/logo-full.png" alt="EE Partner" width={200} height={200} className="h-32 w-auto mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 mb-8"
          >
            <Sparkles className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-green-600">Powered by AI</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.05] mb-6"
          >
            Il benessere dei
            <br />
            <span className="gradient-text">tuoi bambini.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Un assistente AI che guida le famiglie nella scelta dei prodotti nutraceutici,
            educa alla prevenzione e supporta i professionisti sanitari.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/demo"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white text-lg font-medium rounded-full hover:bg-[var(--accent-hover)] transition-all duration-300 hover:shadow-xl hover:shadow-green-500/25 hover:scale-105"
            >
              Esplora la Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/80 backdrop-blur text-[var(--text-primary)] text-lg font-medium rounded-full border border-[var(--border)] hover:bg-white transition-all duration-300 hover:shadow-lg"
            >
              Scopri le Funzionalità
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-20"
          >
            <ChevronDown className="w-6 h-6 text-[var(--text-tertiary)] mx-auto animate-bounce" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeInUp} className="text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-[var(--text-secondary)]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Progettato con cura.
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Ogni dettaglio è pensato per la sicurezza e il benessere dei bambini.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Heart,
                title: "Fiducia & Sicurezza",
                desc: "Ogni raccomandazione è verificata per età, dosaggio e sicurezza. Mai diagnosi, sempre prevenzione responsabile.",
              },
              {
                icon: Leaf,
                title: "Educazione Prima di Tutto",
                desc: "Informare e rassicurare i genitori è la priorità. La vendita è una conseguenza naturale della fiducia.",
              },
              {
                icon: Stethoscope,
                title: "Credibilità Scientifica",
                desc: "Supporto ai professionisti sanitari con dati, formulazioni e razionale scientifico accessibile e condivisibile.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="relative p-8 rounded-[var(--radius-lg)] bg-[var(--bg-tertiary)] border border-[var(--border)]/50 card-hover"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Sette moduli.<br />Un ecosistema di benessere.
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Dalla guida genitori al supporto professionisti, ogni aspetto è coperto dall'AI.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className={`relative p-8 rounded-[var(--radius-lg)] bg-white border border-[var(--border)]/30 card-hover overflow-hidden ${
                  i === features.length - 1 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <div className={`w-full h-full bg-gradient-to-br ${feature.gradient} rounded-full blur-2xl`} />
                </div>
                <div className="relative">
                  <div className={`w-12 h-12 rounded-2xl ${feature.bg} flex items-center justify-center mb-5`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <div className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-1">
                    {feature.subtitle}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Come funziona.</h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Tre passaggi per il benessere del tuo bambino.
            </p>
          </motion.div>

          <div className="space-y-12">
            {[
              {
                step: "01",
                title: "Racconta",
                desc: "Il genitore descrive l'età del bambino, i bisogni e le preoccupazioni. L'AI ascolta e comprende in modo empatico e rassicurante.",
              },
              {
                step: "02",
                title: "Scopri",
                desc: "L'assistente suggerisce prodotti adatti, offre consigli preventivi e guide educative. Tutto verificato per sicurezza e idoneità.",
              },
              {
                step: "03",
                title: "Cresci",
                desc: "Supporto continuo post-acquisto con routine personalizzate, promemoria e contenuti educativi per accompagnare la crescita del bambino.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-6 p-6 rounded-[var(--radius-lg)] bg-[var(--bg-tertiary)] border border-[var(--border)]/30"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg font-bold">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-green-300 top-[-100px] left-[50%] -translate-x-1/2" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 md:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image src="/logo-full.png" alt="EE Partner" width={160} height={160} className="h-24 w-auto mx-auto mb-8" />
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Pronto a scoprire<br />il futuro del benessere?
            </h2>
            <p className="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
              Esplora la demo interattiva e scopri come l'AI può supportare
              le famiglie e i professionisti nel mondo pediatrico.
            </p>
            <Link
              href="/demo"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-[var(--text-primary)] text-white text-lg font-medium rounded-full hover:bg-[var(--text-primary)]/90 transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              Avvia la Demo Interattiva
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[var(--border)]/50">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 flex items-center justify-between text-sm text-[var(--text-tertiary)]">
          <div className="flex items-center gap-2">
            <Image src="/logo-horizontal.png" alt="EE Partner" width={100} height={28} className="h-7 w-auto" />
          </div>
          <span>Demo — Tutti i dati sono simulati</span>
        </div>
      </footer>
    </main>
  );
}
