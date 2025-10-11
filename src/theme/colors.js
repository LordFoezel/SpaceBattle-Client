// Centralized color tokens for UI consistency
export const colors = {
  // Surfaces and text
  background: "#030217", // blue-500
  surface: '#0f172a', // slate-900
  text: '#f1f5f9', // slate-100
  textMuted: '#64748b', // slate-500

  // Borders
  border: '#cbd5e1', // slate-300
  borderSubtle: '#1e293b', // slate-800

  // Focus
  focusBorder: '#38bdf8', // sky-400
  focusRing: 'rgba(56,189,248,0.4)',

  // Select / menu specifics
  optionHover: '#2563eb', // blue-600 (hover highlight)
  optionCheckedBg: '#075985', // sky-700 (selected bg)
  optionCheckedText: '#f8fafc', // slate-50
  groupTitle: '#cbd5e1', // slate-300
  iconMuted: '#94a3b8', // slate-400

  alert: {
    info: { bg: "#0f172a", text: "#e2e8f0", border: "#334155", icon: "#93c5fd" }, // slate/blue tint
    success: { bg: "#052e23", text: "#d1fae5", border: "#14532d", icon: "#34d399" }, // emerald tint
    warning: { bg: "#2a1f07", text: "#fde68a", border: "#a16207", icon: "#f59e0b" }, // amber tint
    error: { bg: "#2a0f12", text: "#fecdd3", border: "#7f1d1d", icon: "#fca5a5" }, // red/rose tint
  },
};

export default colors;

