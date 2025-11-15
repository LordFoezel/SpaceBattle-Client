import React from "react";

interface AlienCapitalImageProps extends React.SVGProps<SVGSVGElement> {
    flipped?: boolean;
}

export const AlienCapitalImage: React.FC<AlienCapitalImageProps> = ({ flipped = false, style, ...props }) => (
    <svg
        width={400}
        height={80}
        viewBox="0 0 200 40"
        xmlns="http://www.w3.org/2000/svg"
        style={{
            transform: flipped ? "rotate(180deg)" : undefined,
            transformOrigin: "center",
            ...style,
        }}
        {...props}
    >
        <path
            d="M18 20 C 30 8, 60 6, 96 8 C 132 10, 162 10, 184 14 C 190 16, 196 18, 198 20 C 196 22, 190 24, 184 26 C 162 30, 132 30, 96 32 C 60 34, 30 32, 18 20 Z"
            fill="#4c1d95"
            stroke="#020617"
            strokeWidth={2.4}
        />

        <path
            d="M40 10 C 64 8, 96 8, 128 10 C 148 11, 164 12, 178 14"
            fill="none"
            stroke="#6d28d9"
            strokeWidth={4}
            strokeLinecap="round"
        />

        <path d="M46 9 L40 3 L50 6 Z" fill="#22c55e" stroke="#064e3b" strokeWidth={1.5} />
        <path d="M64 8 L58 2 L68 5 Z" fill="#22c55e" stroke="#064e3b" strokeWidth={1.5} />
        <path d="M82 8 L76 2 L86 5 Z" fill="#22c55e" stroke="#064e3b" strokeWidth={1.5} />
        <path d="M100 8 L94 2 L104 5 Z" fill="#22c55e" stroke="#064e3b" strokeWidth={1.5} />
        <path d="M118 9 L112 3 L122 6 Z" fill="#22c55e" stroke="#064e3b" strokeWidth={1.5} />

        <ellipse cx={104} cy={18} rx={18} ry={10} fill="#a855f7" stroke="#1e1b4b" strokeWidth={2} />
        <ellipse cx={104} cy={18} rx={10} ry={6} fill="#f9a8d4" stroke="#4c1d95" strokeWidth={1.6} />
        <circle cx={108} cy={16} r={2} fill="#f9fafb" />

        <circle cx={70} cy={22} r={2} fill="#22c55e" />
        <circle cx={78} cy={22} r={2} fill="#22c55e" />
        <circle cx={86} cy={22} r={2} fill="#22c55e" />
        <circle cx={94} cy={22} r={2} fill="#22c55e" />
        <circle cx={112} cy={22} r={2} fill="#22c55e" />
        <circle cx={120} cy={22} r={2} fill="#22c55e" />

        <path
            d="M60 24 C 52 30, 44 32, 36 33"
            fill="none"
            stroke="#22c55e"
            strokeWidth={2.2}
            strokeLinecap="round"
        />
        <path
            d="M132 24 C 140 30, 148 32, 156 33"
            fill="none"
            stroke="#22c55e"
            strokeWidth={2.2}
            strokeLinecap="round"
        />

        <path
            d="M176 16 C 184 16, 192 18, 196 20 C 192 22, 184 24, 176 24"
            fill="none"
            stroke="#facc15"
            strokeWidth={2}
            strokeLinecap="round"
        />

        <ellipse cx={24} cy={16} rx={6} ry={5} fill="#f97316" stroke="#9a3412" strokeWidth={1.4} />
        <ellipse cx={24} cy={24} rx={6} ry={5} fill="#f97316" stroke="#9a3412" strokeWidth={1.4} />
        <polygon points="16,16 8,13 8,19" fill="#facc15" stroke="#92400e" strokeWidth={1.2} />
        <polygon points="16,24 8,21 8,27" fill="#fde68a" stroke="#92400e" strokeWidth={1.2} />
    </svg>
);

