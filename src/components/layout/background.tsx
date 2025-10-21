import type { ReactNode } from "react";

interface BackgroundProps {
  children?: ReactNode;
  className?: string;
}

export default function Background({ children, className }: BackgroundProps) {
  return (
    <div className={`background bg-black h-screen${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  );
}

