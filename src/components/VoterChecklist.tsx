import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Check, ClipboardList, Lock } from "lucide-react";
import { cn } from "../lib/utils";
import { useAuth } from "../contexts/AuthContext";
import { db, signInWithGoogle } from "../lib/firebase";
import { collection, query, getDocs, setDoc, doc, onSnapshot } from "firebase/firestore";
import { handleFirestoreError, OperationType } from "../lib/firestore-errors";

const DEFAULT_TASKS = [
  { id: '1', label: 'Verify name in Electoral Roll (NVSP)', completed: false },
  { id: '2', label: 'Check polling booth location', completed: false },
  { id: '3', label: 'Download Voter Helpline App', completed: false },
  { id: '4', label: 'Research candidates crimial record (KYC)', completed: false },
  { id: '5', label: 'Carry EPIC card or Aadhaar for voting', completed: false },
  { id: '6', label: 'Set reminder for my phase polling date', completed: false },
];

export function VoterChecklist() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState(DEFAULT_TASKS);
  const [loadingItems, setLoadingItems] = useState(false);

  // Sync with Firestore or LocalStorage
  useEffect(() => {
    if (!user) {
      const saved = localStorage.getItem('civicpulse_checklist');
      if (saved) {
        try {
          setTasks(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to load checklist", e);
        }
      }
      return;
    }

    setLoadingItems(true);
    const checklistRef = collection(db, `users/${user.uid}/checklist`);
    
    const unsubscribe = onSnapshot(checklistRef, (snapshot) => {
      if (!snapshot.empty) {
        const fetchedTasks = snapshot.docs.map(doc => doc.data() as typeof DEFAULT_TASKS[0]);
        // Merge with DEFAULT_TASKS to ensure all default items are present if they haven't been synced yet
        const merged = DEFAULT_TASKS.map(dt => {
          const found = fetchedTasks.find(ft => ft.id === dt.id);
          return found || dt;
        });
        setTasks(merged);
      } else {
        setTasks(DEFAULT_TASKS);
      }
      setLoadingItems(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `users/${user.uid}/checklist`);
      setLoadingItems(false);
    });

    return () => unsubscribe();
  }, [user]);

  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newCompleted = !task.completed;
    const newTasks = tasks.map(t => t.id === id ? { ...t, completed: newCompleted } : t);
    setTasks(newTasks);

    if (user) {
      try {
        const taskRef = doc(db, `users/${user.uid}/checklist`, id);
        await setDoc(taskRef, {
          ...task,
          userId: user.uid,
          taskId: id,
          completed: newCompleted,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}/checklist/${id}`);
      }
    } else {
      localStorage.setItem('civicpulse_checklist', JSON.stringify(newTasks));
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = (completedCount / tasks.length) * 100;

  return (
    <section id="checklist" className="py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-slate-900 p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-2">My Voter Status</h3>
                <p className="text-slate-400 text-sm">Personal checklist to track your progress.</p>
              </div>
              {!user && (
                <button 
                  onClick={() => signInWithGoogle()}
                  className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-xs font-bold text-white hover:bg-slate-700 transition-all active:scale-95 border border-slate-700"
                >
                  <Lock size={14} className="text-blue-500" />
                  Sign in to Save Progress
                </button>
              )}
            </div>

            <div className="mb-10">
              <div className="flex justify-between items-end mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Progress</span>
                <span className="text-xl font-bold text-white">
                  {loadingItems ? "..." : `${Math.round(progress)}%`}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all border",
                    task.completed 
                      ? "bg-slate-800/80 border-slate-700 text-white" 
                      : "bg-slate-900 border-slate-700 hover:border-slate-500 text-slate-400"
                  )}
                >
                  <div className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all",
                    task.completed ? "bg-blue-600 border-blue-600" : "border-slate-600"
                  )}>
                    {task.completed && <Check size={12} className="text-white" />}
                  </div>
                  <span className={cn(
                    "text-sm font-medium",
                    task.completed ? "opacity-50" : ""
                  )}>
                    {task.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="absolute bottom-0 right-0 p-8 opacity-10 pointer-events-none">
             <ClipboardList size={200} className="text-slate-100 rotate-12" />
          </div>
        </div>
      </div>
    </section>
  );
}
