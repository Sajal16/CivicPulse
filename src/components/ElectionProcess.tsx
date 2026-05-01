import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserPlus, Search, Vote, CheckCircle, ChevronRight, X } from "lucide-react";
import { ELECTION_STEPS } from "../data/election";
import { cn } from "../lib/utils";

const ICONS = {
  UserPlus: UserPlus,
  Search: Search,
  Vote: Vote,
  CheckCircle: CheckCircle,
  Info: Search, // Fallback to Search if Info is not imported
};

export function ElectionProcess() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedStep = ELECTION_STEPS.find(s => s.id === selectedId);

  return (
    <section id="process" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900">Election Process Guide</h2>
          <p className="mt-2 text-lg text-slate-500">
            Follow these simple steps to ensure your voice is heard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ELECTION_STEPS.map((step, index) => {
            const Icon = ICONS[step.icon as keyof typeof ICONS];
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setSelectedId(step.id)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white p-8 border border-slate-200 shadow-sm transition-all hover:border-blue-300 hover:shadow-md active:scale-[0.98]"
              >
                <div className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all ring-4 ring-transparent group-hover:ring-blue-50">
                  {index + 1}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-blue-600 transition-colors mb-2">Step {index + 1}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  {step.description}
                </p>
                <div className="flex items-center text-sm font-bold text-blue-600 opacity-60 group-hover:opacity-100 transition-all">
                  Read Guide <ChevronRight size={14} className="ml-1" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {selectedId && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="fixed inset-0 z-[60] bg-slate-900/20 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-x-4 top-[10%] z-[70] mx-auto max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200"
              >
                <div className="relative p-8 md:p-12">
                  <button 
                    onClick={() => setSelectedId(null)}
                    className="absolute right-6 top-6 rounded-full p-2 text-slate-400 hover:bg-slate-100 transition-all"
                  >
                    <X size={20} />
                  </button>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-blue-600 font-bold text-sm tracking-wide">PHASE 0{ELECTION_STEPS.findIndex(s => s.id === selectedId) + 1}</span>
                      <h2 className="text-3xl font-bold text-slate-900">{selectedStep?.title}</h2>
                    </div>
                    {selectedId === 'registration' && (
                       <div className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded-full uppercase tracking-widest border border-red-100">High Priority</div>
                    )}
                  </div>

                  <p className="text-lg leading-relaxed text-slate-600 mb-8">
                    {selectedStep?.longDescription}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="p-5 border border-slate-100 rounded-xl bg-slate-50">
                      <h4 className="font-bold text-slate-900 mb-1">Key Resource</h4>
                      <p className="text-sm text-slate-500">Official guidance for {selectedStep?.title.toLowerCase()}.</p>
                    </div>
                    <div className="p-5 border border-slate-100 rounded-xl bg-slate-50">
                      <h4 className="font-bold text-slate-900 mb-1">Recommended Action</h4>
                      <p className="text-sm text-slate-500">Complete this step before next deadline.</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedId(null)} 
                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                  >
                    Continue to Next Step
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
