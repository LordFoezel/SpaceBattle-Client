import React from "react";

interface AlienCargoProps extends React.SVGProps<SVGSVGElement> {
    flipped?: boolean;
}

export const AlienCargo: React.FC<AlienCargoProps> = ({ flipped = false, style, ...props }) => (
    <svg
        width={160}
        height={40}
        viewBox="0 0 160 40"
        xmlns="http://www.w3.org/2000/svg"
        style={{
            transform: flipped ? "rotate(180deg)" : undefined,
            transformOrigin: "center",
            ...style,
        }}
        {...props}
    >
        <path
            d="M14 20 C 26 8, 46 8, 66 10 C 86 12, 106 12, 130 14 C 138 16, 146 18, 150 20 C 146 24, 138 28, 130 30 C 106 32, 86 32, 66 30 C 46 28, 26 28, 14 20 Z"
            fill="#4c1d95"
            stroke="#020617"
            strokeWidth={2}
        />

        <ellipse cx={40} cy={20} rx={12} ry={10} fill="#22c55e" fillOpacity={0.8} stroke="#065f46" strokeWidth={1.8} />
        <ellipse cx={70} cy={20} rx={12} ry={10} fill="#f97316" fillOpacity={0.8} stroke="#9a3412" strokeWidth={1.8} />
        <ellipse cx={100} cy={20} rx={12} ry={10} fill="#0ea5e9" fillOpacity={0.8} stroke="#075985" strokeWidth={1.8} />
        <ellipse cx={130} cy={20} rx={10} ry={9} fill="#a855f7" fillOpacity={0.8} stroke="#6b21a8" strokeWidth={1.8} />

        <path
            d="M40 10 C 38 6, 32 4, 28 6"
            fill="none"
            stroke="#22c55e"
            strokeWidth={1.6}
            strokeLinecap="round"
        />
        <path
            d="M40 30 C 38 34, 32 36, 28 34"
            fill="none"
            stroke="#22c55e"
            strokeWidth={1.6}
            strokeLinecap="round"
        />

        <path
            d="M70 10 C 68 6, 62 4, 58 6"
            fill="none"
            stroke="#22c55e"
            strokeWidth={1.6}
            strokeLinecap="round"
        />
        <path
            d="M70 30 C 68 34, 62 36, 58 34"
            fill="none"
            stroke="#22c55e"
            strokeWidth={1.6}
            strokeLinecap="round"
        />

        <path
            d="M100 10 C 98 6, 92 4, 88 6"
            fill="none"
            stroke="#22c55e"
            strokeWidth={1.6}
            strokeLinecap="round"
        />
        <path
            d="M100 30 C 98 34, 92 36, 88 34"
            fill="none"
            stroke="#22c55e"
            strokeWidth={1.6}
            strokeLinecap="round"
        />

        <path
            d="M14 12 C 8 14, 4 18, 4 20 C 4 22, 8 26, 14 28 C 18 26, 20 24, 20 20 C 20 16, 18 14, 14 12 Z"
            fill="#6d28d9"
            stroke="#020617"
            strokeWidth={1.8}
        />
        <circle cx={12} cy={18} r={2.2} fill="#22c55e" />
        <circle cx={13.5} cy={17} r={1.2} fill="#f9fafb" />

        <circle cx={152} cy={16} r={3.5} fill="#f97316" stroke="#9a3412" strokeWidth={1.1} />
        <circle cx={152} cy={24} r={3.5} fill="#f97316" stroke="#9a3412" strokeWidth={1.1} />

        <polygon points="156,16 160,13 160,19" fill="#facc15" stroke="#92400e" strokeWidth={1.1} />
        <polygon points="156,24 160,21 160,27" fill="#fde68a" stroke="#92400e" strokeWidth={1.1} />
    </svg>
);

