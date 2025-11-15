import React from "react";

interface AlienSatelitImageProps extends React.SVGProps<SVGSVGElement> {
    flipped?: boolean;
}

export const AlienSatelitImage: React.FC<AlienSatelitImageProps> = ({ flipped = false, style, ...props }) => (
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
        <circle cx={20} cy={20} r={9} fill="#4c1d95" stroke="#0b1020" strokeWidth={2} />
        <circle cx={20} cy={20} r={5} fill="#a855f7" stroke="#1e1b4b" strokeWidth={1.5} />
        <circle cx={22} cy={18} r={2} fill="#f9fafb" />

        <ellipse cx={20} cy={20} rx={14} ry={10} fill="none" stroke="#5b21b6" strokeWidth={2} strokeDasharray="3 4" />

        <path
            d="M20 29 C 20 33, 16 36, 13 38"
            fill="none"
            stroke="#22c55e"
            strokeWidth={2}
            strokeLinecap="round"
        />
        <path
            d="M20 29 C 20 33, 24 36, 27 38"
            fill="none"
            stroke="#22c55e"
            strokeWidth={2}
            strokeLinecap="round"
        />
        <path
            d="M11 20 C 6 20, 4 18, 3 14"
            fill="none"
            stroke="#22c55e"
            strokeWidth={2}
            strokeLinecap="round"
        />
        <path
            d="M29 20 C 34 20, 36 18, 37 14"
            fill="none"
            stroke="#22c55e"
            strokeWidth={2}
            strokeLinecap="round"
        />

        <circle cx={12} cy={14} r={1.4} fill="#22c55e" />
        <circle cx={28} cy={14} r={1.4} fill="#22c55e" />
        <circle cx={14} cy={26} r={1.4} fill="#22c55e" />
        <circle cx={26} cy={26} r={1.4} fill="#22c55e" />
    </svg>
);

