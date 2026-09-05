import React from "react"
import { Layout as AntLayout, LayoutProps as AntLayoutProps } from "antd"
import { createStyles } from "antd-style"
import classNames from "classnames"
import { designSystem } from "@/theme/antd-theme"

const useStyles = createStyles(({ css }) => ({
  sider: css`
    background: ${designSystem.palette.primary} !important;
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .ant-menu-sub.ant-menu-inline {
      background-color: ${designSystem.palette.primary} !important;
    }
    .ant-menu-item {
      color: rgba(255, 255, 255, 0.8) !important;
      font-weight: 500;
    }
    .ant-menu-submenu-title {
      color: rgba(255, 255, 255, 0.9) !important;
      font-weight: 600;
    }
    .ant-menu-item-selected {
      background: ${designSystem.palette.tintPurple} !important;
      color: ${designSystem.palette.primary} !important;
      font-weight: 700;
    }
    .ant-menu-submenu-selected > .ant-menu-submenu-title {
      color: ${designSystem.palette.primary} !important;
    }
  `,
}))

export const CustomSider: React.FC<any> = ({ className, children, ...props }) => {
  const { styles } = useStyles()
  return (
    <AntLayout.Sider className={classNames(styles.sider, className)} {...props}>
      {children}
    </AntLayout.Sider>
  )
}

export const Layout: React.FC<AntLayoutProps> & {
  Header: typeof AntLayout.Header
  Sider: typeof CustomSider
  Content: typeof AntLayout.Content
  Footer: typeof AntLayout.Footer
} = (props: any) => <AntLayout {...props} />

Layout.Header = AntLayout.Header
Layout.Sider = CustomSider
Layout.Content = AntLayout.Content
Layout.Footer = AntLayout.Footer

export default Layout
