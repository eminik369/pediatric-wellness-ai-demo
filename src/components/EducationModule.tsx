"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, AlertTriangle, CheckCircle2, Stethoscope, Heart } from "lucide-react";

const topics = [
  { id: "immunity", emoji: "🛡️", title: "Sistema Immunitario", desc: "Supporto e prevenzione stagionale" },
  { id: "sleep", emoji: "😴", title: "Sonno e Relax", desc: "Routine serali e disturbi del sonno" },
  { id: "digestion", emoji: "🌱", title: "Salute Digestiva", desc: "Intestino, microbiota e alimentazione" },
  { id: "respiratory", emoji: "🌬️", title: "Vie Respiratorie", desc: "Prevenzione e benessere respiratorio" },
  { id: "skin", emoji: "🧴", title: "Pelle e Dermatologia", desc: "Cura della pelle delicata dei bambini" },
];

const topicContent: Record<string, {
  title: string;
  intro: string;
  causes: string[];
  prevention: string[];
  whenToSeeDoctor: string[];
  products: string[];
}> = {
  immunity: {
    title: "Come supportare il sistema immunitario del tuo bambino",
    intro: "Il sistema immunitario dei bambini è in fase di sviluppo. Con le giuste abitudini e un po' di supporto, puoi aiutarli a costruire difese naturali più forti.",
    causes: [
      "Inizio scuola o asilo nido (esposizione a nuovi germi)",
      "Cambi di stagione, soprattutto autunno-inverno",
      "Alimentazione poco varia o carente di nutrienti chiave",
      "Stress o poco sonno che indeboliscono le difese",
    ],
    prevention: [
      "Assicura una dieta ricca di frutta, verdura e proteine di qualità",
      "Mantieni una routine di sonno regolare (10-12 ore per bambini 3-10 anni)",
      "Attività all'aria aperta anche in inverno (almeno 1 ora al giorno)",
      "Lavaggio frequente delle mani con acqua e sapone",
      "Vitamina D nei mesi invernali, soprattutto nelle regioni con poco sole",
    ],
    whenToSeeDoctor: [
      "Febbre superiore a 38.5°C per più di 2 giorni",
      "Infezioni ricorrenti (più di 8-10 all'anno)",
      "Stanchezza persistente o perdita di appetito prolungata",
      "Difficoltà di recupero dopo le malattie",
    ],
    products: [
      "ImmunoPed® BABY — Lattoferrina, Vitamina D3, Zinco (0-36 mesi)",
      "PediaC® Compresse masticabili — Vitamina C (3+ anni)",
      "PediaFort® 1000 — Pappa Reale ricostituente (3+ anni)",
      "PediaFlù® — Pelargonium, Propoli e Zinco per le vie respiratorie (1+ anni)",
    ],
  },
  sleep: {
    title: "Sonno sereno: guida per genitori",
    intro: "Il sonno è fondamentale per la crescita e lo sviluppo del bambino. Disturbi del sonno sono comuni ma spesso risolvibili con le giuste strategie.",
    causes: [
      "Cambiamenti di routine (inizio scuola, viaggi, nuova casa)",
      "Uso di schermi nelle ore serali (luce blu)",
      "Ansia o preoccupazioni tipiche dell'età",
      "Alimentazione troppo pesante o tardiva la sera",
    ],
    prevention: [
      "Routine serale costante: bagno, lettura, luci soffuse",
      "No schermi almeno 1 ora prima di dormire",
      "Camera buia, fresca (18-20°C) e silenziosa",
      "Orario di addormentamento e risveglio regolare, anche nel weekend",
      "Attività fisica durante il giorno, ma non nelle 2 ore prima di dormire",
    ],
    whenToSeeDoctor: [
      "Russamento abituale o pause respiratorie nel sonno",
      "Risvegli notturni frequenti dopo i 3 anni",
      "Sonnambulismo ricorrente",
      "Eccessiva sonnolenza diurna o difficoltà di concentrazione",
    ],
    products: [
      "PediaMag® Flaconi — Magnesio per rilassamento muscolare (3+ anni)",
      "PediaVit® Complesso B sciroppo — Vitamine B per il sistema nervoso (1+ anni)",
      "PediaMente® Flaconcini — Rhodiola ed estratti adattogeni per lo stress (6+ anni)",
    ],
  },
  digestion: {
    title: "Salute digestiva nei bambini",
    intro: "L'intestino è il nostro 'secondo cervello'. Una buona salute digestiva influenza l'immunità, l'umore e lo sviluppo generale del bambino.",
    causes: [
      "Alimentazione povera di fibre",
      "Scarsa idratazione durante la giornata",
      "Stress emotivo (scuola, separazioni, cambiamenti)",
      "Uso di antibiotici che altera la flora intestinale",
    ],
    prevention: [
      "5 porzioni di frutta e verdura al giorno",
      "Acqua come bevanda principale (evitare succhi zuccherati)",
      "Introdurre alimenti fermentati adatti ai bambini",
      "Masticare lentamente e mangiare in tranquillità",
      "Ciclo regolare di probiotici, specialmente dopo antibiotici",
    ],
    whenToSeeDoctor: [
      "Dolori addominali ricorrenti che interferiscono con le attività",
      "Stitichezza cronica o diarrea persistente",
      "Sangue nelle feci",
      "Perdita di peso o rallentamento della crescita",
    ],
    products: [
      "Pancino® Bustine — Lactobacillus rhamnosus GG (0+ mesi)",
      "PediaPEG® Bustine — Regolarità intestinale (1+ anni)",
      "ImmunoPed® BABY — Prebiotici FOS e GOS per la flora intestinale (0-36 mesi)",
    ],
  },
  respiratory: {
    title: "Benessere delle vie respiratorie",
    intro: "Le vie respiratorie dei bambini sono più delicate e vulnerabili. La prevenzione e il supporto naturale possono fare una grande differenza.",
    causes: [
      "Esposizione a virus respiratori in ambienti chiusi",
      "Aria secca da riscaldamento invernale",
      "Allergeni ambientali (polvere, pollini, animali)",
      "Fumo passivo o inquinamento atmosferico",
    ],
    prevention: [
      "Lavaggi nasali con soluzione fisiologica regolari",
      "Umidificare gli ambienti in inverno (40-60% umidità)",
      "Areare la casa almeno 2 volte al giorno",
      "Evitare fumo passivo",
      "Supporto immunitario stagionale proattivo",
    ],
    whenToSeeDoctor: [
      "Difficoltà respiratorie o respiro sibilante",
      "Tosse persistente per più di 2 settimane",
      "Febbre alta associata a tosse",
      "Episodi ricorrenti di bronchite o otite",
    ],
    products: [
      "PediaFlù® soluzione orale — Pelargonium sidoides, Propoli e Zinco (1+ anni)",
      "PediaC® Compresse masticabili — Vitamina C per le mucose (3+ anni)",
      "ImmunoPed® BABY — Lattoferrina e Zinco per le difese (0-36 mesi)",
      "PediaFort® 1000 — Propoli e Miele per le vie aeree (3+ anni)",
    ],
  },
  skin: {
    title: "Cura della pelle dei bambini",
    intro: "La pelle dei bambini è più sottile e sensibile di quella degli adulti. Richiede attenzioni specifiche e prodotti delicati.",
    causes: [
      "Pelle ancora in fase di maturazione della barriera cutanea",
      "Esposizione a detergenti aggressivi",
      "Clima freddo e secco o caldo umido",
      "Allergie alimentari o da contatto",
    ],
    prevention: [
      "Usare detergenti delicati specifici per bambini",
      "Idratare la pelle dopo il bagnetto",
      "Protezione solare alta (SPF 50+) tutto l'anno",
      "Vestiti in cotone organico, evitare fibre sintetiche a contatto con la pelle",
      "Non eccedere con la frequenza dei bagnetti",
    ],
    whenToSeeDoctor: [
      "Eczema che non migliora con idratazione",
      "Eruzioni cutanee improvvise con febbre",
      "Prurito intenso che disturba il sonno",
      "Lesioni che si infettano o non guariscono",
    ],
    products: [
      "PediaVit® Gocce — Vitamine A ed E per la salute della pelle (0-36 mesi)",
      "PediaTre® DHA gocce — Vitamina E e DHA antinfiammatorio (0-36 mesi)",
      "Pancino® Bustine — Probiotici per supporto dermatite atopica (0+ mesi)",
    ],
  },
};

export default function EducationModule() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const content = selectedTopic ? topicContent[selectedTopic] : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => setSelectedTopic(topic.id)}
            className={`p-4 rounded-[var(--radius-md)] border text-center transition-all duration-300 card-hover ${
              selectedTopic === topic.id
                ? "border-green-500 bg-green-50 shadow-md"
                : "border-[var(--border)]/30 bg-white hover:border-green-300"
            }`}
          >
            <div className="text-3xl mb-2">{topic.emoji}</div>
            <h3 className="font-semibold text-xs mb-0.5">{topic.title}</h3>
            <p className="text-[10px] text-[var(--text-tertiary)]">{topic.desc}</p>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {content && (
          <motion.div
            key={selectedTopic}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--border)]/30">
              <h3 className="text-xl font-bold mb-3">{content.title}</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">{content.intro}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--border)]/30">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Cause comuni
                </h4>
                <div className="space-y-2">
                  {content.causes.map((c, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--border)]/30">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-green-500" />
                  Prevenzione & Buone Abitudini
                </h4>
                <div className="space-y-2">
                  {content.prevention.map((p, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-[var(--radius-lg)] bg-red-50 border border-red-100">
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-red-800">
                  <Stethoscope className="w-4 h-4 text-red-500" />
                  Quando consultare il pediatra
                </h4>
                <div className="space-y-2">
                  {content.whenToSeeDoctor.map((w, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-red-700">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{w}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-[var(--radius-lg)] bg-green-50 border border-green-100">
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-800">
                  <BookOpen className="w-4 h-4 text-green-500" />
                  Prodotti Gruppo Pediatrica correlati
                </h4>
                <div className="space-y-2">
                  {content.products.map((p, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-green-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-green-600 mt-3 italic">
                  Chiedi sempre consiglio al pediatra prima dell&apos;uso.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedTopic && (
        <div className="p-12 rounded-[var(--radius-lg)] bg-[var(--bg-secondary)] text-center">
          <BookOpen className="w-12 h-12 text-[var(--text-tertiary)] mx-auto mb-3 opacity-30" />
          <h3 className="font-semibold mb-2">Contenuti Educativi</h3>
          <p className="text-sm text-[var(--text-secondary)]">
            Seleziona un argomento per esplorare le guide educative per genitori
          </p>
        </div>
      )}
    </div>
  );
}
