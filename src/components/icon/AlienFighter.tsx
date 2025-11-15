import React from "react";

interface AlienFighterProps extends React.SVGProps<SVGSVGElement> {
    flipped?: boolean;
}

export const AlienFighter: React.FC<AlienFighterProps> = ({ flipped = false, style, ...props }) => (
    <svg
        width={80}
        height={40}
        viewBox="0 0 80 40"
        xmlns="http://www.w3.org/2000/svg"
        style={{
            transform: flipped ? "rotate(180deg)" : undefined,
            transformOrigin: "center",
            ...style,
        }}
        {...props}
    >
        <path
            d="M10 20 C 16 10, 32 6, 48 8 C 60 10, 70 14, 74 20 C 70 26, 60 30, 48 32 C 32 34, 16 30, 10 20 Z"
            fill="#4c1d95"
            stroke="#111827"
            strokeWidth={2}
        />

        <path
            d="M48 10 C 58 12, 68 18, 72 20 C 68 22, 58 28, 48 30 Z"
            fill="#6d28d9"
            stroke="#111827"
            strokeWidth={2}
        />

        <ellipse cx={40} cy={18} rx={6} ry={4} fill="#a855f7" stroke="#1e1b4b" strokeWidth={1.5} />
        <circle cx={42} cy={17} r={2} fill="#f9fafb" />

        <path
            d="M26 16 C 18 8, 10 6, 6 8 C 8 12, 12 18, 18 22"
            fill="#22c55e"
            fillOpacity={0.7}
            stroke="#065f46"
            strokeWidth={1.5}
        />
        <path
            d="M26 24 C 18 32, 10 34, 6 32 C 8 28, 12 22, 18 18"
            fill="#22c55e"
            fillOpacity={0.7}
            stroke="#065f46"
            strokeWidth={1.5}
        />

        <path
            d="M52 16 C 60 15, 64 14, 70 13"
            fill="none"
            stroke="#facc15"
            strokeWidth={2}
            strokeLinecap="round"
        />
        <path
            d="M52 24 C 60 25, 64 26, 70 27"
            fill="none"
            stroke="#facc15"
            strokeWidth={2}
            strokeLinecap="round"
        />

        <path
            d="M22 18 C 28 20, 32 22, 38 24"
            fill="none"
            stroke="#22c55e"
            strokeWidth={1.4}
            strokeLinecap="round"
        />
        <path
            d="M22 22 C 28 22, 34 23, 40 26"
            fill="none"
            stroke="#22c55e"
            strokeWidth={1.4}
            strokeLinecap="round"
        />
    </svg>
);

