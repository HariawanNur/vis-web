import { createStyles } from 'antd-style';

export { colors, gradients } from './primitives/colors';
export { typography } from './primitives/typography';
export { spacing } from './primitives/spacing';
export { radius } from './primitives/radius';
export { shadows } from './primitives/shadows';
export { breakpoints } from './primitives/breakpoints';
export { motion } from './primitives/motion';

export { semanticColors } from './semantic/colors';
export { surfaces } from './semantic/surfaces';
export { layout } from './semantic/layout';

export { vistaraTheme } from './vistara-theme';
export { vistaraDarkTheme } from './vistara-dark-theme';

export { buttonTokens } from './components/button';
export { inputTokens } from './components/input';
export { selectTokens } from './components/select';
export { cardTokens } from './components/card';
export { tableTokens } from './components/table';
export { menuTokens } from './components/menu';
export { modalTokens } from './components/modal';
export { drawerTokens } from './components/drawer';
export { tabsTokens } from './components/tabs';
export { tagTokens } from './components/tag';

export const businessStatus = {
  draft: {
    color: '#4B5563',
    background: '#F5F7FA',
    border: '#D0D7DE',
  },
  pending: {
    color: '#AD6800',
    background: '#FFFBE6',
    border: '#FFE58F',
  },
  processing: {
    color: '#0958D9',
    background: '#E6F4FF',
    border: '#91CAFF',
  },
  success: {
    color: '#237804',
    background: '#F6FFED',
    border: '#B7EB8F',
  },
  rejected: {
    color: '#A8071A',
    background: '#FFF2F0',
    border: '#FFA39E',
  },
  inactive: {
    color: '#86909C',
    background: '#F5F7FA',
    border: '#D0D7DE',
  },
} as const;

export const marketingTokens = {
  hero: {
    minHeight: 680,
    titleMaxWidth: 720,
    titleSize: {
      desktop: 60,
      tablet: 48,
      mobile: 38,
    },
    titleLineHeight: {
      desktop: 68,
      tablet: 56,
      mobile: 46,
    },
    overlay:
      'linear-gradient(90deg, rgba(7,17,31,.96) 0%, rgba(7,17,31,.78) 45%, rgba(7,17,31,.18) 100%)',
  },
  section: {
    maxWidth: 1440,
    desktopPadding: 33,
    tabletPadding: 21,
    mobilePadding: 9,
  },
  header: {
    desktopHeight: 72,
    mobileHeight: 64,
  },
} as const;

export const useVistaraStyles = createStyles(({ css, token }) => ({
  page: css`
    min-height: 100vh;
    background: ${token.colorBgLayout};
    color: ${token.colorText};
  `,
  container: css`
    width: 100%;
    max-width: 1440px;
    margin-inline: auto;
    padding-inline: 32px;

    @media (max-width: ${token.screenMD}px) {
      padding-inline: 20px;
    }

    @media (max-width: ${token.screenSM}px) {
      padding-inline: 16px;
    }
  `,
  section: css`
    padding-block: 96px;

    @media (max-width: ${token.screenLG}px) {
      padding-block: 72px;
    }

    @media (max-width: ${token.screenSM}px) {
      padding-block: 48px;
    }
  `,
  sectionHeader: css`
    max-width: 720px;
    margin-bottom: 48px;
  `,
  eyebrow: css`
    color: ${token.colorPrimary};
    font-size: 12px;
    line-height: 20px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  `,
  sectionTitle: css`
    margin: 8px 0 12px;
    color: ${token.colorText};
    font-size: 36px;
    line-height: 44px;
    font-weight: 700;

    @media (max-width: ${token.screenSM}px) {
      font-size: 28px;
      line-height: 36px;
    }
  `,
  sectionDescription: css`
    max-width: 640px;
    color: ${token.colorTextSecondary};
    font-size: 16px;
    line-height: 26px;
  `,
  enterpriseCard: css`
    height: 100%;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: 12px;
    background: ${token.colorBgContainer};
    transition:
      border-color 200ms ease,
      box-shadow 200ms ease,
      transform 200ms ease;

    &:hover {
      border-color: ${token.colorPrimaryHover};
      box-shadow:
        0 4px 8px rgba(7, 17, 31, 0.04),
        0 16px 40px rgba(7, 17, 31, 0.1);
      transform: translateY(-2px);
    }
  `,
}));
