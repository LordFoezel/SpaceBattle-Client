import React from "react";

export const Destroyer: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width={120} height={40} viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x={20} y={14} width={68} height={12} rx={6} fill="#1e293b" stroke="#0f172a" strokeWidth={1.5} />
        <polygon points="88,14 108,20 88,26" fill="#334155" stroke="#0f172a" strokeWidth={1.5} />
        <polygon points="20,14 10,10 16,20 10,28 20,26" fill="#475569" stroke="#0f172a" strokeWidth={1.5} />
        <rect x={38} y={10} width={34} height={20} rx={6} fill="#4f46e5" stroke="#1e293b" strokeWidth={2} />
        <rect x={50} y={6} width={12} height={10} rx={4} fill="#e2e8f0" stroke="#0f172a" strokeWidth={1.5} />
        <rect x={30} y={12} width={8} height={6} rx={2} fill="#1f2937" stroke="#0b1120" strokeWidth={1} />
        <rect x={30} y={22} width={8} height={6} rx={2} fill="#1f2937" stroke="#0b1120" strokeWidth={1} />
        <line x1={38} y1={15} x2={62} y2={14} stroke="#e5e7eb" strokeWidth={2} strokeLinecap="round" />
        <line x1={38} y1={25} x2={62} y2={26} stroke="#e5e7eb" strokeWidth={2} strokeLinecap="round" />
        <circle cx={24} cy={18} r={2.5} fill="#f97316" stroke="#9a3412" strokeWidth={1.2} />
        <circle cx={24} cy={22} r={2.5} fill="#f97316" stroke="#9a3412" strokeWidth={1.2} />
        <circle cx={44} cy={20} r={1.4} fill="#a5b4fc" />
        <circle cx={54} cy={20} r={1.4} fill="#a5b4fc" />
        <circle cx={64} cy={20} r={1.4} fill="#a5b4fc" />
    </svg>
);
