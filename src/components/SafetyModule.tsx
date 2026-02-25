"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, Baby } from "lucide-react";

const ageOptions = [
  { label: "Neonato (0-6 mesi)", minAge: 0 },
  { label: "Lattante (6-12 mesi)", minAge: 0.5 },
  { label: "1-3 anni", minAge: 1 },
  { label: "3-6 anni", minAge: 3 },
  { label: "6-10 anni", minAge: 6 },
  { label: "10-14 anni", minAge: 10 },
];

const products = [
  { id: 1, name: "ImmunoPed® BABY", category: "Immunità", ages: "0-36 mesi", minAge: 0, maxAge: 3 },
  { id: 2, name: "Pancino® Bustine", category: "Digestione", ages: "0+ mesi", minAge: 0, maxAge: 14 },
  { id: 3, name: "PediaC® Compresse", category: "Vitamina C", ages: "3+ anni", minAge: 3, maxAge: 14 },
  { id: 4, name: "PediaMente® Flaconcini", category: "Concentrazione", ages: "6+ anni", minAge: 6, maxAge: 14 },
  { id: 5, name: "PediaFort® 1000", category: "Ricostituente", ages: "3+ anni", minAge: 3, maxAge: 14 },
];

type CheckStatus = "ok" | "warning" | "danger";

interface SafetyResult {
  ageCheck: { status: CheckStatus; message: string };
  dosageCheck: { status: CheckStatus; message: string };
  interactionCheck: { status: CheckStatus; message: string };
  overlapCheck: { status: CheckStatus; message: string };
  finalVerdict: string;
  recommendations: string[];
}

function computeSafetyCheck(productId: number, childAge: number): SafetyResult {
  const product = products.find((p) => p.id === productId)!;
  const ageOk = childAge >= product.minAge && childAge <= product.maxAge;
  const ageBorderline = !ageOk && childAge >= product.minAge - 0.5;

  switch (productId) {
    case 1: // ImmunoPed® BABY
      return {
        ageCheck: {
          status: childAge <= 3 ? "ok" : "warning",
          message: childAge <= 3
            ? "Prodotto specifico per neonati e bambini fino a 36 mesi — idoneo"
            : "Prodotto formulato per 0-36 mesi. Per questa fascia d'età considera PediaC® o PediaFort®",
        },
        dosageCheck: {
          status: "ok",
          message: childAge < 1
            ? "Gocce: dosaggio neonatale secondo indicazione pediatrica"
            : "Gocce: dosaggio standard per lattanti/toddler",
        },
        interactionCheck: {
          status: "ok",
          message: "Nessuna interazione nota. La Lattoferrina è sicura e ben tollerata",
        },
        overlapCheck: {
          status: childAge <= 3 ? "ok" : "warning",
          message: childAge <= 3
            ? "Nessuna sovrapposizione con altri prodotti nel carrello"
            : "Contiene Vitamina D3 — verificare che non ci sia sovrapposizione con PediaTre® DHA",
        },
        finalVerdict: childAge <= 3
          ? "Prodotto sicuro e indicato. ImmunoPed® BABY è specificamente formulato per le difese immunitarie dei più piccoli."
          : "Prodotto sicuro ma formulato per bambini più piccoli. Valutare alternative più adatte all'età.",
        recommendations: [
          "Somministrare le gocce direttamente in bocca o in un po' di latte",
          "Conservare in luogo fresco e asciutto dopo l'apertura",
          ...(childAge > 3 ? ["Considerare PediaC® o PediaFort® per questa fascia d'età"] : []),
        ],
      };
    case 2: // Pancino® Bustine
      return {
        ageCheck: {
          status: "ok",
          message: "Adatto da 0 mesi — Lactobacillus rhamnosus GG sicuro per tutte le età pediatriche",
        },
        dosageCheck: {
          status: childAge < 1 ? "warning" : "ok",
          message: childAge < 1
            ? "Per neonati: verificare dosaggio con il pediatra. Possibile riduzione a mezza bustina"
            : "1 bustina al giorno — dosaggio standard pediatrico",
        },
        interactionCheck: {
          status: "ok",
          message: "Nessuna interazione significativa nota. Compatibile con antibiotici (assumere a 2 ore di distanza)",
        },
        overlapCheck: {
          status: "ok",
          message: "Nessuna sovrapposizione rilevata — prodotto specifico per flora intestinale",
        },
        finalVerdict: "Prodotto sicuro e ben tollerato. Lactobacillus rhamnosus GG è il ceppo probiotico più studiato in ambito pediatrico.",
        recommendations: [
          "Sciogliere in acqua o latte a temperatura ambiente (non caldo)",
          "Assumere preferibilmente a stomaco vuoto o lontano dai pasti",
          "Dopo terapia antibiotica: iniziare durante e continuare per 2 settimane dopo",
        ],
      };
    case 3: // PediaC® Compresse
      return {
        ageCheck: {
          status: childAge >= 3 ? "ok" : "danger",
          message: childAge >= 3
            ? "Compresse masticabili adatte per bambini dai 3 anni in su"
            : "ATTENZIONE: Compresse masticabili NON adatte sotto i 3 anni — rischio soffocamento",
        },
        dosageCheck: {
          status: "ok",
          message: childAge >= 3 && childAge < 6
            ? "1 compressa al giorno — dosaggio adeguato per fascia 3-6 anni"
            : childAge >= 6
              ? "1-2 compresse al giorno — dosaggio per bambini sopra i 6 anni"
              : "Non somministrare — formato non idoneo per questa età",
        },
        interactionCheck: {
          status: "ok",
          message: "Vitamina C sicura e senza interazioni significative a dosaggi standard",
        },
        overlapCheck: {
          status: "warning",
          message: "Se il bambino assume già un multivitaminico, verificare il contenuto totale di Vitamina C per evitare sovradosaggio",
        },
        finalVerdict: childAge >= 3
          ? "Prodotto sicuro. La Vitamina C contribuisce alla normale funzione del sistema immunitario. Formato pratico e gradevole."
          : "PRODOTTO NON IDONEO per bambini sotto i 3 anni. Formato compresse masticabili inadeguato.",
        recommendations: childAge >= 3
          ? [
              "Masticare bene la compressa prima di deglutire",
              "Assumere durante o dopo un pasto per migliore tollerabilità",
              "Non superare la dose giornaliera raccomandata",
            ]
          : [
              "Per bambini sotto i 3 anni, considerare ImmunoPed® BABY (gocce)",
              "Oppure PediaVit® Gocce come alternativa multivitaminica in gocce",
            ],
      };
    case 4: // PediaMente® Flaconcini
      return {
        ageCheck: {
          status: childAge >= 6 ? "ok" : childAge >= 3 ? "warning" : "danger",
          message: childAge >= 6
            ? "Prodotto indicato per bambini dai 6 anni — idoneo per età"
            : childAge >= 3
              ? "Prodotto formulato per bambini dai 6 anni. Per 3-6 anni consultare il pediatra"
              : "NON adatto sotto i 3 anni. Gli estratti vegetali non sono indicati per questa fascia d'età",
        },
        dosageCheck: {
          status: childAge >= 6 ? "ok" : "warning",
          message: childAge >= 6
            ? "1 flaconcino al giorno, al mattino — dosaggio standard"
            : "Dosaggio da valutare con il pediatra per questa fascia d'età",
        },
        interactionCheck: {
          status: "warning",
          message: "Contiene Eleuterococco, Rhodiola e Ginkgo — segnalare al pediatra se il bambino assume farmaci per l'attenzione o anticoagulanti",
        },
        overlapCheck: {
          status: "ok",
          message: "Nessuna sovrapposizione con prodotti comuni per l'età scolare",
        },
        finalVerdict: childAge >= 6
          ? "Prodotto sicuro per la fascia d'età. Gli estratti vegetali e le vitamine B supportano memoria e concentrazione, ideale in periodi scolastici intensi."
          : "Prodotto non indicato per questa fascia d'età. Consultare il pediatra per alternative.",
        recommendations: childAge >= 6
          ? [
              "Assumere al mattino per massimo beneficio durante le ore scolastiche",
              "Può essere miscelato con un po' di acqua o succo",
              "Ideale durante periodi di studio intenso o esami",
            ]
          : [
              "Per bambini più piccoli, PediaVit® Complesso B sciroppo offre supporto vitaminico B",
              "Consultare il pediatra per integratori adatti all'età",
            ],
      };
    case 5: // PediaFort® 1000
    default:
      return {
        ageCheck: {
          status: childAge >= 3 ? "ok" : "danger",
          message: childAge >= 3
            ? "Prodotto adatto dai 3 anni — idoneo per l'età"
            : "NON adatto sotto i 3 anni. Contiene miele e prodotti dell'alveare",
        },
        dosageCheck: {
          status: "ok",
          message: childAge >= 3 && childAge < 6
            ? "1 flaconcino al giorno — dosaggio per fascia 3-6 anni"
            : childAge >= 6
              ? "1 flaconcino al giorno — dosaggio standard"
              : "Non somministrare per questa fascia d'età",
        },
        interactionCheck: {
          status: "warning",
          message: "Contiene Propoli e prodotti dell'alveare — verificare assenza di allergie a miele/propoli/polline",
        },
        overlapCheck: {
          status: "ok",
          message: "Compatibile con altri integratori. Ottimo in combinazione con PediaC® per supporto stagionale",
        },
        finalVerdict: childAge >= 3
          ? "Prodotto sicuro con attenzione alle allergie ai prodotti dell'alveare. Pappa Reale eccellente come ricostituente naturale."
          : "PRODOTTO NON IDONEO sotto i 3 anni per la presenza di miele (rischio botulismo infantile) e prodotti dell'alveare.",
        recommendations: childAge >= 3
          ? [
              "Assumere al mattino, preferibilmente a stomaco vuoto",
              "Prima somministrazione: verificare assenza di allergia ai prodotti dell'alveare",
              "Ideale nei cambi di stagione e periodi di convalescenza",
            ]
          : [
              "Per neonati e lattanti: ImmunoPed® BABY è l'alternativa sicura",
              "MAI somministrare miele a bambini sotto i 12 mesi",
            ],
      };
  }
}

export default function SafetyModule() {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [selectedAge, setSelectedAge] = useState(3); // default: 3-6 anni
  const [isChecking, setIsChecking] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<SafetyResult | null>(null);

  const runCheck = (id: number) => {
    setSelectedProduct(id);
    setShowResult(false);
    setIsChecking(true);
    setTimeout(() => {
      const childAge = ageOptions[selectedAge].minAge;
      setResult(computeSafetyCheck(id, childAge));
      setIsChecking(false);
      setShowResult(true);
    }, 1500);
  };

  const StatusIcon = ({ status }: { status: CheckStatus }) => {
    if (status === "ok") return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    if (status === "warning") return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--border)]/30">
        <div className="mb-5">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Baby className="w-5 h-5 text-violet-500" />
            Seleziona l&apos;età del bambino
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {ageOptions.map((age, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedAge(i);
                  setShowResult(false);
                  setSelectedProduct(null);
                }}
                className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                  selectedAge === i
                    ? "border-violet-500 bg-violet-50 text-violet-700"
                    : "border-[var(--border)]/30 hover:border-violet-300"
                }`}
              >
                {age.label}
              </button>
            ))}
          </div>
        </div>

        <h3 className="font-semibold mb-3">Seleziona un prodotto per il controllo sicurezza</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => runCheck(p.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                selectedProduct === p.id
                  ? "border-violet-500 bg-violet-50"
                  : "border-[var(--border)]/30 hover:border-violet-300 hover:bg-violet-50/50"
              }`}
            >
              <h4 className="font-semibold text-sm">{p.name}</h4>
              <p className="text-xs text-[var(--text-tertiary)]">
                {p.category} · {p.ages}
              </p>
            </button>
          ))}
        </div>
      </div>

      {isChecking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-12 rounded-[var(--radius-lg)] bg-white border border-[var(--border)]/30 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-400 flex items-center justify-center mx-auto mb-4 pulse-glow">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-semibold mb-1">Verifica sicurezza in corso...</h3>
          <p className="text-sm text-[var(--text-secondary)]">
            Controllo età, dosaggio, interazioni e sovrapposizioni
          </p>
          <div className="flex gap-1 justify-center mt-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-violet-500"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {showResult && result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--border)]/30">
            <h3 className="font-semibold mb-4">Risultati Verifica Sicurezza</h3>
            <div className="space-y-3">
              {[
                { label: "Idoneità per età", ...result.ageCheck },
                { label: "Verifica dosaggio", ...result.dosageCheck },
                { label: "Interazioni", ...result.interactionCheck },
                { label: "Sovrapposizioni", ...result.overlapCheck },
              ].map((check, i) => (
                <motion.div
                  key={check.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-start gap-3 p-4 rounded-xl ${
                    check.status === "ok"
                      ? "bg-emerald-50 border border-emerald-100"
                      : check.status === "warning"
                        ? "bg-amber-50 border border-amber-100"
                        : "bg-red-50 border border-red-100"
                  }`}
                >
                  <StatusIcon status={check.status} />
                  <div>
                    <p className="font-medium text-sm">{check.label}</p>
                    <p
                      className={`text-xs mt-0.5 ${
                        check.status === "ok"
                          ? "text-emerald-700"
                          : check.status === "warning"
                            ? "text-amber-700"
                            : "text-red-700"
                      }`}
                    >
                      {check.message}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-[var(--radius-lg)] bg-gradient-to-br from-violet-500 to-purple-400 text-white">
              <h4 className="font-semibold mb-2">Verdetto Finale</h4>
              <p className="text-sm text-white/90 leading-relaxed">{result.finalVerdict}</p>
            </div>

            <div className="p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--border)]/30">
              <h4 className="font-semibold mb-3">Raccomandazioni d&apos;uso</h4>
              <div className="space-y-2">
                {result.recommendations.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
