import React, { useEffect } from 'react';
import { useL2Validation } from '@/hooks/use-l2-validation';
import { ProbingDepthBadge } from './ProbingDepthBadge';
import { ValidationEvidence } from './ValidationEvidence';

interface Props {
  l1Transcript: string;
  l2RejectionReason?: string;
  autoValidate?: boolean;
}

/** Strip CSV header rows and return a clean rejection reason string */
function cleanRejectionReason(raw: string): string {
  if (!raw) return '';
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  // Drop header-like rows e.g. "Job Interview ID,L2 Rejected Reason"
  const headerPatterns = [
    /^job.{0,5}interview.{0,5}id/i,
    /^l2.{0,5}rejected?.{0,5}reason/i,
    /^job_id/i,
  ];
  const contentLines = lines.filter(
    (l) => !headerPatterns.some((p) => p.test(l))
  );

  // If the first content line still looks like it has an ID prefix (e.g. "JOB-001,reason text")
  // take everything after the first comma
  if (contentLines.length > 0) {
    const first = contentLines[0];
    // Heuristic: if line contains a comma and first segment has no spaces → ID,reason
    const commaIdx = first.indexOf(',');
    if (commaIdx > 0 && !first.substring(0, commaIdx).includes(' ')) {
      contentLines[0] = first.substring(commaIdx + 1).trim();
    }
  }

  return contentLines.join(' ').trim();
}

export function L2ValidatorCard({
  l1Transcript,
  l2RejectionReason = '',
  autoValidate = false,
}: Props) {
  const { result, isLoading, error, validateL2Reason } = useL2Validation();

  const cleanedReason = cleanRejectionReason(l2RejectionReason);

  // Auto-validate once when both reason and transcript are available
  useEffect(() => {
    if (autoValidate && cleanedReason && l1Transcript?.trim() && !result && !isLoading) {
      validateL2Reason(l1Transcript, cleanedReason);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoValidate, cleanedReason, l1Transcript]);

  if (!cleanedReason && !result) return null;

  return (
    <div
      className="bg-bg-card rounded-xl border border-white/[0.06] p-6 space-y-5"
      data-testid="l2-validator"
    >
      {/* Header */}
      <h3 className="text-base font-semibold text-text-primary">
        L2 Rejection Reason Validation
      </h3>

      {error && (
        <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded px-3 py-2">
          {error}
        </div>
      )}

      {/* Rejection reason display */}
      {cleanedReason && (
        <div className="bg-white/[0.03] border border-white/[0.07] rounded-lg px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-widest text-text-muted mb-2">
            Rejection Reason
          </p>
          <p className="text-sm text-text-primary leading-relaxed">{cleanedReason}</p>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <span className="inline-block w-4 h-4 border-2 border-white/20 border-t-orange-400 rounded-full animate-spin" />
          Validating against transcript…
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="space-y-4 pt-2 border-t border-white/[0.06]">
          {/* Probing depth + confidence */}
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-text-muted mb-1.5">
                Probing Depth
              </p>
              <ProbingDepthBadge depth={result.probingDepth} />
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-text-muted">Validation Confidence</p>
              <p className="text-lg font-bold text-text-primary">
                {(result.confidence * 100).toFixed(0)}%
              </p>
            </div>
          </div>

          {/* Matching questions */}
          {result.matchedQuestions && result.matchedQuestions.length > 0 && (
            <ValidationEvidence questions={result.matchedQuestions} />
          )}
        </div>
      )}
    </div>
  );
}
