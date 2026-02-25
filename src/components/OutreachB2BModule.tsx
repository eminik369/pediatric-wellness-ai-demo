"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Star, Mail, Building2, Clock, ChevronRight,
  Stethoscope, Pill, Package, MessageSquare, CheckCircle2, Zap,
} from "lucide-react";

const partners = [
  {
    id: 1,
    name: "Studio Pediatrico Dr. Verdi",
    type: "Clinica Pediatrica",
    icon: Stethoscope,
    score: 95,
    status: "hot",
    triggers: ["3 pediatri nello studio", "Area ad alta natalità", "Interesse mostrato a congresso"],
    potential: "Alto",
    lastContact: "Incontro a congresso 2 settimane fa",
    suggested: "Follow-up post-congresso con presentazione prodotti",
  },
  {
    id: 2,
    name: "Farmacia Centrale — Dr.ssa Russo",
    type: "Farmacia",
    icon: Pill,
    score: 82,
    status: "warm",
    triggers: ["Alta rotazione prodotti pediatrici", "Reparto parafarmacia dedicato"],
    potential: "Medio-Alto",
    lastContact: "Nessun contatto precedente",
    suggested: "Email introduttiva con catalogo pediatrico",
  },
  {
    id: 3,
    name: "MedBaby Distributori S.r.l.",
    type: "Distributore",
    icon: Package,
    score: 88,
    status: "hot",
    triggers: ["Distribuzione in 150+ farmacie", "Ampliamento linea pediatrica", "Partnership competitor in scadenza"],
    potential: "Molto Alto",
    lastContact: "Referral da partner esistente",
    suggested: "Proposta partnership distributiva con esclusiva regionale",
  },
  {
    id: 4,
    name: "Ospedale San Carlo — Neonatologia",
    type: "Centro Neonatale",
    icon: Building2,
    score: 75,
    status: "warm",
    triggers: ["500+ nascite/anno", "Programma di dimissione neonatale"],
    potential: "Alto",
    lastContact: "Mai contattato",
    suggested: "Presentazione accademica con focus su evidenze cliniche",
  },
];

const outreachTemplates = {
  email: {
    subject: "Collaborazione scientifica — Gruppo Pediatrica - Integratori Pediatrici",
    body: `Gentile Dr. Verdi,

È stato un piacere incontrarla al Congresso di Pediatria Preventiva della scorsa settimana. La sua presentazione sull'importanza della supplementazione nella prima infanzia era molto in linea con la nostra missione.

Gruppo Pediatrica è un'azienda toscana con oltre 20 anni di esperienza nella nutraceutica pediatrica, con formulazioni basate sulle più recenti evidenze scientifiche:

• ImmunoPed® BABY — Lattoferrina, Vitamina D3, Zinco, FOS e GOS per le difese immunitarie (0-36 mesi)
• Pancino® Bustine — Lactobacillus rhamnosus GG, il ceppo più studiato in pediatria (raccomandato ESPGHAN)
• PediaMente® Flaconcini — Vitamine B, Fosfoserina, Ginkgo per memoria e concentrazione (6+ anni)

Saremmo lieti di inviarle campioni e la documentazione scientifica completa, oltre a organizzare una breve presentazione per il suo team.

Sarebbe disponibile per un incontro di 20 minuti la prossima settimana?

Cordiali saluti,
Dr.ssa Maria Conti
Medical Science Liaison — Gruppo Pediatrica`,
  },
  partnership: `Gentile Dr.ssa Russo,

Le scrivo come referente Gruppo Pediatrica per la sua area. Abbiamo notato che la sua farmacia è un punto di riferimento per le famiglie della zona, con un'attenzione particolare alla pediatria.

Vorremmo proporle di diventare un punto di consulenza Gruppo Pediatrica, con:
• Formazione gratuita per il team sui nostri prodotti (ImmunoPed®, Pancino®, PediaC® e tutta la linea)
• Materiali educativi e display dedicati
• Condizioni preferenziali e supporto marketing locale
• Accesso al nostro sistema di consulenza AI per i clienti

Tutti i prodotti Gruppo Pediatrica sono sviluppati da estratti naturali, made in Italy, con oltre 20 anni di esperienza nel benessere pediatrico.

Posso inviarle maggiori dettagli o passare per un breve incontro?`,
  followups: [
    { timing: "Entro 48 ore", action: "Follow-up email dopo congresso/incontro" },
    { timing: "1 settimana", action: "Invio campionatura e documentazione scientifica" },
    { timing: "2 settimane", action: "Chiamata per riscontro e fissare presentazione" },
    { timing: "1 mese", action: "Invito a webinar scientifico o evento locale" },
    { timing: "Trimestrale", action: "Aggiornamento su nuovi prodotti e studi clinici" },
  ],
};

export default function OutreachB2BModule() {
  const [selectedPartner, setSelectedPartner] = useState<number | null>(null);
  const [showOutreach, setShowOutreach] = useState(false);
  const [outreachType, setOutreachType] = useState<"email" | "partnership" | "followup">("email");

  const partner = partners.find((p) => p.id === selectedPartner);

  return (
    <div className="space-y-6">
      {/* Partner list */}
      <div className="p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--border)]/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Partner & Lead Qualificati</h3>
          <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
            <Zap className="w-3.5 h-3.5" />
            Scoring automatico AI
          </div>
        </div>

        <div className="space-y-2">
          {partners.map((p, i) => (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => { setSelectedPartner(p.id); setShowOutreach(false); }}
              className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                selectedPartner === p.id
                  ? "bg-indigo-50 border border-indigo-200"
                  : "bg-[var(--bg-secondary)] border border-transparent hover:border-indigo-200"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-400 flex items-center justify-center flex-shrink-0">
                <p.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{p.name}</span>
                  <span className={`w-2 h-2 rounded-full ${p.status === "hot" ? "bg-red-500" : "bg-amber-500"}`} />
                </div>
                <p className="text-xs text-[var(--text-tertiary)]">{p.type}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className={`text-lg font-bold ${p.score >= 85 ? "text-emerald-600" : "text-amber-600"}`}>{p.score}</div>
                <div className="text-[10px] text-[var(--text-tertiary)]">score</div>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--text-tertiary)] flex-shrink-0" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Partner detail */}
      {partner && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <div className="p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--border)]/30">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-400 flex items-center justify-center">
                <partner.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">{partner.name}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{partner.type}</p>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              {[
                { label: "Score", value: `${partner.score}/100` },
                { label: "Potenziale", value: partner.potential },
                { label: "Ultimo contatto", value: partner.lastContact },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm p-3 rounded-lg bg-[var(--bg-secondary)]">
                  <span className="text-[var(--text-tertiary)]">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="mb-5">
              <h4 className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-2">Trigger</h4>
              <div className="space-y-2">
                {partner.triggers.map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm p-2 rounded-lg bg-indigo-50 border border-indigo-100">
                    <Star className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                    <span className="text-indigo-800">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 mb-4">
              <p className="text-xs text-[var(--text-tertiary)] mb-1">Azione suggerita AI</p>
              <p className="text-sm text-emerald-800 font-medium">{partner.suggested}</p>
            </div>

            <button
              onClick={() => setShowOutreach(true)}
              className="w-full py-3 bg-[var(--accent)] text-white text-sm font-medium rounded-xl hover:bg-[var(--accent-hover)] transition-all"
            >
              Genera Comunicazione
            </button>
          </div>

          <AnimatePresence mode="wait">
            {showOutreach ? (
              <motion.div
                key="outreach"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex gap-1 p-1 rounded-xl bg-[var(--bg-secondary)]">
                  {[
                    { id: "email" as const, icon: Mail, label: "Email" },
                    { id: "partnership" as const, icon: Building2, label: "Partnership" },
                    { id: "followup" as const, icon: Clock, label: "Follow-up" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setOutreachType(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
                        outreachType === tab.id ? "bg-white shadow-sm" : "text-[var(--text-secondary)]"
                      }`}
                    >
                      <tab.icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {outreachType === "email" && (
                  <div className="p-5 rounded-[var(--radius-lg)] bg-white border border-[var(--border)]/30">
                    <div className="mb-3 pb-3 border-b border-[var(--border)]/30">
                      <p className="text-xs text-[var(--text-tertiary)]">Oggetto</p>
                      <p className="text-sm font-medium">{outreachTemplates.email.subject}</p>
                    </div>
                    <div className="text-sm leading-relaxed whitespace-pre-line text-[var(--text-secondary)] max-h-64 overflow-y-auto">
                      {outreachTemplates.email.body}
                    </div>
                    <div className="flex gap-2 mt-4 pt-4 border-t border-[var(--border)]/30">
                      <button className="px-4 py-2 bg-[var(--accent)] text-white text-xs font-medium rounded-lg">Invia</button>
                      <button className="px-4 py-2 bg-[var(--bg-secondary)] text-xs font-medium rounded-lg">Modifica</button>
                    </div>
                  </div>
                )}

                {outreachType === "partnership" && (
                  <div className="p-5 rounded-[var(--radius-lg)] bg-white border border-[var(--border)]/30">
                    <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[var(--border)]/30">
                      <Building2 className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm font-medium">Proposta Partnership</span>
                    </div>
                    <div className="text-sm leading-relaxed whitespace-pre-line text-[var(--text-secondary)]">
                      {outreachTemplates.partnership}
                    </div>
                    <div className="flex gap-2 mt-4 pt-4 border-t border-[var(--border)]/30">
                      <button className="px-4 py-2 bg-indigo-600 text-white text-xs font-medium rounded-lg">Copia Messaggio</button>
                    </div>
                  </div>
                )}

                {outreachType === "followup" && (
                  <div className="p-5 rounded-[var(--radius-lg)] bg-white border border-[var(--border)]/30">
                    <h4 className="font-semibold text-sm mb-4">Piano Follow-up B2B</h4>
                    <div className="space-y-3">
                      {outreachTemplates.followups.map((f, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              i === 0 ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-500"
                            }`}>
                              <span className="text-xs font-bold">{i + 1}</span>
                            </div>
                            {i < outreachTemplates.followups.length - 1 && (
                              <div className="w-px h-6 bg-[var(--border)]" />
                            )}
                          </div>
                          <div className="pt-1">
                            <p className="text-xs text-[var(--text-tertiary)]">{f.timing}</p>
                            <p className="text-sm font-medium">{f.action}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-12 rounded-[var(--radius-lg)] bg-[var(--bg-secondary)] text-center flex flex-col items-center justify-center min-h-[400px]"
              >
                <MessageSquare className="w-12 h-12 text-[var(--text-tertiary)] mb-3 opacity-30" />
                <h3 className="font-semibold mb-2">Comunicazione B2B</h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-xs">
                  Seleziona un partner e genera email, proposte partnership o piani di follow-up personalizzati
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
