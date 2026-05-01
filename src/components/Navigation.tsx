import { Vote, LogOut, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { signInWithGoogle, logout } from "../lib/firebase";

export function Navigation() {
  const { user, loading } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 font-bold text-white uppercase">
            C
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">CivicPulse</span>
        </div>
        <div className="hidden items-center gap-6 text-sm font-medium text-slate-500 md:flex">
          <a href="#process" className="text-blue-600 hover:text-blue-700 transition-colors">Overview</a>
          <a href="#timeline" className="hover:text-slate-900 transition-colors">Timeline</a>
          <a href="#checklist" className="hover:text-slate-900 transition-colors">Voter Status</a>
          <a href="#assistant" className="hover:text-slate-900 transition-colors">Resources</a>
          
          {user ? (
            <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ""} className="h-8 w-8 rounded-full" />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                    <User size={16} />
                  </div>
                )}
                <span className="text-slate-900 line-clamp-1 max-w-[120px]">{user.displayName || user.email}</span>
              </div>
              <button 
                onClick={() => logout()}
                className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => signInWithGoogle()}
              className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 transition-all active:scale-95"
            >
              Sign In with Google
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
