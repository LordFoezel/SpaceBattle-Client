import React from "react";

interface MineImageProps extends React.SVGProps<SVGSVGElement> {
    flipped?: boolean;
}

export const MineImage: React.FC<MineImageProps> = ({ flipped = false, style, ...props }) => (
    <svg
        width={80}
        height={80}
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        style={{
            transform: flipped ? "rotate(180deg)" : undefined,
            transformOrigin: "center",
            ...style,
        }}
        {...props}
    >
        {/* Outer glow */}
        <circle cx={20} cy={20} r={18} fill="rgba(15,23,42,0.85)" />

        {/* Body */}
        <circle cx={20} cy={20} r={9} fill="#1f2937" stroke="#e5e7eb" strokeWidth={2} />

        {/* Metallic rings */}
        <circle cx={20} cy={20} r={6} fill="#111827" stroke="#4b5563" strokeWidth={1.5} />

        {/* Core */}
        <circle cx={20} cy={20} r={3} fill="#f97316" stroke="#fed7aa" strokeWidth={1} />

        {/* Spikes */}
        <line x1={20} y1={4} x2={20} y2={11} stroke="#e5e7eb" strokeWidth={2} strokeLinecap="round" />
        <line x1={20} y1={29} x2={20} y2={36} stroke="#e5e7eb" strokeWidth={2} strokeLinecap="round" />
        <line x1={4} y1={20} x2={11} y2={20} stroke="#e5e7eb" strokeWidth={2} strokeLinecap="round" />
        <line x1={29} y1={20} x2={36} y2={20} stroke="#e5e7eb" strokeWidth={2} strokeLinecap="round" />
        <line x1={8} y1={8} x2={13} y2={13} stroke="#e5e7eb" strokeWidth={2} strokeLinecap="round" />
        <line x1={27} y1={27} x2={32} y2={32} stroke="#e5e7eb" strokeWidth={2} strokeLinecap="round" />
        <line x1={32} y1={8} x2={27} y2={13} stroke="#e5e7eb" strokeWidth={2} strokeLinecap="round" />
        <line x1={8} y1={32} x2={13} y2={27} stroke="#e5e7eb" strokeWidth={2} strokeLinecap="round" />

        {/* Warning lights */}
        <circle cx={15} cy={16} r={1.2} fill="#fbbf24" />
        <circle cx={25} cy={24} r={1.2} fill="#fbbf24" />
    </svg>
);

