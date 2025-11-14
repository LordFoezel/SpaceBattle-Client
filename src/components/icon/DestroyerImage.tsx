import React from "react";

interface DestroyerImageProps extends React.SVGProps<SVGSVGElement> {
    flipped?: boolean;
}

export const DestroyerImage: React.FC<DestroyerImageProps> = ({ flipped = false, style, ...props }) => (
    <svg
        width={150}
        height={48}
        viewBox="0 0 150 48"
        xmlns="http://www.w3.org/2000/svg"
        style={{
            transform: flipped ? "rotate(180deg)" : undefined,
            transformOrigin: "center",
            ...style,
        }}
        {...props}
    >
        {/* Main hull */}
        <rect x={28} y={14} width={84} height={20} rx={10} fill="#4338ca" stroke="#1e293b" strokeWidth={2} />
        <rect x={48} y={10} width={44} height={28} rx={8} fill="#4f46e5" stroke="#1e293b" strokeWidth={2} />

        {/* Bridge */}
        <rect x={62} y={6} width={18} height={12} rx={4} fill="#f8fafc" stroke="#0f172a" strokeWidth={1.5} />

        {/* Bow */}
        <polygon points="112,14 136,24 112,34" fill="#6366f1" stroke="#1e293b" strokeWidth={2} />
        <polygon points="112,28 136,24 112,32" fill="#312e81" opacity={0.8} />

        {/* Tail fins */}
        <polygon points="28,14 14,8 22,24 14,40 28,34" fill="#475569" stroke="#0f172a" strokeWidth={1.5} />
        <polygon points="28,24 8,24 18,18 18,30" fill="#334155" stroke="#0f172a" strokeWidth={1.5} />

        {/* Side armor plates */}
        <polygon points="40,14 30,10 44,12" fill="#22c55e" stroke="#065f46" strokeWidth={1.5} />
        <polygon points="40,34 30,38 44,36" fill="#22c55e" stroke="#065f46" strokeWidth={1.5} />

        {/* Turrets */}
        <rect x={52} y={16} width={12} height={7} rx={2} fill="#1f2937" stroke="#0b1120" strokeWidth={1} />
        <rect x={52} y={25} width={12} height={7} rx={2} fill="#1f2937" stroke="#0b1120" strokeWidth={1} />
        <rect x={76} y={16} width={12} height={7} rx={2} fill="#1f2937" stroke="#0b1120" strokeWidth={1} />
        <rect x={76} y={25} width={12} height={7} rx={2} fill="#1f2937" stroke="#0b1120" strokeWidth={1} />

        <line x1={64} y1={19} x2={92} y2={18} stroke="#e5e7eb" strokeWidth={2.4} strokeLinecap="round" />
        <line x1={64} y1={29} x2={92} y2={30} stroke="#e5e7eb" strokeWidth={2.4} strokeLinecap="round" />

        {/* Engines */}
        <circle cx={34} cy={20} r={3} fill="#f97316" stroke="#9a3412" strokeWidth={1.2} />
        <circle cx={34} cy={28} r={3} fill="#f97316" stroke="#9a3412" strokeWidth={1.2} />
        <polygon points="20,20 8,15 8,25" fill="#facc15" stroke="#92400e" strokeWidth={1.2} />
        <polygon points="20,28 8,23 8,33" fill="#facc15" stroke="#92400e" strokeWidth={1.2} />

        {/* Windows */}
        <circle cx={56} cy={24} r={1.4} fill="#a5b4fc" />
        <circle cx={66} cy={24} r={1.4} fill="#a5b4fc" />
        <circle cx={76} cy={24} r={1.4} fill="#a5b4fc" />
        <circle cx={86} cy={24} r={1.4} fill="#a5b4fc" />
    </svg>
);
