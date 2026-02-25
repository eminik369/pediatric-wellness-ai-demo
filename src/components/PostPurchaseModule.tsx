"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HeartPulse, Clock, CheckCircle2, Bell, HelpCircle, Sun, Moon } from "lucide-react";

const purchasedProducts = [
  {
    id: 1,
    name: "ImmunoPed® BABY",
    purchaseDate: "10 Feb 2026",
    daysLeft: 12,
    totalDays: 30,
    routine: {
      time: "Mattina",
      icon: Sun,
      instruction: "Gocce da somministrare direttamente in bocca o mescolate a un po' di latte materno/artificiale",
      tips: [
        "Conservare in luogo fresco e asciutto",
        "Agitare bene il flacone prima dell'uso",
        "Può essere miscelato con latte a temperatura ambiente",
      ],
    },
  },
  {
    id: 2,
    name: "Pancino® Bustine",
    purchaseDate: "15 Feb 2026",
    daysLeft: 20,
    totalDays: 30,
    routine: {
      time: "Mattina (stomaco vuoto)",
      icon: Clock,
      instruction: "1 bustina sciolta in acqua o latte a temperatura ambiente, 15 minuti prima della colazione",
      tips: [
        "Non sciogliere in liquidi caldi (>37°C) — i fermenti sono termosensibili",
        "In caso di antibiotico: assumere a 2 ore di distanza",
        "Conservare in luogo fresco e asciutto",
      ],
    },
  },
  {
    id: 3,
    name: "PediaMente® Flaconcini",
    purchaseDate: "12 Feb 2026",
    daysLeft: 8,
    totalDays: 21,
    routine: {
      time: "Mattina prima della scuola",
      icon: Sun,
      instruction: "1 flaconcino al mattino, puro o diluito in poca acqua. Ideale prima dell'attività scolastica",
      tips: [
        "Agitare bene il flaconcino prima di aprire",
        "Può essere miscelato con un po' di succo di frutta",
        "Ideale per periodi di studio intenso",
      ],
    },
  },
];

const faq = [
  {
    question: "Il mio bambino rifiuta le gocce di ImmunoPed® BABY. Come posso fare?",
    answer: "Prova a mescolare le gocce con un po' di latte materno o artificiale a temperatura ambiente. Puoi anche somministrarle direttamente in bocca con il contagocce, nella parte interna della guancia. Il gusto è neutro e generalmente ben accettato.",
  },
  {
    question: "Posso dare ImmunoPed® BABY e Pancino® insieme?",
    answer: "Sì, sono prodotti complementari con meccanismi diversi. ImmunoPed® BABY lavora sulle difese immunitarie, Pancino® sulla flora intestinale. Si consiglia di dare Pancino® a stomaco vuoto e ImmunoPed® durante il pasto per un assorbimento ottimale.",
  },
  {
    question: "Ho dimenticato una dose, cosa faccio?",
    answer: "Non preoccuparti, salta la dose dimenticata e continua normalmente il giorno successivo. Non raddoppiare la dose. Una dimenticanza occasionale non compromette l'efficacia del ciclo.",
  },
  {
    question: "Per quanto tempo devo continuare il ciclo?",
    answer: "Il ciclo consigliato è di 30 giorni per ImmunoPed® BABY e Pancino®, 21 giorni per PediaMente®. Consulta il pediatra per eventuali estensioni o cicli ripetuti. Per il cambio stagione, si consigliano cicli ripetuti a distanza di 1 mese.",
  },
];

export default function PostPurchaseModule() {
  const [selectedProduct, setSelectedProduct] = useState<number>(1);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const product = purchasedProducts.find((p) => p.id === selectedProduct)!;
  const progressPct = ((product.totalDays - product.daysLeft) / product.totalDays) * 100;

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {purchasedProducts.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedProduct(p.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              selectedProduct === p.id
                ? "bg-rose-500 text-white shadow-lg"
                : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-rose-50"
            }`}
          >
            <HeartPulse className="w-4 h-4" />
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <motion.div
            key={product.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--border)]/30"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{product.name}</h3>
              <span className="text-xs text-[var(--text-tertiary)]">Acquistato: {product.purchaseDate}</span>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-[var(--text-secondary)]">Progresso ciclo</span>
                <span className="font-medium">{Math.round(progressPct)}%</span>
              </div>
              <div className="h-3 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-rose-500 to-pink-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)] mt-1.5">
                <span>{product.totalDays - product.daysLeft} giorni completati</span>
                <span>{product.daysLeft} giorni rimanenti</span>
              </div>
            </div>

            {product.daysLeft <= 10 && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 flex items-center gap-3">
                <Bell className="w-4 h-4 text-amber-500" />
                <div className="text-xs">
                  <p className="font-medium text-amber-800">Scorte in esaurimento</p>
                  <p className="text-amber-700">
                    {product.daysLeft} giorni rimanenti — riordina ora per non interrompere il ciclo
                  </p>
                </div>
                <button className="ml-auto px-3 py-1.5 bg-amber-500 text-white text-xs font-medium rounded-lg hover:bg-amber-600 transition-colors flex-shrink-0">
                  Riordina
                </button>
              </div>
            )}
          </motion.div>

          <motion.div
            key={`routine-${product.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--border)]/30"
          >
            <h3 className="font-semibold mb-4">Routine Giornaliera</h3>
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-400 flex items-center justify-center">
                  <product.routine.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm">{product.routine.time}</p>
                  <p className="text-xs text-rose-700">{product.routine.instruction}</p>
                </div>
              </div>
              <div className="space-y-1.5 ml-[52px]">
                {product.routine.tips.map((tip, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-rose-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-500" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--border)]/30">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-rose-500" />
            Domande Frequenti
          </h3>
          <div className="space-y-2">
            {faq.map((item, i) => (
              <div key={i} className="border border-[var(--border)]/30 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full p-4 flex items-start justify-between text-left hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  <span className="text-sm font-medium pr-4">{item.question}</span>
                  <motion.span
                    animate={{ rotate: expandedFaq === i ? 180 : 0 }}
                    className="text-[var(--text-tertiary)] flex-shrink-0 mt-0.5"
                  >
                    ▾
                  </motion.span>
                </button>
                {expandedFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-4"
                  >
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-secondary)] p-3 rounded-lg">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
