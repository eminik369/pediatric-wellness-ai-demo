"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Stethoscope, FileText, Download, CheckCircle2, Beaker, Users, ChevronRight } from "lucide-react";

const productDetails = [
  {
    id: "immunoped",
    name: "ImmunoPed® BABY",
    category: "Supporto Immunitario",
    formulation: "Gocce — 0-36 mesi",
    ingredients: [
      { name: "Lattoferrina", amount: "100mg", dv: "-", role: "Proteina naturale del latte materno, azione antimicrobica e immunomodulante" },
      { name: "Vitamina D3", amount: "400 UI", dv: "200%", role: "Modulazione risposta immunitaria, sviluppo osseo" },
      { name: "Zinco", amount: "5mg", dv: "50%", role: "Difese naturali, integrità barriere mucosali" },
      { name: "FOS (Frutto-oligosaccaridi)", amount: "500mg", dv: "-", role: "Prebiotico, nutrimento selettivo Bifidobatteri" },
      { name: "GOS (Galatto-oligosaccaridi)", amount: "500mg", dv: "-", role: "Prebiotico simile agli HMO del latte materno" },
    ],
    scientificRationale: "Formulazione ispirata alla composizione del latte materno. La Lattoferrina è una glicoproteina con documentata attività antimicrobica, antivirale e immunomodulante. L'associazione con Vitamina D3 e Zinco potenzia la risposta immunitaria innata. I prebiotici FOS e GOS mimano gli oligosaccaridi del latte materno (HMO) favorendo lo sviluppo di una flora intestinale protettiva.",
    targetPatients: [
      "Neonati e lattanti con allattamento misto o artificiale",
      "Supporto immunitario nei primi 36 mesi di vita",
      "Inserimento in comunità (nido) per prevenzione",
      "Bambini con infezioni ricorrenti delle prime vie aeree",
    ],
    clinicalNotes: "Meta-analisi su supplementazione con Lattoferrina in neonati: riduzione significativa degli episodi di sepsi tardiva (RR 0.59, IC 95% 0.40-0.87). La Vitamina D è raccomandata da SIP per tutti i lattanti.",
  },
  {
    id: "pancino",
    name: "Pancino® Bustine",
    category: "Flora Intestinale",
    formulation: "Bustine — 0+ mesi",
    ingredients: [
      { name: "Lactobacillus rhamnosus GG", amount: "6 mld UFC", dv: "-", role: "Ceppo probiotico più studiato in pediatria, ATCC 53103" },
    ],
    scientificRationale: "Lactobacillus rhamnosus GG (LGG) è il ceppo probiotico con il maggior numero di studi clinici in ambito pediatrico (>300 pubblicazioni). È raccomandato dalle linee guida ESPGHAN per la prevenzione della diarrea associata ad antibiotici e il trattamento della gastroenterite acuta. Documentata efficacia nella riduzione della durata della diarrea acuta e nella prevenzione delle infezioni nosocomiali.",
    targetPatients: [
      "Post-terapia antibiotica (prevenzione disbiosi)",
      "Gastroenterite acuta (riduzione durata diarrea)",
      "Coliche del lattante (supporto regolazione intestinale)",
      "Prevenzione dermatite atopica in soggetti a rischio",
    ],
    clinicalNotes: "Raccomandazione forte ESPGHAN/NASPGHAN per LGG nella diarrea acuta (riduzione durata di circa 24h). Studio randomizzato su 742 bambini: LGG riduce del 60% il rischio di diarrea associata ad antibiotici.",
  },
  {
    id: "pediamente",
    name: "PediaMente® Flaconcini",
    category: "Funzioni Cognitive",
    formulation: "Flaconcini — 6+ anni",
    ingredients: [
      { name: "Vitamina B6", amount: "1.4mg", dv: "100%", role: "Sintesi neurotrasmettitori, metabolismo energetico cerebrale" },
      { name: "Vitamina B12", amount: "2.5µg", dv: "100%", role: "Maturazione sistema nervoso, formazione mielina" },
      { name: "Inositolo", amount: "200mg", dv: "-", role: "Secondo messaggero intracellulare, trasduzione del segnale" },
      { name: "Fosfoserina", amount: "50mg", dv: "-", role: "Precursore fosfolipidi di membrana neuronale" },
      { name: "Eleuterococco e.s.", amount: "100mg", dv: "-", role: "Adattogeno, supporto performance cognitive sotto stress" },
      { name: "Rhodiola e.s.", amount: "50mg", dv: "-", role: "Adattogeno, resistenza a fatica mentale" },
      { name: "Ginkgo biloba e.s.", amount: "40mg", dv: "-", role: "Microcircolo cerebrale, funzione cognitiva" },
    ],
    scientificRationale: "Formula sinergica che combina vitamine del gruppo B essenziali per il metabolismo energetico cerebrale con Fosfoserina (componente strutturale delle membrane neuronali) e Inositolo (secondo messaggero coinvolto nella trasduzione del segnale). Gli estratti vegetali adattogeni (Eleuterococco, Rhodiola) supportano la performance cognitiva sotto stress, mentre il Ginkgo biloba migliora il microcircolo cerebrale.",
    targetPatients: [
      "Bambini in età scolare con difficoltà di concentrazione",
      "Periodi di studio intenso (esami, verifiche)",
      "Supporto post-convalescenza con astenia mentale",
      "Ragazzi con elevato impegno scolastico ed extrascolastico",
    ],
    clinicalNotes: "Studio su 36 bambini 6-14 anni: supplementazione con fosfoserina e vitamine B per 8 settimane ha mostrato miglioramento significativo nei test di attenzione sostenuta (p<0.05). Ginkgo biloba: evidenze di miglioramento della memoria di lavoro in età pediatrica.",
  },
];

export default function ProfessionalModule() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const product = productDetails.find((p) => p.id === selectedProduct);

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-center gap-3">
        <Stethoscope className="w-5 h-5 text-amber-600" />
        <p className="text-sm text-amber-800">
          <span className="font-semibold">Area Professionisti</span> — Informazioni scientifiche per pediatri, farmacisti e operatori sanitari
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {productDetails.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedProduct(p.id)}
            className={`p-5 rounded-[var(--radius-md)] border text-left transition-all card-hover ${
              selectedProduct === p.id
                ? "border-amber-500 bg-amber-50"
                : "border-[var(--border)]/30 bg-white hover:border-amber-300"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">{p.category}</span>
                <h3 className="font-bold text-lg mt-2">{p.name}</h3>
                <p className="text-xs text-[var(--text-tertiary)] mt-1">{p.formulation}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--text-tertiary)]" />
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {product && (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--border)]/30 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Beaker className="w-4 h-4 text-amber-500" />
                  Composizione & Formulazione
                </h3>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] text-xs font-medium hover:bg-gray-200 transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  Scarica PDF
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)]/30">
                      <th className="text-left py-2 font-semibold text-xs text-[var(--text-tertiary)] uppercase">Ingrediente</th>
                      <th className="text-left py-2 font-semibold text-xs text-[var(--text-tertiary)] uppercase">Quantità</th>
                      <th className="text-left py-2 font-semibold text-xs text-[var(--text-tertiary)] uppercase">%VNR</th>
                      <th className="text-left py-2 font-semibold text-xs text-[var(--text-tertiary)] uppercase">Ruolo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.ingredients.map((ing, i) => (
                      <tr key={i} className="border-b border-[var(--border)]/10">
                        <td className="py-3 font-medium">{ing.name}</td>
                        <td className="py-3">{ing.amount}</td>
                        <td className="py-3">{ing.dv}</td>
                        <td className="py-3 text-[var(--text-secondary)] text-xs">{ing.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--border)]/30">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-500" />
                  Razionale Scientifico
                </h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{product.scientificRationale}</p>
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                  <p className="text-xs text-blue-800 font-medium">Evidenza clinica</p>
                  <p className="text-xs text-blue-700 mt-1">{product.clinicalNotes}</p>
                </div>
              </div>

              <div className="p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--border)]/30">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-500" />
                  Profilo Paziente Indicato
                </h4>
                <div className="space-y-2">
                  {product.targetPatients.map((tp, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm p-2.5 rounded-lg bg-[var(--bg-secondary)]">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span>{tp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
