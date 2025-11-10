import { useId } from "react";

const IconUserGear = () => {
  const clipBaseId = useId();
  const clipLeftId = `${clipBaseId}-left`;
  const clipRightId = `${clipBaseId}-right`;
  const viewBoxWidth = 24;
  const gapPx = Math.min((2 / 50) * 96, viewBoxWidth); // 2mm gap assuming 96dpi
  const halfGap = gapPx / 2;
  const leftClipWidth = Math.max(viewBoxWidth / 2 - halfGap, 0);
  const rightClipX = Math.min(viewBoxWidth / 2 + halfGap, viewBoxWidth);
  const rightClipWidth = Math.max(viewBoxWidth - rightClipX, 0);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1.1em"
      height="1.1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      <defs>
        <clipPath id={clipLeftId}>
          <rect x="0" y="0" width={leftClipWidth} height="24" />
        </clipPath>
        <clipPath id={clipRightId}>
          <rect x={rightClipX} y="0" width={rightClipWidth} height="24" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipLeftId})`}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </g>
      <g clipPath={`url(#${clipRightId})`}>
        <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
      </g>
    </svg>
  );
};

export { IconUserGear };
