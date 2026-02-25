"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ArrowLeft,
  Leaf,
  ChevronRight,
  Info,
} from "lucide-react";
import ParentGuideModule from "@/components/ParentGuideModule";
import EducationModule from "@/components/EducationModule";
import SafetyModule from "@/components/SafetyModule";
import ProfessionalModule from "@/components/ProfessionalModule";
import PostPurchaseModule from "@/components/PostPurchaseModule";
import WellnessCheckModule from "@/components/WellnessCheckModule";
import OutreachB2BModule from "@/components/OutreachB2BModule";

const modules = [
  { id: "parent", icon: Baby, title: "Guida Genitori", subtitle: "Navigazione Prodotti", gradient: "from-green-500 to-emerald-400" },
  { id: "education", icon: BookOpen, title: "Educazione & Prevenzione", subtitle: "Cura Preventiva", gradient: "from-sky-500 to-blue-400" },
  { id: "safety", icon: ShieldCheck, title: "Sicurezza Prodotto", subtitle: "Smart Safety", gradient: "from-violet-500 to-purple-400" },
  { id: "professional", icon: Stethoscope, title: "Supporto Professionisti", subtitle: "Healthcare Pro", gradient: "from-amber-500 to-orange-400" },
  { id: "postpurchase", icon: HeartPulse, title: "Post-Acquisto", subtitle: "Assistenza", gradient: "from-rose-500 to-pink-400" },
  { id: "wellness", icon: Globe, title: "Wellness Check", subtitle: "Engagement Web", gradient: "from-teal-500 to-cyan-400" },
  { id: "outreach", icon: Users, title: "Outreach B2B", subtitle: "Relazioni Pro", gradient: "from-indigo-500 to-violet-400" },
];

const moduleComponents: Record<string, React.ComponentType> = {
  parent: ParentGuideModule,
  education: EducationModule,
  safety: SafetyModule,
  professional: ProfessionalModule,
  postpurchase: PostPurchaseModule,
  wellness: WellnessCheckModule,
  outreach: OutreachB2BModule,
};

export default function DemoPage() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const ActiveComponent = activeModule ? moduleComponents[activeModule] : null;
  const activeModuleData = modules.find((m) => m.id === activeModule);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Indietro</span>
            </Link>
            <div className="w-px h-6 bg-[var(--border)]" />
            <div className="flex items-center gap-2">
              <Image src="/logo-horizontal.png" alt="EE Partner" width={120} height={34} className="h-8 w-auto" />
              <span className="text-[var(--text-tertiary)] text-sm">|</span>
              <span className="font-semibold text-sm">Demo Interattiva</span>
            </div>
          </div>
          {activeModule && (
            <button
              onClick={() => setActiveModule(null)}
              className="text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors font-medium"
            >
              Tutti i Moduli
            </button>
          )}
        </div>
      </div>

      {/* Demo Banner */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-green-50/90 backdrop-blur-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-2 flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-green-500 flex-shrink-0" />
          <p className="text-xs text-green-600 font-medium">
            Demo interattiva — Tutti i dati sono simulati a scopo dimostrativo
          </p>
        </div>
      </div>

      <div className="pt-[88px]">
        <AnimatePresence mode="wait">
          {!activeModule ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-12"
            >
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Seleziona un Modulo</h1>
                <p className="text-[var(--text-secondary)] text-lg">Esplora ciascuna funzionalità dell'assistente AI</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                {modules.map((mod, i) => (
                  <motion.button
                    key={mod.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    onClick={() => setActiveModule(mod.id)}
                    className="group relative p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--border)]/30 text-left card-hover overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className={`absolute inset-0 bg-gradient-to-br ${mod.gradient} opacity-[0.03]`} />
                    </div>
                    <div className="relative flex items-start justify-between">
                      <div>
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${mod.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                          <mod.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-1">
                          {mod.subtitle}
                        </div>
                        <h3 className="text-lg font-semibold">{mod.title}</h3>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[var(--text-tertiary)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all mt-1" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 py-8"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activeModuleData?.gradient} flex items-center justify-center shadow-lg`}>
                  {activeModuleData && <activeModuleData.icon className="w-6 h-6 text-white" />}
                </div>
                <div>
                  <div className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    {activeModuleData?.subtitle}
                  </div>
                  <h2 className="text-2xl font-bold">{activeModuleData?.title}</h2>
                </div>
              </div>
              {ActiveComponent && <ActiveComponent />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
