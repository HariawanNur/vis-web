import type { ThemeConfig } from 'antd';

import { colors } from './primitives/colors';
import { typography } from './primitives/typography';
import { radius } from './primitives/radius';
import { shadows } from './primitives/shadows';
import { breakpoints } from './primitives/breakpoints';
import { motion } from './primitives/motion';
import { buttonTokens } from './components/button';
import { inputTokens } from './components/input';
import { selectTokens } from './components/select';
import { cardTokens } from './components/card';
import { tableTokens } from './components/table';
import { menuTokens } from './components/menu';
import { modalTokens } from './components/modal';
import { drawerTokens } from './components/drawer';
import { tabsTokens } from './components/tabs';
import { tagTokens } from './components/tag';

export const vistaraTheme: ThemeConfig = {
  token: {
    colorPrimary: colors.brand[500],
    colorPrimaryHover: colors.brand[400],
    colorPrimaryActive: colors.brand[600],

    colorSuccess: colors.success[500],
    colorWarning: colors.warning[500],
    colorError: colors.error[500],
    colorInfo: colors.info[500],

    colorText: colors.neutral[900],
    colorTextSecondary: colors.neutral[600],
    colorTextTertiary: colors.neutral[500],
    colorTextDisabled: colors.neutral[400],

    colorBgBase: colors.neutral[0],
    colorBgLayout: colors.neutral[100],
    colorBgContainer: colors.neutral[0],
    colorBgElevated: colors.neutral[0],

    colorFill: 'rgba(17, 24, 39, 0.08)',
    colorFillSecondary: 'rgba(17, 24, 39, 0.06)',
    colorFillTertiary: 'rgba(17, 24, 39, 0.04)',
    colorFillQuaternary: 'rgba(17, 24, 39, 0.02)',

    colorBorder: colors.neutral[300],
    colorBorderSecondary: colors.neutral[200],

    colorLink: colors.brand[500],
    colorLinkHover: colors.brand[600],
    colorLinkActive: colors.brand[700],

    fontFamily: typography.fontFamily,
    fontSize: typography.size.sm,
    fontSizeSM: typography.size.xs,
    fontSizeLG: typography.size.md,
    fontSizeXL: typography.size.xl,
    fontWeightStrong: typography.weight.semibold,

    borderRadius: radius.md,
    borderRadiusSM: radius.sm,
    borderRadiusLG: radius.lg,
    borderRadiusXS: radius.xs,

    controlHeight: 40,
    controlHeightSM: 32,
    controlHeightLG: 48,

    padding: 16,
    paddingSM: 12,
    paddingXS: 8,
    paddingXXS: 4,

    margin: 16,
    marginSM: 12,
    marginXS: 8,
    marginXXS: 4,

    boxShadow: shadows.md,
    boxShadowSecondary: shadows.lg,

    screenXS: breakpoints.xs,
    screenSM: breakpoints.sm,
    screenMD: breakpoints.md,
    screenLG: breakpoints.lg,
    screenXL: breakpoints.xl,
    screenXXL: breakpoints.xxl,

    motion: true,
    motionDurationFast: motion.duration.fast,
    motionDurationMid: motion.duration.normal,
    motionDurationSlow: motion.duration.slow,
  },
  components: {
    Button: buttonTokens,
    Input: inputTokens,
    Select: selectTokens,
    Card: cardTokens,
    Table: tableTokens,
    Menu: menuTokens,
    Modal: modalTokens,
    Drawer: drawerTokens,
    Tabs: tabsTokens,
    Tag: tagTokens,
    Dropdown: {
      borderRadiusLG: 8,
      paddingBlock: 6,
      controlItemBgHover: colors.neutral[100],
    },
    Tooltip: {
      borderRadius: 6,
      colorBgSpotlight: colors.neutral[900],
    },
    Breadcrumb: {
      itemColor: colors.neutral[500],
      lastItemColor: colors.neutral[700],
      linkColor: colors.neutral[600],
      linkHoverColor: colors.brand[500],
    },
    Pagination: {
      itemActiveBg: colors.brand[500],
      itemBg: colors.neutral[0],
      borderRadius: 6,
    },
    Alert: {
      borderRadiusLG: 8,
      withDescriptionPadding: '16px 20px',
    },
    Form: {
      labelColor: colors.neutral[700],
      labelFontSize: 14,
      verticalLabelPadding: '0 0 6px',
    },
    Divider: {
      colorSplit: colors.neutral[200],
    },
    Skeleton: {
      gradientFromColor: colors.neutral[100],
      gradientToColor: colors.neutral[200],
    },
  } as ThemeConfig['components'],
};
