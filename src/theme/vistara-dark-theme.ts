import { theme, type ThemeConfig } from 'antd';

import { colors } from './primitives/colors';
import { radius } from './primitives/radius';

export const vistaraDarkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: colors.brand[400],
    colorInfo: colors.brand[400],
    colorSuccess: '#73D13D',
    colorWarning: '#FFC53D',
    colorError: '#FF7875',
    colorBgBase: colors.neutral[950],
    colorBgLayout: colors.neutral[950],
    colorBgContainer: colors.neutral[900],
    colorBgElevated: colors.neutral[800],
    colorText: colors.neutral[50],
    colorTextSecondary: '#CBD5E1',
    colorTextTertiary: '#94A3B8',
    colorBorder: colors.neutral[700],
    colorBorderSecondary: colors.neutral[800],
    borderRadius: radius.md,
    controlHeight: 40,
  },
};
