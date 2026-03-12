import React from 'react';
import { MessageSquare } from 'lucide-react';

interface Props {
  summary: string | null;
  scoreCategory?: 'Poor' | 'Moderate' | 'Good' | null;
}

export function PanelSummaryCard({ summary, scoreCategory }: Props) {
  if (!summary) return null;

  const accentColor =
    scoreCategory === 'Good'
      ? 'border-l-emerald-500'
      : scoreCategory === 'Moderate'
      ? 'border-l-orange-500'
      : 'border-l-red-500';

  return (
    <div className="bg-bg-card rounded-xl border border-white/[0.06] p-5 space-y-3">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-orange-400" />
        <h3 className="text-base font-semibold text-text-primary">Panel Summary</h3>
        <span className="ml-auto text-[10px] font-medium uppercase tracking-widest text-text-muted bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full">
          AI Generated
        </span>
      </div>

      <div className={`border-l-4 ${accentColor} pl-4 space-y-2`}>
        {summary.includes('- ') || summary.includes('* ') ? (
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-text-primary marker:text-orange-500/80">
            {summary
              .split('\n')
              .map((line) => line.trim().replace(/^[-*]\s*/, ''))
              .filter(Boolean)
              .map((item, i) => (
                <li key={i} className="leading-relaxed">
                  {item}
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
            {summary}
          </p>
        )}
      </div>
    </div>
  );
}
