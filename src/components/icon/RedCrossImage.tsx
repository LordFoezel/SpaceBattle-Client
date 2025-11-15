import React from "react";

interface RedCrossImageProps extends React.SVGProps<SVGSVGElement> {
    flipped?: boolean;
}

export const RedCrossImage: React.FC<RedCrossImageProps> = ({ flipped = false, style, ...props }) => (
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
        <line x1={10} y1={10} x2={30} y2={30} stroke="#ef4444" strokeWidth={6} strokeLinecap="round" />
        <line x1={30} y1={10} x2={10} y2={30} stroke="#ef4444" strokeWidth={6} strokeLinecap="round" />
    </svg>
);

