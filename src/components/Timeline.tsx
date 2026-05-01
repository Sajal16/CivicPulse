import { motion } from "motion/react";
import { Calendar, Clock, AlertCircle, CalendarPlus } from "lucide-react";
import { TIMELINE_EVENTS } from "../data/election";
import { cn } from "../lib/utils";

export function Timeline() {
  const getCalendarLink = (title: string, dateStr: string) => {
    const baseUrl = "https://www.google.com/calendar/render?action=TEMPLATE";
    const text = encodeURIComponent(title);
    // Simple mock year for link generation (assuming 2026 for this cycle)
    const year = 2026;
    let dates = "20261103T090000Z/20261103T170000Z"; // Default Election Day
    
    if (title.toLowerCase().includes("registration")) dates = "20261015T090000Z/20261015T170000Z";
    if (title.toLowerCase().includes("primary")) dates = "20260602T090000Z/20260602T170000Z";
    
    return `${baseUrl}&text=${text}&dates=${dates}&details=CivicPulse%20Election%20Reminder&location=Your%20Polling%20Place`;
  };

  return (
    <section id="timeline" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900">Critical Deadlines</h2>
          <p className="mt-2 text-lg text-slate-500">Important dates for the upcoming cycle.</p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-100 md:left-1/2"></div>

          <div className="space-y-12">
            {TIMELINE_EVENTS.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "relative flex flex-col md:flex-row gap-8 items-start",
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                )}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-[5px] w-2.5 h-2.5 rounded-full bg-slate-200 border-4 border-slate-50 z-10"></div>

                {/* Content */}
                <div className="flex-1 ml-12 md:ml-0 md:w-1/2">
                  <div className={cn(
                    "p-8 bg-white rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md",
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  )}>
                    <div className={cn(
                      "flex items-center gap-2 mb-4",
                      index % 2 === 0 ? "md:justify-end" : "justify-start"
                    )}>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{event.date}</div>
                      {event.category === 'deadline' && (
                        <div className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold rounded uppercase tracking-widest border border-red-100">Priority</div>
                      )}
                    </div>
                    <div className={cn(
                      "flex flex-col gap-2",
                      index % 2 === 0 ? "md:items-end" : "items-start"
                    )}>
                      <h3 className="text-xl font-bold text-slate-900">{event.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-500 mb-4">{event.description}</p>
                      <a 
                        href={getCalendarLink(event.title, event.date)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <CalendarPlus size={14} />
                        Add to Calendar
                      </a>
                    </div>
                  </div>
                </div>

                {/* Space for the other side on desktop */}
                <div className="hidden md:block flex-1 md:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
