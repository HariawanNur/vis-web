"use client";

import Link from "next/link";
import {
  Button,
  Card,
  Chart,
  Col,
  createStyles,
  Flex,
  Icon,
  Progress,
  Row,
  Tag,
  Typography,
  type IconName,
} from "@/components";
import { useI18n, type TranslationKey } from "@/i18n";

const PLATFORM_KPIS: Array<{
  labelKey: TranslationKey;
  value: string;
  trend: string;
  icon: IconName;
  color: string;
  tint: string;
}> = [
  {
    labelKey: "dashboard.platform.kpi.totalTenants",
    value: "248",
    trend: "+12.5%",
    icon: "ShopOutlined",
    color: "#7c3aed",
    tint: "#f3e8ff",
  },
  {
    labelKey: "dashboard.platform.kpi.activeUsers",
    value: "18,429",
    trend: "+8.2%",
    icon: "TeamOutlined",
    color: "#2563eb",
    tint: "#dbeafe",
  },
  {
    labelKey: "dashboard.platform.kpi.monthlyRevenue",
    value: "Rp 1.28B",
    trend: "+16.4%",
    icon: "DollarOutlined",
    color: "#16a34a",
    tint: "#dcfce7",
  },
  {
    labelKey: "dashboard.platform.kpi.activeSubscriptions",
    value: "231",
    trend: "+5.1%",
    icon: "CrownOutlined",
    color: "#ea580c",
    tint: "#ffedd5",
  },
];

const GROWTH_DATA: Array<{
  monthKey: TranslationKey;
  revenue: number;
  tenants: number;
}> = [
  { monthKey: "dashboard.month.jan", revenue: 620, tenants: 128 },
  { monthKey: "dashboard.month.feb", revenue: 700, tenants: 142 },
  { monthKey: "dashboard.month.mar", revenue: 680, tenants: 158 },
  { monthKey: "dashboard.month.apr", revenue: 820, tenants: 176 },
  { monthKey: "dashboard.month.may", revenue: 930, tenants: 194 },
  { monthKey: "dashboard.month.jun", revenue: 1010, tenants: 215 },
  { monthKey: "dashboard.month.jul", revenue: 1280, tenants: 248 },
];

const ACTIVITIES: Array<{
  titleKey: TranslationKey;
  timeKey: TranslationKey;
  icon: IconName;
  color: string;
  tint: string;
}> = [
  {
    titleKey: "dashboard.platform.activity.tenantJoined",
    timeKey: "dashboard.time.twoMinutesAgo",
    icon: "ShopOutlined",
    color: "#7c3aed",
    tint: "#f3e8ff",
  },
  {
    titleKey: "dashboard.platform.activity.paymentReceived",
    timeKey: "dashboard.time.fifteenMinutesAgo",
    icon: "CreditCardOutlined",
    color: "#16a34a",
    tint: "#dcfce7",
  },
  {
    titleKey: "dashboard.platform.activity.subscriptionUpgraded",
    timeKey: "dashboard.time.oneHourAgo",
    icon: "RiseOutlined",
    color: "#2563eb",
    tint: "#dbeafe",
  },
  {
    titleKey: "dashboard.platform.activity.systemUpdated",
    timeKey: "dashboard.time.threeHoursAgo",
    icon: "CloudSyncOutlined",
    color: "#ea580c",
    tint: "#ffedd5",
  },
];

const TOP_TENANTS: Array<{
  nameKey: TranslationKey;
  planKey: TranslationKey;
  revenue: string;
  color: string;
}> = [
  {
    nameKey: "dashboard.platform.tenant.lumina",
    planKey: "dashboard.plan.enterprise",
    revenue: "Rp 42.8M",
    color: "#7c3aed",
  },
  {
    nameKey: "dashboard.platform.tenant.belle",
    planKey: "dashboard.plan.business",
    revenue: "Rp 36.2M",
    color: "#2563eb",
  },
  {
    nameKey: "dashboard.platform.tenant.aura",
    planKey: "dashboard.plan.business",
    revenue: "Rp 31.7M",
    color: "#db2777",
  },
  {
    nameKey: "dashboard.platform.tenant.glow",
    planKey: "dashboard.plan.pro",
    revenue: "Rp 28.4M",
    color: "#16a34a",
  },
];

const SUBSCRIPTIONS: Array<{
  labelKey: TranslationKey;
  count: number;
  percent: number;
  color: string;
}> = [
  {
    labelKey: "dashboard.plan.enterprise",
    count: 54,
    percent: 86,
    color: "#7c3aed",
  },
  {
    labelKey: "dashboard.plan.business",
    count: 97,
    percent: 69,
    color: "#2563eb",
  },
  { 
    labelKey: "dashboard.plan.pro",
    count: 80,
    percent: 52,
    color: "#16a34a",
  },
];

const QUICK_LINKS: Array<{
  labelKey: TranslationKey;
  href: string;
  icon: IconName;
  color: string;
}> = [
  {
    labelKey: "dashboard.platform.quick.addTenant",
    href: "/admin/tenants",
    icon: "PlusOutlined",
    color: "#7c3aed",
  },
  {
    labelKey: "dashboard.platform.quick.manageUsers",
    href: "/admin/memberships",
    icon: "UserAddOutlined",
    color: "#2563eb",
  },
  {
    labelKey: "dashboard.platform.quick.viewBilling",
    href: "/admin/subscriptions",
    icon: "WalletOutlined",
    color: "#16a34a",
  },
  {
    labelKey: "dashboard.platform.quick.platformSettings",
    href: "/admin/settings",
    icon: "SettingOutlined",
    color: "#ea580c",
  },
];

const useStyles = createStyles(({ css }) => ({
  page: css`
    max-width: 1600px;
    margin: 0 auto;
  `,
  greeting: css`
    margin-bottom: 18px;
  `,
  title: css`
    color: #17132d !important;
    font-size: 23px !important;
    font-weight: 800 !important;
    margin: 0 0 3px !important;
  `,
  subtitle: css`
    color: #858190 !important;
    font-size: 12px;
  `,
  period: css`
    border-color: #e7e5ec !important;
    color: #5f5a6d !important;
    background: #fff !important;
  `,
  card: css`
    height: 100%;
    border: 1px solid #ebeaf0 !important;
    box-shadow: 0 4px 15px rgba(28, 22, 49, 0.035) !important;
    .ant-card-body {
      height: 100%;
      padding: 17px !important;
    }
  `,
  kpiIcon: css`
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    border-radius: 12px;
  `,
  kpiLabel: css`
    color: #858190 !important;
    display: block;
    font-size: 11px;
    font-weight: 600;
    margin-bottom: 7px;
  `,
  kpiValue: css`
    color: #201b31 !important;
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.03em;
  `,
  trend: css`
    color: #16a34a !important;
    font-size: 10px;
    font-weight: 700;
  `,
  sectionTitle: css`
    color: #272238 !important;
    font-size: 14px;
    font-weight: 800;
  `,
  sectionLink: css`
    color: #7c3aed;
    font-size: 12px;
  `,
  sectionHint: css`
    color: #9793a0 !important;
    font-size: 10px;
  `,
  chartWrap: css`
    margin-top: 8px;
    min-width: 0;
  `,
  activity: css`
    display: flex;
    gap: 10px;
    padding: 9px 0;
    &:not(:last-child) {
      border-bottom: 1px solid #f0eff4;
    }
  `,
  activityIcon: css`
    width: 32px;
    height: 32px;
    flex: 0 0 auto;
    display: grid;
    place-items: center;
    border-radius: 9px;
  `,
  activityTitle: css`
    color: #373244 !important;
    display: block;
    font-size: 11px;
    font-weight: 700;
  `,
  activityTime: css`
    color: #9b97a4 !important;
    font-size: 9px;
  `,
  tenantRow: css`
    display: grid;
    grid-template-columns: 34px minmax(0, 1fr) auto;
    align-items: center;
    gap: 9px;
    padding: 7px 0;
  `,
  tenantAvatar: css`
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    border-radius: 9px;
    color: #fff;
    font-size: 10px;
    font-weight: 800;
  `,
  tenantName: css`
    color: #373244 !important;
    display: block;
    font-size: 11px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  tenantPlan: css`
    color: #9793a0 !important;
    font-size: 9px;
  `,
  tenantRevenue: css`
    color: #272238 !important;
    font-size: 10px;
    font-weight: 800;
  `,
  plan: css`
    margin-top: 12px;
  `,
  planLabel: css`
    color: #4d4859 !important;
    font-size: 10px;
    font-weight: 700;
  `,
  planCount: css`
    color: #858190 !important;
    font-size: 10px;
  `,
  healthRing: css`
    width: 92px;
    height: 92px;
    margin: 7px auto 12px;
    border: 9px solid #dcfce7;
    border-top-color: #16a34a;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: #166534;
    font-size: 20px;
    font-weight: 800;
  `,
  healthLine: css`
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    color: #736e7f;
    font-size: 10px;
  `,
  healthy: css`
    color: #16a34a;
    font-weight: 700;
  `,
  quick: css`
    height: 62px;
    display: flex;
    align-items: center;
    gap: 11px;
    border: 1px solid #ebeaf0;
    border-radius: 13px;
    background: #fff;
    color: #3b3648;
    padding: 0 14px;
    font-size: 11px;
    font-weight: 700;
    transition: 0.2s ease;
    &:hover {
      transform: translateY(-2px);
      border-color: #cfc6ea;
      box-shadow: 0 7px 18px rgba(28, 22, 49, 0.07);
    }
  `,
  quickIcon: css`
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    border-radius: 9px;
    background: #f5f2fb;
  `,
}));

export function AdminDashboardClient() {
  const { t } = useI18n();
  const { styles } = useStyles();
  const chartData = GROWTH_DATA.map(({ monthKey, ...item }) => ({
    ...item,
    month: t(monthKey),
  }));

  return (
    <main className={styles.page}>
      <Flex
        className={styles.greeting}
        justify="space-between"
        align="end"
        gap={12}
        wrap
      >
        <div>
          <Typography.Title level={2} className={styles.title}>
            {t("dashboard.platform.greeting")}
          </Typography.Title>
          <Typography className={styles.subtitle}>
            {t("dashboard.platform.subtitle")}
          </Typography>
        </div>
        <Button
          className={styles.period}
          icon={<Icon type="CalendarOutlined" />}
        >
          {t("dashboard.period.last30Days")}
        </Button>
      </Flex>

      <Row gutter={[14, 14]}>
        {PLATFORM_KPIS.map((item) => (
          <Col key={item.labelKey} xs={24} sm={12} xl={6}>
            <Card className={styles.card}>
              <Flex justify="space-between" align="start">
                <div>
                  <Typography className={styles.kpiLabel}>
                    {t(item.labelKey)}
                  </Typography>
                  <Typography className={styles.kpiValue}>
                    {item.value}
                  </Typography>
                  <Flex gap={4} align="center">
                    <Icon type="ArrowUpOutlined" size={9} color="#16a34a" />
                    <Typography className={styles.trend}>
                      {item.trend} {t("dashboard.fromLastMonth")}
                    </Typography>
                  </Flex>
                </div>
                <div
                  className={styles.kpiIcon}
                  style={{ color: item.color, background: item.tint }}
                >
                  <Icon type={item.icon} size={19} />
                </div>
              </Flex>
            </Card>
          </Col>
        ))}

        <Col xs={24} xl={16}>
          <Card className={styles.card}>
            <Flex justify="space-between" align="center">
              <div>
                <Typography className={styles.sectionTitle}>
                  {t("dashboard.platform.growthOverview")}
                </Typography>
                <br />
                <Typography className={styles.sectionHint}>
                  {t("dashboard.platform.growthHint")}
                </Typography>
              </div>
              <Tag color="purple">{t("dashboard.period.thisYear")}</Tag>
            </Flex>
            <div className={styles.chartWrap}>
              <Chart
                data={chartData}
                xAxisKey="month"
                height={194}
                showAreaFill
                areaDataKey="revenue"
                areaFill="#ede9fe"
                showLegend
                lines={[
                  {
                    dataKey: "revenue",
                    name: t("dashboard.platform.chart.revenue"),
                    stroke: "#7c3aed",
                  },
                  {
                    dataKey: "tenants",
                    name: t("dashboard.platform.chart.tenants"),
                    stroke: "#2563eb",
                  },
                ]}
              />
            </div>
          </Card>
        </Col>
        <Col xs={24} xl={8}>
          <Card className={styles.card}>
            <Flex justify="space-between">
              <Typography className={styles.sectionTitle}>
                {t("dashboard.platform.recentActivity")}
              </Typography>
              <Link href="/admin/audit-platform" className={styles.sectionLink}>
                {t("dashboard.viewAll")}
              </Link>
            </Flex>
            <div>
              {ACTIVITIES.map((activity) => (
                <div key={activity.titleKey} className={styles.activity}>
                  <div
                    className={styles.activityIcon}
                    style={{ color: activity.color, background: activity.tint }}
                  >
                    <Icon type={activity.icon} size={14} />
                  </div>
                  <div>
                    <Typography className={styles.activityTitle}>
                      {t(activity.titleKey)}
                    </Typography>
                    <Typography className={styles.activityTime}>
                      {t(activity.timeKey)}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card className={styles.card}>
            <Flex justify="space-between">
              <Typography className={styles.sectionTitle}>
                {t("dashboard.platform.topTenants")}
              </Typography>
              <Link href="/admin/tenants" className={styles.sectionLink}>
                {t("dashboard.viewAll")}
              </Link>
            </Flex>
            {TOP_TENANTS.map((tenant) => (
              <div key={tenant.nameKey} className={styles.tenantRow}>
                <div
                  className={styles.tenantAvatar}
                  style={{ background: tenant.color }}
                >
                  <Icon type="ShopOutlined" size={14} />
                </div>
                <div>
                  <Typography className={styles.tenantName}>
                    {t(tenant.nameKey)}
                  </Typography>
                  <Typography className={styles.tenantPlan}>
                    {t(tenant.planKey)}
                  </Typography>
                </div>
                <Typography className={styles.tenantRevenue}>
                  {tenant.revenue}
                </Typography>
              </div>
            ))}
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={7}>
          <Card className={styles.card}>
            <Typography className={styles.sectionTitle}>
              {t("dashboard.platform.subscriptionBreakdown")}
            </Typography>
            {SUBSCRIPTIONS.map((plan) => (
              <div key={plan.labelKey} className={styles.plan}>
                <Flex justify="space-between">
                  <Typography className={styles.planLabel}>
                    {t(plan.labelKey)}
                  </Typography>
                  <Typography className={styles.planCount}>
                    {plan.count}
                  </Typography>
                </Flex>
                <Progress
                  percent={plan.percent}
                  showInfo={false}
                  strokeColor={plan.color}
                  size="small"
                />
              </div>
            ))}
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={7}>
          <Card className={styles.card}>
            <Flex justify="space-between">
              <Typography className={styles.sectionTitle}>
                {t("dashboard.platform.systemHealth")}
              </Typography>
              <Tag color="success">{t("dashboard.status.operational")}</Tag>
            </Flex>
            <div className={styles.healthRing}>99.9%</div>
            <div className={styles.healthLine}>
              <span>{t("dashboard.platform.health.api")}</span>
              <span className={styles.healthy}>
                {t("dashboard.status.healthy")}
              </span>
            </div>
            <div className={styles.healthLine}>
              <span>{t("dashboard.platform.health.database")}</span>
              <span className={styles.healthy}>
                {t("dashboard.status.healthy")}
              </span>
            </div>
          </Card>
        </Col>

        {QUICK_LINKS.map((item) => (
          <Col key={item.labelKey} xs={24} sm={12} xl={6}>
            <Link href={item.href} className={styles.quick}>
              <span className={styles.quickIcon} style={{ color: item.color }}>
                <Icon type={item.icon} size={16} />
              </span>
              <span>{t(item.labelKey)}</span>
              <Icon
                type="ArrowRightOutlined"
                size={10}
                style={{ marginLeft: "auto" }}
              />
            </Link>
          </Col>
        ))}
      </Row>
    </main>
  );
}
