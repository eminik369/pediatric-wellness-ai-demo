"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Baby, ChevronRight, CheckCircle2, AlertTriangle, Sparkles, RotateCcw } from "lucide-react";

interface Product {
  name: string;
  category: string;
  ageRange: string;
  format: string;
  description: string;
  ingredients: string;
  benefits: string[];
  dosage: string;
  safety: string;
  tag: "Consigliato" | "Complementare";
}

const productDB: Product[] = [
  {
    name: "ImmunoPed® BABY",
    category: "Immunità",
    ageRange: "0-36 mesi",
    format: "Gocce",
    description: "Integratore alimentare a base di Lattoferrina, Vitamina D3, Zinco, FOS e GOS per supportare le difese immunitarie nei primi anni di vita.",
    ingredients: "Lattoferrina, Vitamina D3, Zinco, FOS, GOS",
    benefits: ["Supporta le difese immunitarie naturali", "Lattoferrina ad alta biodisponibilità", "Formato gocce facile da somministrare"],
    dosage: "Secondo indicazione del pediatra, gocce",
    safety: "Adatto da 0 mesi. Consultare il pediatra prima dell'uso.",
    tag: "Consigliato",
  },
  {
    name: "PediaC® Compresse masticabili",
    category: "Vitamina C",
    ageRange: "3+ anni",
    format: "Compresse masticabili",
    description: "Integratore alimentare di Vitamina C in compresse masticabili. La Vitamina C contribuisce alla normale funzione del sistema immunitario.",
    ingredients: "Vitamina C (acido ascorbico)",
    benefits: ["Contribuisce alla normale funzione immunitaria", "Compresse masticabili dal gusto gradevole", "Pratico e facile da assumere"],
    dosage: "1 compressa masticabile al giorno",
    safety: "Adatto dai 3 anni. Non superare la dose giornaliera raccomandata.",
    tag: "Consigliato",
  },
  {
    name: "PediaVit® Gocce",
    category: "Multivitaminico",
    ageRange: "0-36 mesi",
    format: "Gocce",
    description: "Integratore alimentare di Vitamine del gruppo B, Vitamina A, E e D. Supporta la crescita e lo sviluppo nei primi anni di vita.",
    ingredients: "Vitamine B1, B2, B6, B12, A, E, D",
    benefits: ["Apporto completo di vitamine essenziali", "Formato gocce adatto ai neonati", "Supporta crescita e sviluppo"],
    dosage: "Gocce secondo posologia indicata dal pediatra",
    safety: "Adatto dai primi mesi di vita. Seguire le indicazioni del pediatra.",
    tag: "Consigliato",
  },
  {
    name: "PediaVit® Caramelle gommose",
    category: "Multivitaminico",
    ageRange: "4+ anni",
    format: "Caramelle gommose",
    description: "Integratore multivitaminico in caramelle gommose, formulato per bambini dai 4 anni in su. Apporto equilibrato di vitamine essenziali.",
    ingredients: "Vitamine A, C, D, E, B6, B12, Acido folico, Biotina",
    benefits: ["Formato caramella gommosa amato dai bambini", "Apporto multivitaminico completo", "Gusto frutta naturale"],
    dosage: "1-2 caramelle gommose al giorno",
    safety: "Adatto dai 4 anni. Non superare la dose raccomandata.",
    tag: "Complementare",
  },
  {
    name: "PediaVit® Complesso B sciroppo",
    category: "Vitamine B",
    ageRange: "1+ anni",
    format: "Sciroppo",
    description: "Integratore alimentare a base di Vitamine del gruppo B in sciroppo. Le vitamine B contribuiscono al normale metabolismo energetico.",
    ingredients: "Vitamine B1, B2, B3, B5, B6, B12",
    benefits: ["Contribuisce al metabolismo energetico", "Sciroppo facile da somministrare", "Supporta il sistema nervoso"],
    dosage: "1 misurino al giorno",
    safety: "Adatto da 1 anno. Agitare prima dell'uso.",
    tag: "Complementare",
  },
  {
    name: "PediaTre® DHA gocce",
    category: "Crescita e Sviluppo",
    ageRange: "0-36 mesi",
    format: "Gocce",
    description: "Integratore alimentare di Vitamina D3, A, E e DHA. La Vitamina D è necessaria per la crescita e lo sviluppo osseo normali dei bambini.",
    ingredients: "Vitamina D3, Vitamina A, Vitamina E, DHA",
    benefits: ["Supporta lo sviluppo osseo e la crescita", "DHA per lo sviluppo cerebrale", "Contribuisce alla funzione immunitaria"],
    dosage: "Gocce secondo posologia pediatrica",
    safety: "Adatto dai primi mesi. Consultare il pediatra.",
    tag: "Consigliato",
  },
  {
    name: "Pancino® Bustine",
    category: "Digestione",
    ageRange: "0+ mesi",
    format: "Bustine",
    description: "Integratore alimentare a base di Lactobacillus rhamnosus GG. Favorisce l'equilibrio della flora intestinale del bambino.",
    ingredients: "Lactobacillus rhamnosus GG",
    benefits: ["Favorisce l'equilibrio della flora intestinale", "Ceppo probiotico clinicamente studiato", "Facile da sciogliere in liquidi"],
    dosage: "1 bustina al giorno sciolta in acqua o latte",
    safety: "Adatto dai primi mesi di vita. Conservare in luogo fresco.",
    tag: "Consigliato",
  },
  {
    name: "PediaFlù® soluzione orale",
    category: "Vie Respiratorie",
    ageRange: "1+ anni",
    format: "Soluzione orale",
    description: "Integratore alimentare a base di Pelargonium sidoides, Propoli e Zinco. Utile per il benessere delle vie respiratorie.",
    ingredients: "Pelargonium sidoides, Propoli, Zinco",
    benefits: ["Supporta il benessere delle vie respiratorie", "Azione sinergica di estratti vegetali e Zinco", "Soluzione orale facile da assumere"],
    dosage: "Secondo posologia indicata sulla confezione",
    safety: "Adatto da 1 anno. Non usare in caso di allergia alla propoli.",
    tag: "Consigliato",
  },
  {
    name: "PediaFort® 1000 flaconi",
    category: "Energia e Ricostituente",
    ageRange: "3+ anni",
    format: "Flaconcini",
    description: "Integratore alimentare di Pappa Reale con Polline, Propoli e Miele. Indicato come supporto alla normale alimentazione in periodi intensi.",
    ingredients: "Pappa Reale 1000mg, Polline, Propoli, Miele",
    benefits: ["Ricostituente naturale con Pappa Reale", "Supporto nei periodi di stanchezza", "Ingredienti naturali dall'alveare"],
    dosage: "1 flaconcino al giorno, preferibilmente al mattino",
    safety: "Adatto dai 3 anni. Non usare in caso di allergia ai prodotti dell'alveare.",
    tag: "Consigliato",
  },
  {
    name: "PediaSprint® flaconcini",
    category: "Energia e Sport",
    ageRange: "6+ anni",
    format: "Flaconcini",
    description: "Integratore alimentare di Glutammina, Carnosina e Carnitina, con OKG ed estratti di Rhodiola e Ginseng. Per periodi di intenso impegno.",
    ingredients: "Glutammina, Carnosina, Carnitina, OKG, Rhodiola, Ginseng",
    benefits: ["Supporto per periodi di intenso impegno fisico", "Aminoacidi e estratti vegetali adattogeni", "Formato flaconcino pratico"],
    dosage: "1 flaconcino al giorno",
    safety: "Adatto dai 6 anni. Consultare il pediatra.",
    tag: "Complementare",
  },
  {
    name: "PediArgin® Flaconi",
    category: "Crescita",
    ageRange: "3+ anni",
    format: "Flaconcini",
    description: "Integratore alimentare di Arginina con Iodio, Lattoferrina, Vitamina D3, Pappa Reale e Zinco. Supporta la crescita e lo sviluppo.",
    ingredients: "Arginina, Iodio, Lattoferrina, Vitamina D3, Pappa Reale, Zinco",
    benefits: ["Arginina per il supporto alla crescita", "Iodio e Zinco per lo sviluppo", "Formula completa e bilanciata"],
    dosage: "1 flaconcino al giorno",
    safety: "Adatto dai 3 anni. Non usare in caso di allergia ai prodotti dell'alveare.",
    tag: "Consigliato",
  },
  {
    name: "PediaMente® Flaconcini",
    category: "Memoria e Concentrazione",
    ageRange: "6+ anni",
    format: "Flaconcini",
    description: "Integratore alimentare con Vitamine B, Inositolo, Fosfoserina ed estratti di Eleuterococco, Rhodiola e Ginkgo. Utile per memoria e funzioni cognitive.",
    ingredients: "Vitamine B, Inositolo, Fosfoserina, Eleuterococco, Rhodiola, Ginkgo",
    benefits: ["Supporta memoria e funzioni cognitive", "Estratti vegetali per la concentrazione", "Ideale per periodi scolastici intensi"],
    dosage: "1 flaconcino al giorno, al mattino",
    safety: "Adatto dai 6 anni. Consultare il pediatra.",
    tag: "Consigliato",
  },
  {
    name: "PediaMag® Flaconi",
    category: "Magnesio",
    ageRange: "3+ anni",
    format: "Flaconcini",
    description: "Integratore alimentare con 80 mg di Magnesio per flaconcino. Aroma arancia, senza glutine e naturalmente privo di lattosio.",
    ingredients: "Magnesio 80mg",
    benefits: ["Contribuisce alla normale funzione muscolare", "Supporta il sistema nervoso", "Gusto arancia gradevole, senza glutine"],
    dosage: "1 flaconcino al giorno",
    safety: "Adatto dai 3 anni. Senza glutine e lattosio.",
    tag: "Complementare",
  },
  {
    name: "PediaPEG® Bustine",
    category: "Regolarità Intestinale",
    ageRange: "1+ anni",
    format: "Bustine",
    description: "Dispositivo medico per la regolarità intestinale dei bambini. Favorisce il transito e il benessere dell'apparato digerente.",
    ingredients: "Macrogol (PEG)",
    benefits: ["Favorisce la regolarità intestinale", "Azione delicata e ben tollerata", "Facile da sciogliere in acqua"],
    dosage: "1-2 bustine al giorno sciolte in acqua",
    safety: "Adatto da 1 anno. Dispositivo medico, leggere le avvertenze.",
    tag: "Complementare",
  },
];

// Mapping logic: age index -> wellness area index -> need index -> product indices
function getRecommendations(ageIdx: number, areaIdx: number, needIdx: number): Product[] {
  const scored: { product: Product; score: number }[] = productDB.map((p) => {
    let score = 0;

    // Age matching
    const ageMinMap: Record<string, number> = {
      "0-36 mesi": 0, "0+ mesi": 0, "1+ anni": 1, "3+ anni": 3, "4+ anni": 4, "6+ anni": 6,
    };
    const ageRanges = [
      [0, 1],   // Neonato 0-12 mesi
      [1, 3],   // Toddler 1-3 anni
      [3, 10],  // Età scolare 3-10 anni
      [10, 14], // Pre-adolescente 10-14 anni
    ];
    const [minAge, maxAge] = ageRanges[ageIdx];
    const productMinAge = ageMinMap[p.ageRange] ?? 0;
    if (productMinAge <= minAge) score += 3;
    else if (productMinAge <= maxAge) score += 1;
    else return { product: p, score: -10 }; // Too old for this product

    // Wellness area matching
    const areaCats: string[][] = [
      ["Immunità", "Vitamina C", "Vie Respiratorie", "Energia e Ricostituente"], // Sistema immunitario
      ["Magnesio", "Vitamine B", "Multivitaminico"],                              // Sonno e relax
      ["Digestione", "Regolarità Intestinale"],                                    // Digestione
      ["Vie Respiratorie", "Vitamina C", "Immunità"],                              // Vie respiratorie
    ];
    if (areaCats[areaIdx]?.includes(p.category)) score += 5;

    // Specific need matching
    if (needIdx === 0) { // Prevenzione stagionale
      if (["Immunità", "Vitamina C", "Vie Respiratorie"].includes(p.category)) score += 3;
    } else if (needIdx === 1) { // Supporto dopo malattia
      if (["Energia e Ricostituente", "Energia e Sport", "Crescita", "Multivitaminico"].includes(p.category)) score += 3;
    } else if (needIdx === 2) { // Benessere quotidiano
      if (["Multivitaminico", "Crescita e Sviluppo", "Vitamine B"].includes(p.category)) score += 3;
    } else if (needIdx === 3) { // Su consiglio pediatra
      score += 1; // All products are valid
    }

    return { product: p, score };
  });

  const filtered = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);
  const top = filtered.slice(0, 2);
  if (top.length > 0) top[0].product = { ...top[0].product, tag: "Consigliato" };
  if (top.length > 1) top[1].product = { ...top[1].product, tag: "Complementare" };
  return top.map((s) => s.product);
}

const steps = [
  {
    question: "Qual è l'età del bambino?",
    options: [
      { label: "Neonato (0-12 mesi)", emoji: "👶" },
      { label: "Toddler (1-3 anni)", emoji: "🧒" },
      { label: "Età scolare (3-10 anni)", emoji: "👦" },
      { label: "Pre-adolescente (10-14 anni)", emoji: "🧑" },
    ],
  },
  {
    question: "Quale area di benessere ti interessa?",
    options: [
      { label: "Sistema immunitario", emoji: "🛡️" },
      { label: "Sonno e relax", emoji: "😴" },
      { label: "Digestione e intestino", emoji: "🌱" },
      { label: "Vie respiratorie", emoji: "🌬️" },
    ],
  },
  {
    question: "C'è un bisogno specifico in questo momento?",
    options: [
      { label: "Prevenzione stagionale", emoji: "🍂" },
      { label: "Supporto dopo malattia", emoji: "💊" },
      { label: "Benessere quotidiano", emoji: "☀️" },
      { label: "Su consiglio del pediatra", emoji: "👨‍⚕️" },
    ],
  },
];

export default function ParentGuideModule() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [answerIndices, setAnswerIndices] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  const handleAnswer = (answer: string, idx: number) => {
    const newAnswers = [...answers, answer];
    const newIndices = [...answerIndices, idx];
    setAnswers(newAnswers);
    setAnswerIndices(newIndices);
    if (step < steps.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 300);
    } else {
      setIsSearching(true);
      setTimeout(() => {
        const products = getRecommendations(newIndices[0], newIndices[1], newIndices[2]);
        setRecommendedProducts(products);
        setIsSearching(false);
        setShowResults(true);
      }, 1800);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers([]);
    setAnswerIndices([]);
    setShowResults(false);
    setIsSearching(false);
    setRecommendedProducts([]);
  };

  const progress = (answers.length / steps.length) * 100;

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3">
        <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--border)]/30 overflow-hidden shadow-sm">
          <div className="px-6 pt-6 pb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-[var(--text-secondary)]">Percorso guidato</span>
              <div className="flex items-center gap-3">
                <span className="font-medium">{Math.round(progress)}%</span>
                {showResults && (
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1 text-xs text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Ricomincia
                  </button>
                )}
              </div>
            </div>
            <div className="h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="px-6 pb-6 min-h-[420px] flex flex-col">
            <AnimatePresence mode="wait">
              {!showResults && !isSearching && (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col justify-center"
                >
                  <div className="flex items-start gap-3 mb-8">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center flex-shrink-0">
                      <Baby className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-[var(--text-tertiary)] mb-1">
                        Domanda {step + 1} di {steps.length}
                      </div>
                      <h3 className="text-xl font-semibold">{steps[step].question}</h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-12">
                    {steps[step].options.map((option, idx) => (
                      <button
                        key={option.label}
                        onClick={() => handleAnswer(option.label, idx)}
                        className="group flex items-center gap-3 p-4 rounded-2xl border border-[var(--border)]/50 hover:border-green-300 hover:bg-green-50/50 text-left transition-all duration-200"
                      >
                        <span className="text-2xl">{option.emoji}</span>
                        <span className="font-medium text-sm flex-1">{option.label}</span>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-green-500" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {isSearching && (
                <motion.div
                  key="searching"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center pulse-glow">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-1">Ricerca prodotti in corso...</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Analisi bisogni e verifica sicurezza
                    </p>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-green-500"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {showResults && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex-1 space-y-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="font-semibold text-emerald-600">
                      Prodotti selezionati per il tuo bambino
                    </span>
                  </div>

                  {recommendedProducts.map((product, i) => (
                    <motion.div
                      key={product.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="p-5 rounded-2xl border border-[var(--border)]/30 bg-[var(--bg-tertiary)]"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-lg">{product.name}</h4>
                          <p className="text-xs text-[var(--text-tertiary)]">
                            {product.category} · {product.ageRange} · {product.format}
                          </p>
                        </div>
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                            product.tag === "Consigliato"
                              ? "bg-green-100 text-green-700"
                              : "bg-sky-100 text-sky-700"
                          }`}
                        >
                          {product.tag}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] mb-3">
                        {product.description}
                      </p>
                      <div className="text-xs text-[var(--text-tertiary)] mb-3">
                        <span className="font-medium">Composizione:</span> {product.ingredients}
                      </div>
                      <div className="space-y-1 mb-3">
                        {product.benefits.map((b) => (
                          <div key={b} className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 rounded-lg bg-green-50 border border-green-100">
                          <span className="text-green-700 font-medium">Dosaggio:</span>
                          <span className="text-green-800 ml-1">{product.dosage}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-amber-50 border border-amber-100">
                          <span className="text-amber-700 font-medium">Sicurezza:</span>
                          <span className="text-amber-800 ml-1">{product.safety}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-700">
                      Ti raccomandiamo sempre di consultare il pediatra prima di iniziare qualsiasi
                      integrazione. Questi suggerimenti non sostituiscono il parere medico.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--bg-secondary)] border border-[var(--border)]/30">
          <h3 className="font-semibold mb-3">Come funziona</h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
            Il percorso guidato analizza età, area di benessere e bisogni specifici per consigliare i
            prodotti Gruppo Pediatrica più adatti al tuo bambino.
          </p>
          <div className="space-y-3">
            {[
              "Percorso personalizzato per età",
              "Prodotti reali Gruppo Pediatrica",
              "Raccomandazioni diverse per ogni profilo",
              "Verifica automatica idoneità per età",
              "Avviso consultare il pediatra",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-[var(--radius-lg)] bg-gradient-to-br from-green-500 to-emerald-400 text-white">
          <h3 className="font-semibold mb-2">Obiettivo</h3>
          <p className="text-sm text-white/80 leading-relaxed">
            Guidare i genitori con empatia e trasparenza, senza pressioni commerciali. Educare e
            rassicurare è la priorità: la vendita è una conseguenza naturale della fiducia.
          </p>
        </div>

        {answers.length > 0 && (
          <div className="p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--border)]/30">
            <h3 className="font-semibold mb-3 text-sm">Risposte raccolte</h3>
            <div className="space-y-2">
              {answers.map((answer, i) => (
                <div key={i} className="text-xs p-2 rounded-lg bg-[var(--bg-secondary)]">
                  <span className="text-[var(--text-tertiary)]">D{i + 1}:</span>{" "}
                  <span className="font-medium">{answer}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
