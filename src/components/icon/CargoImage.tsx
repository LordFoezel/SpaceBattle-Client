import React from "react";

export const CargoImage: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width={160} height={40} viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x={16} y={8} width={120} height={24} rx={10} fill="#4f46e5" stroke="#1e293b" strokeWidth={3} />
        <rect x={16} y={18} width={120} height={14} rx={8} fill="#4338ca" opacity={0.85} />

        <polygon points="136,8 154,16 154,24 136,32" fill="#6366f1" stroke="#1e293b" strokeWidth={2.5} />
        <rect x={130} y={14} width={12} height={12} rx={4} fill="#e5e7eb" stroke="#0f172a" strokeWidth={1.5} />

        <rect x={24} y={10} width={24} height={20} rx={4} fill="#22c55e" stroke="#065f46" strokeWidth={1.5} />
        <rect x={52} y={10} width={24} height={20} rx={4} fill="#f97316" stroke="#9a3412" strokeWidth={1.5} />
        <rect x={80} y={10} width={24} height={20} rx={4} fill="#0ea5e9" stroke="#075985" strokeWidth={1.5} />
        <rect x={108} y={10} width={24} height={20} rx={4} fill="#a855f7" stroke="#6b21a8" strokeWidth={1.5} />

        <line x1={36} y1={10} x2={36} y2={30} stroke="#0f172a" strokeWidth={2} strokeLinecap="round" />
        <line x1={64} y1={10} x2={64} y2={30} stroke="#0f172a" strokeWidth={2} strokeLinecap="round" />
        <line x1={92} y1={10} x2={92} y2={30} stroke="#0f172a" strokeWidth={2} strokeLinecap="round" />
        <line x1={120} y1={10} x2={120} y2={30} stroke="#0f172a" strokeWidth={2} strokeLinecap="round" />

        <polygon points="16,8 6,14 4,20 6,26 16,32" fill="#1f2937" stroke="#020617" strokeWidth={2} />
        <circle cx={10} cy={16} r={4} fill="#f97316" stroke="#9a3412" strokeWidth={1.2} />
        <circle cx={10} cy={24} r={4} fill="#f97316" stroke="#9a3412" strokeWidth={1.2} />

        <polygon points="4,16 0,13 0,19" fill="#facc15" stroke="#92400e" strokeWidth={1.2} />
        <polygon points="4,24 0,21 0,27" fill="#fde68a" stroke="#92400e" strokeWidth={1.2} />

        <circle cx={44} cy={20} r={1.8} fill="#a5b4fc" />
        <circle cx={72} cy={20} r={1.8} fill="#a5b4fc" />
        <circle cx={100} cy={20} r={1.8} fill="#a5b4fc" />
        <circle cx={128} cy={20} r={1.8} fill="#a5b4fc" />
    </svg>
);
