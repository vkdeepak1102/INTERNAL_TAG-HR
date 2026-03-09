export function IndiumLogo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 168 48"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Indium"
      role="img"
    >
      <defs>
        <linearGradient id="indGrad" x1="0%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%" stopColor="#BF4300" />
          <stop offset="55%" stopColor="#E55C00" />
          <stop offset="100%" stopColor="#FF7400" />
        </linearGradient>
      </defs>

      {/* I — left pillar */}
      <rect x="0" y="8" width="8" height="32" rx="1" fill="url(#indGrad)" />

      {/* N — left pillar */}
      <rect x="14" y="8" width="8" height="32" rx="1" fill="url(#indGrad)" />
      {/* N — broad diagonal wedge */}
      <polygon points="14,8 22,8 40,40 32,40" fill="url(#indGrad)" />
      {/* N — right pillar */}
      <rect x="32" y="8" width="8" height="32" rx="1" fill="url(#indGrad)" />

      {/* DIUM — white, clean weight */}
      <text
        x="50"
        y="36"
        fill="rgba(255,255,255,0.82)"
        fontFamily="system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
        fontSize="22"
        fontWeight="600"
        letterSpacing="2"
      >
        DIUM
      </text>
    </svg>
  );
}
