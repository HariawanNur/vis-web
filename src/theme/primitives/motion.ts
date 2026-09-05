export const motion = {
  duration: {
    fast: '120ms',
    normal: '200ms',
    slow: '300ms',
    entrance: '400ms',
  },
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    entrance: 'cubic-bezier(0, 0, 0, 1)',
    exit: 'cubic-bezier(0.3, 0, 1, 1)',
  },
} as const;
