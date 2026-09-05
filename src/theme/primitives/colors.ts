export const colors = {
  brand: {
    50: '#E6F4FF',
    100: '#BAE0FF',
    200: '#91CAFF',
    300: '#69B1FF',
    400: '#4096FF',
    500: '#1677FF',
    600: '#0958D9',
    700: '#003EB3',
    800: '#002C8C',
    900: '#001D66',
  },
  cyan: {
    500: '#13C2C2',
  },
  sky: {
    500: '#0EA5E9',
  },
  indigo: {
    500: '#6366F1',
  },
  neutral: {
    0: '#FFFFFF',
    50: '#FAFAFA',
    100: '#F5F7FA',
    200: '#E4E7EB',
    300: '#D0D7DE',
    400: '#AEB8C4',
    500: '#86909C',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#07111F',
  },
  success: {
    50: '#F6FFED',
    500: '#52C41A',
    700: '#237804',
  },
  warning: {
    50: '#FFFBE6',
    500: '#FAAD14',
    700: '#AD6800',
  },
  error: {
    50: '#FFF2F0',
    500: '#FF4D4F',
    700: '#A8071A',
  },
  info: {
    50: '#E6F4FF',
    500: '#1677FF',
    700: '#003EB3',
  },
} as const;

export const gradients = {
  primary: 'linear-gradient(135deg, #1677FF 0%, #0958D9 55%, #003EB3 100%)',
  hero: 'linear-gradient(135deg, #0EA5E9 0%, #1677FF 50%, #6366F1 100%)',
  corporate: 'linear-gradient(135deg, #001D66 0%, #003EB3 55%, #1677FF 100%)',
  darkHero: 'linear-gradient(135deg, #07111F 0%, #002C8C 100%)',
} as const;
