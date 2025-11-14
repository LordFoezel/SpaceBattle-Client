import React from "react";

interface CapitalProps extends React.SVGProps<SVGSVGElement> {
    flipped?: boolean;
}

export const Capital: React.FC<CapitalProps> = ({ flipped = false, style, ...props }) => (
    <svg
        width={150}
        height={36}
        viewBox="0 0 150 36"
        xmlns="http://www.w3.org/2000/svg"
        style={{
            transform: flipped ? "rotate(180deg)" : undefined,
            transformOrigin: "center",
            ...style,
        }}
        {...props}
    >
        <rect x={22} y={8} width={108} height={22} rx={9} fill="#4f46e5" stroke="#1e293b" strokeWidth={2} />
        <rect x={22} y={16} width={108} height={12} rx={7} fill="#4338ca" opacity={0.9} />

        <polygon points="128,8 140,12 148,16 148,20 140,24 128,28" fill="#6366f1" stroke="#1e293b" strokeWidth={2} />
        <rect x={88} y={4} width={24} height={10} rx={4} fill="#e5e7eb" stroke="#0f172a" strokeWidth={1.4} />
        <rect x={60} y={6} width={54} height={3} rx={2} fill="#312e81" opacity={0.9} />

        <polygon points="34,10 26,6 38,8" fill="#22c55e" stroke="#065f46" strokeWidth={1.2} />
        <polygon points="118,10 130,6 120,8" fill="#22c55e" stroke="#065f46" strokeWidth={1.2} />
        <polygon points="34,28 26,32 38,30" fill="#22c55e" stroke="#065f46" strokeWidth={1.2} />
        <polygon points="118,28 130,32 120,30" fill="#22c55e" stroke="#065f46" strokeWidth={1.2} />

        <rect x={46} y={12} width={9} height={5} rx={2} fill="#1f2937" stroke="#020617" strokeWidth={0.9} />
        <rect x={66} y={12} width={9} height={5} rx={2} fill="#1f2937" stroke="#020617" strokeWidth={0.9} />
        <rect x={86} y={12} width={9} height={5} rx={2} fill="#1f2937" stroke="#020617" strokeWidth={0.9} />
        <rect x={46} y={23} width={9} height={5} rx={2} fill="#1f2937" stroke="#020617" strokeWidth={0.9} />
        <rect x={66} y={23} width={9} height={5} rx={2} fill="#1f2937" stroke="#020617" strokeWidth={0.9} />
        <rect x={86} y={23} width={9} height={5} rx={2} fill="#1f2937" stroke="#020617" strokeWidth={0.9} />

        <line x1={55} y1={14} x2={74} y2={13} stroke="#e5e7eb" strokeWidth={1.6} strokeLinecap="round" />
        <line x1={75} y1={14} x2={94} y2={13} stroke="#e5e7eb" strokeWidth={1.6} strokeLinecap="round" />
        <line x1={95} y1={14} x2={114} y2={13} stroke="#e5e7eb" strokeWidth={1.6} strokeLinecap="round" />
        <line x1={55} y1={25} x2={74} y2={26} stroke="#e5e7eb" strokeWidth={1.6} strokeLinecap="round" />
        <line x1={75} y1={25} x2={94} y2={26} stroke="#e5e7eb" strokeWidth={1.6} strokeLinecap="round" />
        <line x1={95} y1={25} x2={114} y2={26} stroke="#e5e7eb" strokeWidth={1.6} strokeLinecap="round" />

        <polygon points="22,8 12,10 6,14 3,18 6,22 12,26 22,28" fill="#1f2937" stroke="#020617" strokeWidth={1.6} />
        <circle cx={12} cy={14} r={3.2} fill="#f97316" stroke="#9a3412" strokeWidth={1} />
        <circle cx={12} cy={20} r={3.2} fill="#f97316" stroke="#9a3412" strokeWidth={1} />
        <circle cx={12} cy={26} r={3.2} fill="#f97316" stroke="#9a3412" strokeWidth={1} />

        <polygon points="6,14 0,11 0,17" fill="#facc15" stroke="#92400e" strokeWidth={1} />
        <polygon points="6,20 0,17 0,23" fill="#fde68a" stroke="#92400e" strokeWidth={1} />
        <polygon points="6,26 0,23 0,29" fill="#facc15" stroke="#92400e" strokeWidth={1} />

        <circle cx={70} cy={20} r={1.3} fill="#a5b4fc" />
        <circle cx={80} cy={20} r={1.3} fill="#a5b4fc" />
        <circle cx={90} cy={20} r={1.3} fill="#a5b4fc" />
        <circle cx={100} cy={20} r={1.3} fill="#a5b4fc" />
        <circle cx={110} cy={20} r={1.3} fill="#a5b4fc" />
    </svg>
);
