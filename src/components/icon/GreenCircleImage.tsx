import React from "react";

interface GreenCircleImageProps extends React.SVGProps<SVGSVGElement> {
    flipped?: boolean;
}

export const GreenCircleImage: React.FC<GreenCircleImageProps> = ({ flipped = false, style, ...props }) => (
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
        <circle cx={20} cy={20} r={14} fill="#22c55e" stroke="#166534" strokeWidth={4} />
    </svg>
);

