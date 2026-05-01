import { motion } from "motion/react";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-8"
          >
            <CheckCircle2 size={16} />
            Updated for the 2026 Election Cycle
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl lg:text-8xl"
          >
            Your Voice, <br />
            <span className="text-blue-600">Your Vote.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-500 sm:text-xl"
          >
            Follow our simple guide to ensure your voice is heard in the upcoming elections. 
            Official, non-partisan information at your fingertips.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-6"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
              <a
                href="#process"
                aria-label="Start the election journey guide"
                className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all group"
              >
                Get Started
              </a>
              <a href="#assistant" className="text-sm font-bold text-slate-900 hover:text-blue-600">
                Talk to Assistant <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

            <div className="flex flex-col items-center gap-3">
              <label htmlFor="state-select" className="text-xs font-bold uppercase tracking-widest text-slate-400">Select your State/UT for local info</label>
              <select 
                id="state-select"
                className="appearance-none rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
              >
                <option value="">All States & UTs</option>
                <option value="UP">Uttar Pradesh</option>
                <option value="MH">Maharashtra</option>
                <option value="BR">Bihar</option>
                <option value="WB">West Bengal</option>
                <option value="KA">Karnataka</option>
                <option value="TN">Tamil Nadu</option>
                <option value="DL">Delhi</option>
                {/* More states added for India context */}
              </select>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 -z-10 h-full w-full bg-slate-50 opacity-40"></div>
    </section>
  );
}
