import React, { useEffect, useState } from 'react';
import { ProgressRing } from './ProgressRing';
import { dashboardApi } from '@/lib/api/dashboard.api';

const MAX_SCORE = 11.0;

interface Props {
  score: number;
  category: 'Poor' | 'Moderate' | 'Good' | null;
  panelName?: string;
  subtitle?: string;
}

function CategoryBadge({ category }: { category: 'Poor' | 'Moderate' | 'Good' | null }) {
  if (!category) return null;
  const styles =
    category === 'Good'
      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
      : category === 'Moderate'
      ? 'bg-orange-500/15 border-orange-500/30 text-orange-300'
      : 'bg-red-500/15 border-red-500/30 text-red-300';
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${styles}`}>
      {category}
    </span>
  );
}

export function ScoreCard({ score, category, panelName, subtitle }: Props) {
  const percent = Math.max(0, Math.min(100, (score / MAX_SCORE) * 100));
  const [overallAvg, setOverallAvg] = useState<number | null>(null);

  useEffect(() => {
    if (!panelName) return;
    dashboardApi.fetchPanelEfficiency().then((data) => {
      const match = data.panels.find(
        (p) => p.panelName?.toLowerCase() === panelName.toLowerCase()
      );
      setOverallAvg(match?.averageScore ?? null);
    }).catch(() => {/* silently ignore */});
  }, [panelName]);

  return (
    <div className="bg-bg-card rounded-xl border border-white/[0.06] p-5 space-y-4">
      {/* Title + badge */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-text-primary">Panel Efficiency</h3>
        <CategoryBadge category={category} />
      </div>

      {/* Ring + scores */}
      <div className="flex items-center gap-5">
        <div className="flex-none">
          <ProgressRing size={80} stroke={9} progress={percent} />
        </div>

        <div className="flex-1 space-y-3">
          {/* Panel Score */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-text-muted mb-0.5">Panel Score</p>
            <p className="text-2xl font-bold text-text-primary leading-none">
              {score.toFixed(1)}
              <span className="text-sm font-normal text-text-muted"> / {MAX_SCORE.toFixed(1)}</span>
            </p>
          </div>

          {/* Overall Panel Efficiency */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-text-muted mb-0.5">
              Overall Panel Efficiency
            </p>
            {overallAvg !== null ? (
              <p className="text-2xl font-bold text-orange-300 leading-none">
                {overallAvg.toFixed(1)}
                <span className="text-sm font-normal text-text-muted"> / {MAX_SCORE.toFixed(1)}</span>
              </p>
            ) : (
              <p className="text-sm text-text-muted italic">
                {panelName ? 'Loading…' : 'N/A'}
              </p>
            )}
          </div>
        </div>
      </div>

      {subtitle && <p className="text-xs text-text-muted truncate">{subtitle}</p>}
    </div>
  );
}
