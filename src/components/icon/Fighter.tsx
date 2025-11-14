import React from "react";

interface FighterProps extends React.SVGProps<SVGSVGElement> {
    flipped?: boolean;
}

export const Fighter: React.FC<FighterProps> = ({ flipped = false, style, ...props }) => (
    <svg
        width={80}
        height={40}
        viewBox="0 0 80 40"
        xmlns="http://www.w3.org/2000/svg"
        style={{
            transform: flipped ? "rotate(180deg)" : undefined,
            transformOrigin: "center",
            ...style,
        }}
        {...props}
    >
        {/* Rumpf */}
        <rect x={18} y={12} width={44} height={16} rx={8} fill="#4f46e5" stroke="#1e293b" strokeWidth={2} />

        {/* Cockpit */}
        <rect x={32} y={9} width={16} height={10} rx={5} fill="#e5e7eb" stroke="#0f172a" strokeWidth={1.5} />

        {/* Nase */}
        <polygon points="62,12 72,20 62,28" fill="#6366f1" stroke="#1e293b" strokeWidth={2} />

        {/* Heckflossen */}
        <polygon points="18,12 12,6 18,14" fill="#4b5563" stroke="#111827" strokeWidth={1.5} />
        <polygon points="18,28 12,34 18,26" fill="#4b5563" stroke="#111827" strokeWidth={1.5} />

        {/* Flügel */}
        <polygon points="32,12 20,4 30,16" fill="#22c55e" stroke="#065f46" strokeWidth={1.5} />
        <polygon points="32,28 20,36 30,24" fill="#22c55e" stroke="#065f46" strokeWidth={1.5} />

        {/* Triebwerk */}
        <circle cx={18} cy={20} r={4} fill="#f97316" stroke="#9a3412" strokeWidth={1.5} />
        <polygon points="10,20 4,16 4,24" fill="#facc15" stroke="#92400e" strokeWidth={1.5} />

        {/* Kanonen */}
        <line x1={54} y1={14} x2={68} y2={14} stroke="#0f172a" strokeWidth={2} strokeLinecap="round" />
        <line x1={54} y1={26} x2={68} y2={26} stroke="#0f172a" strokeWidth={2} strokeLinecap="round" />
    </svg>
);
