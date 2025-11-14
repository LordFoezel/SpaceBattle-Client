import React from "react";

export const Cargo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width={130} height={36} viewBox="0 0 130 36" xmlns="http://www.w3.org/2000/svg" {...props}>
        {/* Base hull */}
        <rect x={18} y={8} width={92} height={20} rx={9} fill="#4f46e5" stroke="#1e293b" strokeWidth={2} />
        <rect x={18} y={16} width={92} height={12} rx={7} fill="#4338ca" opacity={0.9} />

        {/* Bow */}
        <polygon points="110,8 126,16 126,20 110,28" fill="#6366f1" stroke="#1e293b" strokeWidth={1.8} />
        <rect x={106} y={12} width={10} height={12} rx={3} fill="#e5e7eb" stroke="#0f172a" strokeWidth={1.2} />

        {/* Tail + engines */}
        <polygon points="18,8 8,12 6,18 8,24 18,28" fill="#1f2937" stroke="#020617" strokeWidth={1.6} />
        <circle cx={10} cy={14} r={3.2} fill="#f97316" stroke="#9a3412" strokeWidth={1} />
        <circle cx={10} cy={22} r={3.2} fill="#f97316" stroke="#9a3412" strokeWidth={1} />

        {/* Cargo segments */}
        <rect x={26} y={10} width={20} height={16} rx={3} fill="#22c55e" stroke="#065f46" strokeWidth={1.2} />
        <rect x={48} y={10} width={20} height={16} rx={3} fill="#f97316" stroke="#9a3412" strokeWidth={1.2} />
        <rect x={70} y={10} width={20} height={16} rx={3} fill="#0ea5e9" stroke="#075985" strokeWidth={1.2} />
        <rect x={92} y={10} width={20} height={16} rx={3} fill="#a855f7" stroke="#6b21a8" strokeWidth={1.2} />

        {/* Segment dividers */}
        <line x1={36} y1={10} x2={36} y2={26} stroke="#0f172a" strokeWidth={1.6} strokeLinecap="round" />
        <line x1={58} y1={10} x2={58} y2={26} stroke="#0f172a" strokeWidth={1.6} strokeLinecap="round" />
        <line x1={80} y1={10} x2={80} y2={26} stroke="#0f172a" strokeWidth={1.6} strokeLinecap="round" />
        <line x1={102} y1={10} x2={102} y2={26} stroke="#0f172a" strokeWidth={1.6} strokeLinecap="round" />

        {/* Windows */}
        <circle cx={42} cy={20} r={1.4} fill="#a5b4fc" />
        <circle cx={64} cy={20} r={1.4} fill="#a5b4fc" />
        <circle cx={86} cy={20} r={1.4} fill="#a5b4fc" />
        <circle cx={108} cy={20} r={1.4} fill="#a5b4fc" />
    </svg>
);
