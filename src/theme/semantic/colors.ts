import { colors } from '../primitives/colors';

export const semanticColors = {
  brand: {
    primary: colors.brand[500],
    primaryHover: colors.brand[600],
    primaryActive: colors.brand[700],
    primarySubtle: colors.brand[50],
  },
  text: {
    primary: colors.neutral[900],
    secondary: colors.neutral[600],
    tertiary: colors.neutral[500],
    disabled: colors.neutral[400],
    inverse: colors.neutral[0],
    link: colors.brand[500],
    linkHover: colors.brand[600],
  },
  background: {
    page: '#FFFFFF',
    layout: '#F5F7FA',
    container: '#FFFFFF',
    elevated: '#FFFFFF',
    subtle: '#FAFAFA',
    selected: '#E6F4FF',
    mask: 'rgba(7, 17, 31, 0.45)',
  },
  border: {
    default: '#D0D7DE',
    subtle: '#E4E7EB',
    strong: '#AEB8C4',
    focus: '#1677FF',
  },
  status: {
    success: '#52C41A',
    warning: '#FAAD14',
    error: '#FF4D4F',
    info: '#1677FF',
  },
} as const;
