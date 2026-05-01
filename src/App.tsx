import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { ElectionProcess } from "./components/ElectionProcess";
import { Timeline } from "./components/Timeline";
import { VoterChecklist } from "./components/VoterChecklist";
import { Assistant } from "./components/Assistant";
import { Vote } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navigation />
      
      <main>
        <Hero />
        <ElectionProcess />
        <Timeline />
        <VoterChecklist />
        <Assistant />
      </main>

      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-slate-500">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Vote size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">CivicPulse</span>
            </div>
            <div className="flex gap-8 text-sm font-medium">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Digital Accessibility</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Official Election Site</a>
            </div>
            <p className="text-xs">
              © {new Date().getFullYear()} CivicPulse. Official Non-Partisan Election Portal.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
