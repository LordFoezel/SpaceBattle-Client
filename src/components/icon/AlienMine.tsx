import React from "react";

interface AlienMineProps extends React.SVGProps<SVGSVGElement> {
    flipped?: boolean;
}

export const AlienMine: React.FC<AlienMineProps> = ({ flipped = false, style, ...props }) => (
    <svg
        width={40}
        height={40}
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        style={{
            transform: flipped ? "rotate(180deg)" : undefined,
            transformOrigin: "center",
            ...style,
        }}
        {...props}
    >
        <circle cx={20} cy={20} r={18} fill="#020617" />

        <circle cx={20} cy={20} r={10} fill="#4c1d95" stroke="#0b1020" strokeWidth={2} />

        <circle cx={20} cy={20} r={6} fill="#a855f7" stroke="#1e1b4b" strokeWidth={1.5} />
        <circle cx={22} cy={18} r={2} fill="#f9fafb" />

        <ellipse cx={20} cy={20} rx={13} ry={9} fill="none" stroke="#22c55e" strokeWidth={2} strokeDasharray="3 3" />

        <path d="M20 6 C 20 4, 18 3, 17 2" fill="none" stroke="#22c55e" strokeWidth={2} strokeLinecap="round" />
        <path d="M20 34 C 20 36, 18 37, 17 38" fill="none" stroke="#22c55e" strokeWidth={2} strokeLinecap="round" />

        <path d="M6 20 C 4 20, 3 18, 2 17" fill="none" stroke="#22c55e" strokeWidth={2} strokeLinecap="round" />
        <path d="M34 20 C 36 20, 37 18, 38 17" fill="none" stroke="#22c55e" strokeWidth={2} strokeLinecap="round" />

        <path d="M9 9 C 7 7, 6 6, 5 5" fill="none" stroke="#22c55e" strokeWidth={2} strokeLinecap="round" />
        <path d="M31 31 C 33 33, 34 34, 35 35" fill="none" stroke="#22c55e" strokeWidth={2} strokeLinecap="round" />

        <path d="M31 9 C 33 7, 34 6, 35 5" fill="none" stroke="#22c55e" strokeWidth={2} strokeLinecap="round" />
        <path d="M9 31 C 7 33, 6 34, 5 35" fill="none" stroke="#22c55e" strokeWidth={2} strokeLinecap="round" />

        <circle cx={14} cy={16} r={1.3} fill="#22c55e" />
        <circle cx={26} cy={15} r={1.3} fill="#22c55e" />
        <circle cx={15} cy={25} r={1.3} fill="#22c55e" />
        <circle cx={25} cy={26} r={1.3} fill="#22c55e" />
    </svg>
);

