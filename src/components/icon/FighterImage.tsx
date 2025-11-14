import React from "react";

interface FighterImageProps extends React.SVGProps<SVGSVGElement> {
    flipped?: boolean;
}

export const FighterImage: React.FC<FighterImageProps> = ({ flipped = false, style, ...props }) => (
    <svg
        width={88}
        height={44}
        viewBox="0 0 88 44"
        xmlns="http://www.w3.org/2000/svg"
        style={{
            transform: flipped ? "rotate(180deg)" : undefined,
            transformOrigin: "center",
            ...style,
        }}
        {...props}
    >
        {/* Central fuselage */}
        <rect
            x={20}
            y={12}
            width={48}
            height={20}
            rx={10}
            fill="#0ea5e9"
            stroke="#082f49"
            strokeWidth={2}
        />

        {/* Cockpit bubble */}
        <path
            d="M38 10h12c3 0 6 2 6 5v6c0 3-3 5-6 5H38c-3 0-6-2-6-5v-6c0-3 3-5 6-5Z"
            fill="#fef3c7"
            stroke="#1f2937"
            strokeWidth={1.5}
        />

        {/* Nose cone */}
        <polygon points="68,12 84,22 68,32" fill="#22d3ee" stroke="#0369a1" strokeWidth={2} />

        {/* Tail fins */}
        <polygon points="20,12 14,4 20,16" fill="#1d4ed8" stroke="#0f172a" strokeWidth={1.5} />
        <polygon points="20,32 14,40 20,28" fill="#1d4ed8" stroke="#0f172a" strokeWidth={1.5} />

        {/* Primary wings */}
        <polygon points="34,12 18,2 30,20" fill="#f472b6" stroke="#9d174d" strokeWidth={1.5} />
        <polygon points="34,32 18,42 30,24" fill="#f472b6" stroke="#9d174d" strokeWidth={1.5} />

        {/* Secondary winglets */}
        <polygon points="48,14 40,6 46,18" fill="#fb7185" stroke="#991b1b" strokeWidth={1.5} />
        <polygon points="48,30 40,38 46,26" fill="#fb7185" stroke="#991b1b" strokeWidth={1.5} />

        {/* Engines */}
        <circle cx={22} cy={14} r={4} fill="#f97316" stroke="#9a3412" strokeWidth={1.5} />
        <circle cx={22} cy={30} r={4} fill="#f97316" stroke="#9a3412" strokeWidth={1.5} />
        <polygon points="12,14 6,10 6,18" fill="#fde047" stroke="#92400e" strokeWidth={1.5} />
        <polygon points="12,30 6,26 6,34" fill="#fde047" stroke="#92400e" strokeWidth={1.5} />

        {/* Cannons */}
        <line x1={56} y1={14} x2={78} y2={14} stroke="#0f172a" strokeWidth={2} strokeLinecap="round" />
        <line x1={56} y1={30} x2={78} y2={30} stroke="#0f172a" strokeWidth={2} strokeLinecap="round" />
    </svg>
);
