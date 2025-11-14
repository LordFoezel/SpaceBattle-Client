import React from "react";

interface CapitalImageProps extends React.SVGProps<SVGSVGElement> {
    flipped?: boolean;
}

export const CapitalImage: React.FC<CapitalImageProps> = ({ flipped = false, style, ...props }) => (
    <svg
        width={200}
        height={40}
        viewBox="0 0 200 40"
        xmlns="http://www.w3.org/2000/svg"
        style={{
            transform: flipped ? "rotate(180deg)" : undefined,
            transformOrigin: "center",
            ...style,
        }}
        {...props}
    >
        <rect x={26} y={8} width={148} height={24} rx={10} fill="#4f46e5" stroke="#1e293b" strokeWidth={3} />
        <rect x={26} y={18} width={148} height={14} rx={8} fill="#4338ca" opacity={0.9} />

        <polygon points="174,8 190,12 198,16 198,24 190,28 174,32" fill="#6366f1" stroke="#1e293b" strokeWidth={2.5} />

        <rect x={92} y={2} width={28} height={12} rx={4} fill="#e5e7eb" stroke="#0f172a" strokeWidth={1.6} />
        <rect x={98} y={0} width={16} height={6} rx={3} fill="#cbd5f5" stroke="#0f172a" strokeWidth={1.2} />
        <rect x={52} y={6} width={72} height={4} rx={2} fill="#312e81" opacity={0.9} />

        <polygon points="40,10 30,6 44,8" fill="#22c55e" stroke="#065f46" strokeWidth={1.5} />
        <polygon points="140,10 156,6 144,8" fill="#22c55e" stroke="#065f46" strokeWidth={1.5} />
        <polygon points="40,30 30,34 44,32" fill="#22c55e" stroke="#065f46" strokeWidth={1.5} />
        <polygon points="140,30 156,34 144,32" fill="#22c55e" stroke="#065f46" strokeWidth={1.5} />

        <rect x={60} y={10} width={10} height={6} rx={2} fill="#1f2937" stroke="#020617" strokeWidth={1} />
        <line x1={70} y1={13} x2={82} y2={12} stroke="#e5e7eb" strokeWidth={2} strokeLinecap="round" />
        <rect x={86} y={10} width={10} height={6} rx={2} fill="#1f2937" stroke="#020617" strokeWidth={1} />
        <line x1={96} y1={13} x2={108} y2={12} stroke="#e5e7eb" strokeWidth={2} strokeLinecap="round" />
        <rect x={112} y={10} width={10} height={6} rx={2} fill="#1f2937" stroke="#020617" strokeWidth={1} />
        <line x1={122} y1={13} x2={134} y2={12} stroke="#e5e7eb" strokeWidth={2} strokeLinecap="round" />

        <rect x={60} y={24} width={10} height={6} rx={2} fill="#1f2937" stroke="#020617" strokeWidth={1} />
        <line x1={70} y1={27} x2={82} y2={28} stroke="#e5e7eb" strokeWidth={2} strokeLinecap="round" />
        <rect x={86} y={24} width={10} height={6} rx={2} fill="#1f2937" stroke="#020617" strokeWidth={1} />
        <line x1={96} y1={27} x2={108} y2={28} stroke="#e5e7eb" strokeWidth={2} strokeLinecap="round" />
        <rect x={112} y={24} width={10} height={6} rx={2} fill="#1f2937" stroke="#020617" strokeWidth={1} />
        <line x1={122} y1={27} x2={134} y2={28} stroke="#e5e7eb" strokeWidth={2} strokeLinecap="round" />

        <rect x={44} y={14} width={24} height={12} rx={3} fill="#111827" opacity={0.9} />
        <rect x={46} y={16} width={8} height={8} rx={1.5} fill="#0f172a" />
        <rect x={58} y={16} width={8} height={8} rx={1.5} fill="#0f172a" />
        <circle cx={50} cy={20} r={1.2} fill="#22c55e" />
        <circle cx={62} cy={20} r={1.2} fill="#22c55e" />

        <polygon points="26,8 14,10 8,14 4,20 8,26 14,30 26,32" fill="#1f2937" stroke="#020617" strokeWidth={2} />

        <circle cx={12} cy={14} r={4} fill="#f97316" stroke="#9a3412" strokeWidth={1.2} />
        <circle cx={12} cy={20} r={4} fill="#f97316" stroke="#9a3412" strokeWidth={1.2} />
        <circle cx={12} cy={26} r={4} fill="#f97316" stroke="#9a3412" strokeWidth={1.2} />

        <polygon points="6,14 0,11 0,17" fill="#facc15" stroke="#92400e" strokeWidth={1.2} />
        <polygon points="6,20 0,17 0,23" fill="#fde68a" stroke="#92400e" strokeWidth={1.2} />
        <polygon points="6,26 0,23 0,29" fill="#facc15" stroke="#92400e" strokeWidth={1.2} />

        <circle cx={72} cy={20} r={1.4} fill="#a5b4fc" />
        <circle cx={84} cy={20} r={1.4} fill="#a5b4fc" />
        <circle cx={96} cy={20} r={1.4} fill="#a5b4fc" />
        <circle cx={108} cy={20} r={1.4} fill="#a5b4fc" />
        <circle cx={120} cy={20} r={1.4} fill="#a5b4fc" />
        <circle cx={132} cy={20} r={1.4} fill="#a5b4fc" />
    </svg>
);
