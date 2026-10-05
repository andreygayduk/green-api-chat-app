export const theme = {
  colors: {
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    primarySoft: '#eff6ff',
    indigo: '#6366f1',
    indigoLight: '#818cf8',
    blueLight: '#60a5fa',
    text: '#0f172a',
    textSecondary: '#334155',
    textMuted: '#64748b',
    textFaint: '#94a3b8',
    white: '#fff',
    surface: '#f8fafc',
    surfaceAlt: '#f4f6f9',
    surfaceMuted: '#f1f5f9',
    surfaceChat: '#f0f3f7',
    surfaceApp: '#e8edf3',
    border: '#e2e8f0',
    borderAlt: '#e8ecf1',
    danger: '#dc2626',
    dangerBg: '#fef2f2',
    dangerBorder: '#fecaca',
    overlay: 'rgba(15, 23, 42, 0.4)',
  },
  radii: {
    sm: '6px',
    md: '8px',
    lg: '10px',
    xl: '12px',
    '2xl': '14px',
    '3xl': '16px',
    pill: '20px',
    full: '50%',
  },
  shadows: {
    card: '0 8px 32px rgba(15, 23, 42, 0.08)',
    modal: '0 16px 48px rgba(15, 23, 42, 0.18)',
    bubble: '0 1px 2px rgba(15, 23, 42, 0.06)',
    focus: '0 0 0 3px rgba(59, 130, 246, 0.15)',
  },
  fonts: {
    body: "var(--font-manrope), system-ui, -apple-system, sans-serif",
  },
  gradients: {
    brand: 'linear-gradient(135deg, #3b82f6, #6366f1)',
    avatar: 'linear-gradient(135deg, #60a5fa, #818cf8)',
  },
  breakpoints: {
    mobile: '720px',
  },
} as const

export type AppTheme = typeof theme
