import React from 'react';
import { BookOpen, AlertCircle, CheckCircle, Star } from 'lucide-react';

interface RefinedJd {
  key_skills: string[];
  mandatory_skills: string[];
  good_to_have_skills: string[];
  raw?: string;
}

interface Props {
  refinedJd: RefinedJd | null;
}

interface SkillSectionProps {
  title: string;
  skills: string[];
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
}

function SkillSection({ title, skills, icon, color, bgColor, borderColor }: SkillSectionProps) {
  if (!skills || skills.length === 0) return null;
  return (
    <div className={`${bgColor} border ${borderColor} rounded-lg p-4`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={color}>{icon}</span>
        <h4 className={`text-xs font-semibold uppercase tracking-widest ${color}`}>{title}</h4>
      </div>
      <ul className="space-y-1.5">
        {skills.map((skill, i) => (
          <li key={i} className="text-sm text-text-primary leading-snug flex gap-2">
            <span className={`mt-0.5 shrink-0 ${color} opacity-60`}>•</span>
            <span>{skill}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function JdSkillsCard({ refinedJd }: Props) {
  if (!refinedJd) return null;

  const hasAny =
    (refinedJd.key_skills?.length ?? 0) > 0 ||
    (refinedJd.mandatory_skills?.length ?? 0) > 0 ||
    (refinedJd.good_to_have_skills?.length ?? 0) > 0;

  if (!hasAny) return null;

  return (
    <div className="bg-bg-card rounded-xl border border-white/[0.06] p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-indigo-400" />
        <h3 className="text-base font-semibold text-text-primary">JD Skills Analysis</h3>
        <span className="ml-auto text-[10px] font-medium uppercase tracking-widest text-text-muted bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full">
          AI Refined
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <SkillSection
          title="Key Skills"
          skills={refinedJd.key_skills}
          icon={<Star className="w-3.5 h-3.5" />}
          color="text-indigo-400"
          bgColor="bg-indigo-500/5"
          borderColor="border-indigo-500/20"
        />
        <SkillSection
          title="Mandatory Skills"
          skills={refinedJd.mandatory_skills}
          icon={<AlertCircle className="w-3.5 h-3.5" />}
          color="text-red-400"
          bgColor="bg-red-500/5"
          borderColor="border-red-500/20"
        />
        <SkillSection
          title="Good to Have"
          skills={refinedJd.good_to_have_skills}
          icon={<CheckCircle className="w-3.5 h-3.5" />}
          color="text-emerald-400"
          bgColor="bg-emerald-500/5"
          borderColor="border-emerald-500/20"
        />
      </div>
    </div>
  );
}
