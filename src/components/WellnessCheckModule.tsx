"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, MessageCircle, Send, Calendar, Download, Heart } from "lucide-react";

interface Scenario {
  label: string;
  emoji: string;
  description: string;
  chatFlow: { type: "ai" | "user"; text: string; delay: number }[];
  result: {
    score: number;
    childName: string;
    areas: { name: string; score: number; status: "critical" | "warning" | "good"; emoji: string; note: string }[];
    suggestions: string[];
    verdict: string;
  };
}

const scenarios: Scenario[] = [
  {
    label: "Neonato 6 mesi",
    emoji: "👶",
    description: "Lattante con coliche e difese immunitarie",
    chatFlow: [
      { type: "ai", text: "Ciao! Sono l'assistente benessere di Gruppo Pediatrica. Posso aiutarti a fare un rapido check-up del benessere del tuo bambino. Vuoi iniziare?", delay: 500 },
      { type: "user", text: "Sì, certo!", delay: 2000 },
      { type: "ai", text: "Quanti mesi ha il tuo bambino?", delay: 1000 },
      { type: "user", text: "Ha 6 mesi", delay: 2500 },
      { type: "ai", text: "C'è qualcosa che ti preoccupa riguardo al suo benessere?", delay: 1000 },
      { type: "user", text: "Ha spesso coliche e piange molto la sera. Vorrei anche supportare le sue difese immunitarie", delay: 2500 },
      { type: "ai", text: "Come è l'allattamento? Latte materno, artificiale o misto?", delay: 1000 },
      { type: "user", text: "Allattamento misto, integriamo con latte artificiale", delay: 2500 },
      { type: "ai", text: "Grazie! Sto preparando il wellness check del tuo bambino...", delay: 1000 },
    ],
    result: {
      score: 58,
      childName: "Lattante (6 mesi)",
      areas: [
        { name: "Sistema Immunitario", score: 50, status: "warning", emoji: "🛡️", note: "Allattamento misto — supporto extra consigliato" },
        { name: "Comfort Digestivo", score: 35, status: "critical", emoji: "🌱", note: "Coliche frequenti, pianto serale" },
        { name: "Qualità del Sonno", score: 40, status: "critical", emoji: "😴", note: "Disturbato dalle coliche" },
        { name: "Nutrizione", score: 70, status: "good", emoji: "🥗", note: "Allattamento misto adeguato" },
        { name: "Crescita", score: 85, status: "good", emoji: "📏", note: "Da verificare con il pediatra" },
      ],
      suggestions: [
        "Pancino® Bustine — Lactobacillus rhamnosus GG per riequilibrare la flora e ridurre le coliche",
        "ImmunoPed® BABY — Lattoferrina, Vitamina D3 e Zinco per supportare le difese immunitarie",
        "PediaTre® DHA gocce — DHA e Vitamina D per lo sviluppo cerebrale e osseo",
      ],
      verdict: "Attenzione necessaria alla salute digestiva. Le coliche sono comuni a questa età e i probiotici possono essere di grande aiuto.",
    },
  },
  {
    label: "Bambino 4 anni",
    emoji: "🧒",
    description: "Si ammala spesso, dorme male, mangia poco",
    chatFlow: [
      { type: "ai", text: "Ciao! Sono l'assistente benessere di Gruppo Pediatrica. Posso aiutarti a fare un rapido check-up del benessere del tuo bambino. Vuoi iniziare?", delay: 500 },
      { type: "user", text: "Sì, certo!", delay: 2000 },
      { type: "ai", text: "Quanti anni ha il tuo bambino?", delay: 1000 },
      { type: "user", text: "Ha 4 anni", delay: 2500 },
      { type: "ai", text: "C'è qualcosa che ti preoccupa in particolare riguardo al suo benessere?", delay: 1000 },
      { type: "user", text: "Si ammala spesso in inverno e dorme male", delay: 2500 },
      { type: "ai", text: "Capisco, è molto comune a questa età. Come descrivi la sua alimentazione?", delay: 1000 },
      { type: "user", text: "Mangia poco, è molto selettivo con il cibo", delay: 2500 },
      { type: "ai", text: "Grazie! Ho tutte le informazioni. Sto preparando il wellness check...", delay: 1000 },
    ],
    result: {
      score: 62,
      childName: "Bambino (4 anni)",
      areas: [
        { name: "Sistema Immunitario", score: 40, status: "critical", emoji: "🛡️", note: "Frequenti infezioni invernali" },
        { name: "Qualità del Sonno", score: 45, status: "critical", emoji: "😴", note: "Difficoltà ad addormentarsi" },
        { name: "Nutrizione", score: 55, status: "warning", emoji: "🥗", note: "Alimentazione selettiva" },
        { name: "Energia & Vitalità", score: 70, status: "good", emoji: "⚡", note: "Buoni livelli durante il giorno" },
        { name: "Crescita", score: 80, status: "good", emoji: "📏", note: "In linea con i percentili" },
      ],
      suggestions: [
        "PediaC® Compresse masticabili — Vitamina C per le difese immunitarie (gusto gradevole!)",
        "PediaFort® 1000 — Pappa Reale ricostituente per i periodi invernali",
        "PediaVit® Caramelle gommose — Multivitaminico per compensare la dieta selettiva",
        "PediaMag® Flaconi — Magnesio per favorire il rilassamento e il sonno",
      ],
      verdict: "Migliorabile — alcune aree necessitano supporto. Focus su difese immunitarie e routine del sonno.",
    },
  },
  {
    label: "Ragazzo 10 anni",
    emoji: "👦",
    description: "Stanchezza scolastica e poca concentrazione",
    chatFlow: [
      { type: "ai", text: "Ciao! Sono l'assistente benessere di Gruppo Pediatrica. Posso aiutarti a fare un rapido check-up del benessere del tuo bambino. Vuoi iniziare?", delay: 500 },
      { type: "user", text: "Sì, volentieri!", delay: 2000 },
      { type: "ai", text: "Quanti anni ha il tuo ragazzo?", delay: 1000 },
      { type: "user", text: "Ha 10 anni", delay: 2500 },
      { type: "ai", text: "Come sta andando a scuola? Ci sono preoccupazioni particolari?", delay: 1000 },
      { type: "user", text: "È sempre stanco, fa fatica a concentrarsi e ha poca voglia di studiare. Fa anche sport 3 volte a settimana", delay: 2500 },
      { type: "ai", text: "Come sono le sue abitudini alimentari e il sonno?", delay: 1000 },
      { type: "user", text: "Mangia abbastanza bene ma la sera va a letto tardi per i compiti", delay: 2500 },
      { type: "ai", text: "Perfetto, preparo il wellness check personalizzato...", delay: 1000 },
    ],
    result: {
      score: 71,
      childName: "Ragazzo (10 anni)",
      areas: [
        { name: "Energia & Vitalità", score: 50, status: "warning", emoji: "⚡", note: "Stanchezza da impegni multipli" },
        { name: "Concentrazione", score: 45, status: "critical", emoji: "🧠", note: "Difficoltà di focus nello studio" },
        { name: "Qualità del Sonno", score: 55, status: "warning", emoji: "😴", note: "Orario tardivo per i compiti" },
        { name: "Nutrizione", score: 80, status: "good", emoji: "🥗", note: "Alimentazione adeguata" },
        { name: "Crescita & Sport", score: 85, status: "good", emoji: "📏", note: "Attivo e in forma" },
      ],
      suggestions: [
        "PediaMente® Flaconcini — Vitamine B, Fosfoserina e Ginkgo per memoria e concentrazione",
        "PediaSprint® flaconcini — Aminoacidi e Rhodiola per l'energia durante sport e scuola",
        "PediaMag® Flaconi — Magnesio per supporto muscolare (sport) e rilassamento serale",
        "PediaVit® Complesso B sciroppo — Vitamine B per il metabolismo energetico",
      ],
      verdict: "Buona salute generale, ma serve supporto per la concentrazione scolastica e la gestione dell'energia tra sport e studio.",
    },
  },
];

export default function WellnessCheckModule() {
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [messages, setMessages] = useState<{ type: string; text: string; delay: number }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatComplete, setChatComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [started, setStarted] = useState(false);

  const startChat = (scenarioIdx: number) => {
    setSelectedScenario(scenarioIdx);
    setStarted(true);
    setMessages([]);
    setChatComplete(false);
    setShowResult(false);
    playMessages(scenarioIdx, 0);
  };

  const playMessages = (scenarioIdx: number, index: number) => {
    const flow = scenarios[scenarioIdx].chatFlow;
    if (index >= flow.length) {
      setChatComplete(true);
      setTimeout(() => setShowResult(true), 1200);
      return;
    }
    const msg = flow[index];
    if (msg.type === "ai") {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, msg]);
        setTimeout(() => playMessages(scenarioIdx, index + 1), msg.delay || 1000);
      }, 800);
    } else {
      setTimeout(() => {
        setMessages((prev) => [...prev, msg]);
        setTimeout(() => playMessages(scenarioIdx, index + 1), 500);
      }, msg.delay || 1000);
    }
  };

  const currentResult = selectedScenario !== null ? scenarios[selectedScenario].result : null;

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--border)]/30">
        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-[var(--border)]/30">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
          <div className="flex-1 mx-4 px-3 py-1 rounded-lg bg-[var(--bg-secondary)] text-xs text-[var(--text-tertiary)] text-center">
            www.gruppopediatrica.it/wellness-check
          </div>
        </div>

        <div className="min-h-[420px] flex flex-col">
          {!started ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Wellness Check Interattivo</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-xs">
                Scegli uno scenario per simulare l&apos;esperienza del genitore sul sito web
              </p>
              <div className="grid gap-3 w-full max-w-sm">
                {scenarios.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => startChat(i)}
                    className="flex items-center gap-3 p-4 rounded-xl border border-[var(--border)]/30 hover:border-teal-300 hover:bg-teal-50/50 text-left transition-all"
                  >
                    <span className="text-2xl">{s.emoji}</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{s.label}</p>
                      <p className="text-xs text-[var(--text-tertiary)]">{s.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="flex-1 space-y-3 overflow-y-auto mb-4 pr-2">
                <AnimatePresence>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={msg.type === "user" ? "chat-bubble-user" : "chat-bubble-ai"}>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="chat-bubble-ai">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-gray-400"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[var(--bg-secondary)]">
                <input type="text" placeholder="Scrivi un messaggio..." className="flex-1 bg-transparent text-sm outline-none" disabled />
                <Send className="w-4 h-4 text-[var(--text-tertiary)]" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {showResult && currentResult ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--border)]/30 text-center">
                <h3 className="text-sm font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-4">
                  Wellness Check — {currentResult.childName}
                </h3>
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#f0f0f0" strokeWidth="10" />
                    <motion.circle
                      cx="60" cy="60" r="50" fill="none"
                      stroke={currentResult.score >= 70 ? "#34c759" : currentResult.score >= 50 ? "#ffcc00" : "#ff3b30"}
                      strokeWidth="10"
                      strokeDasharray={`${currentResult.score * 3.14} 314`}
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 314" }}
                      animate={{ strokeDasharray: `${currentResult.score * 3.14} 314` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">{currentResult.score}</span>
                    <span className="text-xs text-[var(--text-tertiary)]">/100</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentResult.score >= 70 ? "bg-emerald-100 text-emerald-700" :
                  currentResult.score >= 50 ? "bg-amber-100 text-amber-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {currentResult.verdict}
                </span>
              </div>

              <div className="p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--border)]/30">
                <h3 className="font-semibold mb-4">Aree di Benessere</h3>
                <div className="space-y-3">
                  {currentResult.areas.map((area, i) => (
                    <motion.div
                      key={area.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium flex items-center gap-2">
                          <span>{area.emoji}</span> {area.name}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          area.status === "good" ? "bg-emerald-100 text-emerald-700" :
                          area.status === "warning" ? "bg-amber-100 text-amber-700" :
                          "bg-red-100 text-red-700"
                        }`}>{area.score}/100</span>
                      </div>
                      <div className="h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden mb-1">
                        <motion.div
                          className={`h-full rounded-full ${
                            area.status === "good" ? "bg-emerald-500" :
                            area.status === "warning" ? "bg-amber-500" : "bg-red-400"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${area.score}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                        />
                      </div>
                      <p className="text-xs text-[var(--text-tertiary)]">{area.note}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-[var(--radius-lg)] bg-gradient-to-br from-teal-500 to-cyan-400 text-white">
                <h3 className="font-semibold mb-3">Prodotti Gruppo Pediatrica Consigliati</h3>
                <div className="space-y-2 mb-4">
                  {currentResult.suggestions.map((s, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white/90">
                      <Heart className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white text-teal-600 text-sm font-medium rounded-lg">
                    <Calendar className="w-4 h-4" />
                    Parla con un Esperto
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white/20 text-white text-sm font-medium rounded-lg">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-12 rounded-[var(--radius-lg)] bg-[var(--bg-secondary)] border border-[var(--border)]/30 text-center h-full flex flex-col items-center justify-center min-h-[400px]"
            >
              <Globe className="w-12 h-12 text-[var(--text-tertiary)] mb-3 opacity-30" />
              <h3 className="font-semibold mb-2">Wellness Check</h3>
              <p className="text-sm text-[var(--text-secondary)] max-w-xs">
                Il report benessere verrà generato al termine della conversazione
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
