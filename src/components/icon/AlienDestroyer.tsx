import React from "react";

interface AlienDestroyerProps extends React.SVGProps<SVGSVGElement> {
    flipped?: boolean;
}

export const AlienDestroyer: React.FC<AlienDestroyerProps> = ({ flipped = false, style, ...props }) => (
    <svg
        width={120}
        height={40}
        viewBox="0 0 120 40"
        xmlns="http://www.w3.org/2000/svg"
        style={{
            transform: flipped ? "rotate(180deg)" : undefined,
            transformOrigin: "center",
            ...style,
        }}
        {...props}
    >
        <path
            d="M10 20 C 18 8, 38 6, 60 8 C 82 10, 102 10, 112 14 C 108 22, 102 30, 60 32 C 34 34, 18 32, 10 20 Z"
            fill="#4c1d95"
            stroke="#020617"
            strokeWidth={2}
        />

        <path
            d="M22 12 C 34 10, 46 10, 58 11 C 70 12, 82 12, 94 14"
            fill="none"
            stroke="#6d28d9"
            strokeWidth={4}
            strokeLinecap="round"
        />

        <path d="M30 11 L24 5 L32 8 Z" fill="#22c55e" stroke="#064e3b" strokeWidth={1.5} />
        <path d="M44 10 L38 4 L46 7 Z" fill="#22c55e" stroke="#064e3b" strokeWidth={1.5} />
        <path d="M58 10 L52 4 L60 7 Z" fill="#22c55e" stroke="#064e3b" strokeWidth={1.5} />
        <path d="M72 12 L66 6 L74 8 Z" fill="#22c55e" stroke="#064e3b" strokeWidth={1.5} />
        <path d="M86 14 L80 8 L88 10 Z" fill="#22c55e" stroke="#064e3b" strokeWidth={1.5} />

        <path
            d="M100 12 C 108 10, 116 14, 118 20 C 116 26, 108 30, 100 28 Z"
            fill="#6d28d9"
            stroke="#020617"
            strokeWidth={2}
        />
        <path
            d="M104 18 C 108 18, 112 19, 114 20 C 112 21, 108 22, 104 22"
            fill="none"
            stroke="#facc15"
            strokeWidth={1.5}
            strokeLinecap="round"
        />

        <circle cx={38} cy={20} r={2} fill="#22c55e" />
        <circle cx={46} cy={20} r={2} fill="#22c55e" />
        <circle cx={54} cy={20} r={2} fill="#22c55e" />
        <circle cx={62} cy={20} r={2} fill="#22c55e" />

        <path
            d="M30 24 C 26 28, 22 30, 18 31"
            fill="none"
            stroke="#22c55e"
            strokeWidth={2}
            strokeLinecap="round"
        />
        <path
            d="M46 26 C 40 30, 36 32, 30 33"
            fill="none"
            stroke="#22c55e"
            strokeWidth={2}
            strokeLinecap="round"
        />
    </svg>
);

