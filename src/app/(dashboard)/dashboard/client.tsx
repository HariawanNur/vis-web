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

const KPIS: Array<{
  labelKey: TranslationKey;
  value: string;
  detailKey: TranslationKey;
  icon: IconName;
  color: string;
  tint: string;
  warning?: boolean;
}> = [
  {
    labelKey: "dashboard.tenant.kpi.todayRevenue",
    value: "Rp 8.450.000",
    detailKey: "dashboard.tenant.kpi.revenueDetail",
    icon: "WalletOutlined",
    color: "#6532d6",
    tint: "#f0eaff",
  },
  {
    labelKey: "dashboard.tenant.kpi.todayAppointments",
    value: "32",
    detailKey: "dashboard.tenant.kpi.appointmentDetail",
    icon: "CalendarOutlined",
    color: "#2563eb",
    tint: "#e8f0ff",
  },
  {
    labelKey: "dashboard.tenant.kpi.todayCustomers",
    value: "28",
    detailKey: "dashboard.tenant.kpi.customerDetail",
    icon: "UserAddOutlined",
    color: "#0f9f6e",
    tint: "#e3f8ef",
  },
  {
    labelKey: "dashboard.tenant.kpi.noShow",
    value: "2",
    detailKey: "dashboard.tenant.kpi.noShowDetail",
    icon: "UserDeleteOutlined",
    color: "#d97706",
    tint: "#fff3dc",
    warning: true,
  },
  {
    labelKey: "dashboard.tenant.kpi.staffUtilization",
    value: "84%",
    detailKey: "dashboard.tenant.kpi.staffDetail",
    icon: "TeamOutlined",
    color: "#db2777",
    tint: "#fce7f3",
  },
];

const REVENUE_DATA: Array<{
  dayKey: TranslationKey;
  revenue: number;
}> = [
  { dayKey: "dashboard.day.mon", revenue: 5.2 },
  { dayKey: "dashboard.day.tue", revenue: 6.1 },
  { dayKey: "dashboard.day.wed", revenue: 5.8 },
  { dayKey: "dashboard.day.thu", revenue: 7.3 },
  { dayKey: "dashboard.day.fri", revenue: 8.1 },
  { dayKey: "dashboard.day.sat", revenue: 9.4 },
  { dayKey: "dashboard.day.sun", revenue: 8.45 },
];

const APPOINTMENTS: Array<{
  time: string;
  customerKey: TranslationKey;
  staff: string;
  serviceKey: TranslationKey;
  statusKey: TranslationKey;
  color: string;
}> = [
  {
    time: "09:00",
    customerKey: "dashboard.tenant.customer.maya",
    staff: "Sarah",
    serviceKey: "dashboard.tenant.service.hairColoring",
    statusKey: "dashboard.status.inProgress",
    color: "purple",
  },
  {
    time: "10:30",
    customerKey: "dashboard.tenant.customer.sarah",
    staff: "Maya",
    serviceKey: "dashboard.tenant.service.facialTreatment",
    statusKey: "dashboard.status.confirmed",
    color: "blue",
  },
  {
    time: "11:00",
    customerKey: "dashboard.tenant.customer.rina",
    staff: "Rina",
    serviceKey: "dashboard.tenant.service.hairSpa",
    statusKey: "dashboard.status.confirmed",
    color: "blue",
  },
  {
    time: "13:30",
    customerKey: "dashboard.tenant.customer.diana",
    staff: "Dewi",
    serviceKey: "dashboard.tenant.service.manicure",
    statusKey: "dashboard.status.pending",
    color: "orange",
  },
];

const TOP_SERVICES: Array<{
  labelKey: TranslationKey;
  revenue: string;
  count: number;
  color: string;
}> = [
  {
    labelKey: "dashboard.tenant.service.hairColoring",
    revenue: "Rp 12,5 jt",
    count: 42,
    color: "#6532d6",
  },
  {
    labelKey: "dashboard.tenant.service.facialTreatment",
    revenue: "Rp 9,8 jt",
    count: 31,
    color: "#2563eb",
  },
  {
    labelKey: "dashboard.tenant.service.hairSpa",
    revenue: "Rp 8,4 jt",
    count: 28,
    color: "#db2777",
  },
];

const TOP_STAFF = [
  { name: "Sarah Wijaya", revenue: "Rp 18,2 jt", utilization: "92%" },
  { name: "Maya Salma", revenue: "Rp 15,7 jt", utilization: "87%" },
  { name: "Rina Marsela", revenue: "Rp 12,1 jt", utilization: "81%" },
];

const AUTOMATIONS: Array<{
  labelKey: TranslationKey;
  sent: number;
  rate: number;
}> = [
  { labelKey: "dashboard.tenant.automation.confirmation", sent: 142, rate: 99 },
  { labelKey: "dashboard.tenant.automation.reminder", sent: 126, rate: 97 },
  { labelKey: "dashboard.tenant.automation.followUp", sent: 38, rate: 94 },
];

const SALES_CHANNELS: Array<{
  labelKey: TranslationKey;
  value: string;
  orders: number;
  icon: IconName;
  color: string;
  tint: string;
}> = [
  {
    labelKey: "dashboard.tenant.commerce.pos",
    value: "Rp 8,45 jt",
    orders: 32,
    icon: "ShopOutlined",
    color: "#6532d6",
    tint: "#f0eaff",
  },
  {
    labelKey: "dashboard.tenant.commerce.store",
    value: "Rp 3,28 jt",
    orders: 18,
    icon: "ShoppingOutlined",
    color: "#2563eb",
    tint: "#e8f0ff",
  },
  {
    labelKey: "dashboard.tenant.commerce.whatsapp",
    value: "Rp 1,15 jt",
    orders: 7,
    icon: "MessageOutlined",
    color: "#0f9f6e",
    tint: "#e3f8ef",
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
  dateLabel: css`
    display: block;
    margin-bottom: 3px;
    color: #6b6577 !important;
    font-size: 11px;
    font-weight: 650;
  `,
  title: css`
    margin: 0 0 3px !important;
    color: #17132d !important;
    font-size: 23px !important;
    font-weight: 800 !important;
  `,
  subtitle: css`
    color: #858190 !important;
    font-size: 12px;
  `,
  headerActions: css`
    @media (max-width: 575px) {
      width: 100%;
      .ant-btn {
        flex: 1;
      }
    }
  `,
  outletButton: css`
    height: 38px;
    border-color: #e3e1e8 !important;
    color: #4e485a !important;
    background: #fff !important;
  `,
  primaryButton: css`
    height: 38px;
    box-shadow: 0 7px 16px rgba(101, 50, 214, 0.18);
  `,
  kpiGrid: css`
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 12px;
    margin-bottom: 14px;
    @media (max-width: 1199px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    @media (max-width: 767px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  `,
  card: css`
    height: 100%;
    border: 1px solid #ebe1f7 !important;
    border-radius: 22px !important;
    box-shadow: 0 10px 28px rgba(27, 18, 60, 0.05) !important;
    .ant-card-body {
      height: 100%;
      padding: 18px !important;
    }
  `,
  kpiCard: css`
    min-height: 125px;
  `,
  kpiIcon: css`
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    border-radius: 10px;
  `,
  kpiLabel: css`
    display: block;
    color: #777181 !important;
    font-size: 10px;
    font-weight: 650;
  `,
  kpiValue: css`
    display: block;
    margin-top: 9px;
    color: #211c31 !important;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.03em;
  `,
  kpiDetail: css`
    display: block;
    margin-top: 5px;
    color: #169363 !important;
    font-size: 9px;
    font-weight: 650;
  `,
  warning: css`
    color: #c46a08 !important;
  `,
  sectionTitle: css`
    color: #111827 !important;
    font-size: 15px;
    font-weight: 900;
  `,
  sectionHint: css`
    display: block;
    margin-top: 3px;
    color: #96919e !important;
    font-size: 9px;
  `,
  sectionLink: css`
    color: #6532d6;
    font-size: 10px;
    font-weight: 650;
  `,
  chartWrap: css`
    margin-top: 9px;
    min-width: 0;
  `,
  appointment: css`
    display: grid;
    grid-template-columns: 42px minmax(0, 1fr) auto;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
    &:not(:last-child) {
      border-bottom: 1px solid #efedf2;
    }
  `,
  time: css`
    color: #6532d6 !important;
    font-size: 11px;
    font-weight: 800;
  `,
  customer: css`
    display: block;
    color: #322d3d !important;
    font-size: 10px;
    font-weight: 750;
  `,
  service: css`
    color: #938e9c !important;
    font-size: 9px;
  `,
  rankingRow: css`
    display: grid;
    grid-template-columns: 28px minmax(0, 1fr) auto;
    align-items: center;
    gap: 9px;
    padding: 10px 0;
    &:not(:last-child) {
      border-bottom: 1px solid #efedf2;
    }
  `,
  rank: css`
    width: 24px;
    height: 24px;
    display: grid;
    place-items: center;
    border-radius: 7px;
    background: #f2edff;
    color: #6532d6;
    font-size: 9px;
    font-weight: 800;
  `,
  rankName: css`
    display: block;
    color: #383242 !important;
    font-size: 10px;
    font-weight: 700;
  `,
  rankMeta: css`
    color: #97919f !important;
    font-size: 9px;
  `,
  rankValue: css`
    color: #272238 !important;
    font-size: 10px;
    font-weight: 800;
  `,
  automation: css`
    padding: 9px 0;
    &:not(:last-child) {
      border-bottom: 1px solid #efedf2;
    }
  `,
  automationLabel: css`
    color: #3f3949 !important;
    font-size: 10px;
    font-weight: 700;
  `,
  automationMeta: css`
    color: #918b99 !important;
    font-size: 9px;
  `,
  automationHealth: css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-top: 11px;
    padding-top: 11px;
    border-top: 1px solid #eceaf0;
  `,
  healthValue: css`
    display: block;
    color: #1f1930 !important;
    font-size: 15px;
    font-weight: 800;
  `,
  healthLabel: css`
    color: #96909e !important;
    font-size: 8px;
  `,
  commerceGrid: css`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    margin-top: 15px;
    @media (max-width: 575px) {
      grid-template-columns: 1fr;
    }
  `,
  channel: css`
    padding: 13px;
    border: 1px solid #ebe9ef;
    border-radius: 11px;
    background: #fcfcfd;
  `,
  channelIcon: css`
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    border-radius: 8px;
  `,
  channelName: css`
    display: block;
    margin-top: 12px;
    color: #6f6978 !important;
    font-size: 9px;
    font-weight: 650;
  `,
  channelValue: css`
    display: block;
    margin-top: 3px;
    color: #211c31 !important;
    font-size: 15px;
    font-weight: 800;
  `,
  channelOrders: css`
    color: #98929f !important;
    font-size: 8px;
  `,
  commerceTotal: css`
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #eceaf0;
  `,
  inventoryProduct: css`
    display: grid;
    grid-template-columns: 38px minmax(0, 1fr) auto;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
  `,
  productIcon: css`
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    background: #f2edff;
    color: #6532d6;
  `,
  inventoryChannels: css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-top: 13px;
  `,
  inventoryChannel: css`
    padding: 10px;
    border: 1px solid #ebe9ef;
    border-radius: 9px;
    background: #fcfcfd;
  `,
  inventoryAction: css`
    width: 100%;
    margin-top: 13px;
  `,
}));

export function TenantDashboardClient() {
  const { t } = useI18n();
  const { styles, cx } = useStyles();
  const chartData = REVENUE_DATA.map(({ dayKey, ...item }) => ({
    ...item,
    day: t(dayKey),
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
          <Typography className={styles.dateLabel}>
            {t("dashboard.tenant.todayDate")}
          </Typography>
          <Typography.Title level={2} className={styles.title}>
            {t("dashboard.tenant.greeting")}
          </Typography.Title>
          <Typography className={styles.subtitle}>
            {t("dashboard.tenant.subtitle")}
          </Typography>
        </div>
        <Flex className={styles.headerActions} gap={8} wrap>
          <Button
            className={styles.outletButton}
            icon={<Icon type="ShopOutlined" />}
          >
            {t("dashboard.tenant.allOutlets")}
          </Button>
          <Button
            type="primary"
            className={styles.primaryButton}
            icon={<Icon type="PlusOutlined" />}
          >
            {t("dashboard.tenant.newAppointment")}
          </Button>
        </Flex>
      </Flex>

      <section className={styles.kpiGrid}>
        {KPIS.map((item) => (
          <Card key={item.labelKey} className={cx(styles.card, styles.kpiCard)}>
            <Flex justify="space-between" align="start">
              <div>
                <Typography className={styles.kpiLabel}>
                  {t(item.labelKey)}
                </Typography>
                <Typography className={styles.kpiValue}>
                  {item.value}
                </Typography>
                <Typography
                  className={cx(
                    styles.kpiDetail,
                    item.warning && styles.warning,
                  )}
                >
                  {t(item.detailKey)}
                </Typography>
              </div>
              <span
                className={styles.kpiIcon}
                style={{ color: item.color, background: item.tint }}
              >
                <Icon type={item.icon} size={17} />
              </span>
            </Flex>
          </Card>
        ))}
      </section>

      <Row gutter={[14, 14]}>
        <Col xs={24} xl={16}>
          <Card className={styles.card}>
            <Flex justify="space-between" align="center">
              <div>
                <Typography className={styles.sectionTitle}>
                  {t("dashboard.tenant.revenueOverview")}
                </Typography>
                <Typography className={styles.sectionHint}>
                  {t("dashboard.tenant.revenueHint")}
                </Typography>
              </div>
              <Tag color="purple">7 {t("dashboard.tenant.days")}</Tag>
            </Flex>
            <div className={styles.chartWrap}>
              <Chart
                data={chartData}
                xAxisKey="day"
                height={220}
                showAreaFill
                areaDataKey="revenue"
                areaFill="#eee8ff"
                lines={[
                  {
                    dataKey: "revenue",
                    name: t("dashboard.tenant.chart.revenue"),
                    stroke: "#6532d6",
                  },
                ]}
              />
            </div>
          </Card>
        </Col>
        <Col xs={24} xl={8}>
          <Card className={styles.card}>
            <Flex justify="space-between">
              <div>
                <Typography className={styles.sectionTitle}>
                  {t("dashboard.tenant.todayAppointments")}
                </Typography>
                <Typography className={styles.sectionHint}>
                  {t("dashboard.tenant.nextAppointments")}
                </Typography>
              </div>
              <Link href="/appointments" className={styles.sectionLink}>
                {t("dashboard.viewSchedule")}
              </Link>
            </Flex>
            {APPOINTMENTS.map((item) => (
              <div
                key={`${item.time}-${item.customerKey}`}
                className={styles.appointment}
              >
                <Typography className={styles.time}>{item.time}</Typography>
                <div>
                  <Typography className={styles.customer}>
                    {item.staff} → {t(item.customerKey)}
                  </Typography>
                  <Typography className={styles.service}>
                    {t(item.serviceKey)}
                  </Typography>
                </div>
                <Tag color={item.color}>{t(item.statusKey)}</Tag>
              </div>
            ))}
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card className={styles.card}>
            <Flex justify="space-between">
              <Typography className={styles.sectionTitle}>
                {t("dashboard.tenant.topServices")}
              </Typography>
              <Link href="/reports" className={styles.sectionLink}>
                {t("dashboard.viewAll")}
              </Link>
            </Flex>
            {TOP_SERVICES.map((item, index) => (
              <div key={item.labelKey} className={styles.rankingRow}>
                <span className={styles.rank}>{index + 1}</span>
                <div>
                  <Typography className={styles.rankName}>
                    {t(item.labelKey)}
                  </Typography>
                  <Typography className={styles.rankMeta}>
                    {item.count} {t("dashboard.tenant.bookings")}
                  </Typography>
                </div>
                <Typography className={styles.rankValue}>
                  {item.revenue}
                </Typography>
              </div>
            ))}
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card className={styles.card}>
            <Flex justify="space-between">
              <Typography className={styles.sectionTitle}>
                {t("dashboard.tenant.topStaff")}
              </Typography>
              <Link href="/teams" className={styles.sectionLink}>
                {t("dashboard.tenant.commission")}
              </Link>
            </Flex>
            {TOP_STAFF.map((item, index) => (
              <div key={item.name} className={styles.rankingRow}>
                <span className={styles.rank}>{index + 1}</span>
                <div>
                  <Typography className={styles.rankName}>
                    {item.name}
                  </Typography>
                  <Typography className={styles.rankMeta}>
                    {item.utilization} {t("dashboard.tenant.utilization")}
                  </Typography>
                </div>
                <Typography className={styles.rankValue}>
                  {item.revenue}
                </Typography>
              </div>
            ))}
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card className={styles.card}>
            <Flex justify="space-between">
              <Typography className={styles.sectionTitle}>
                {t("dashboard.tenant.whatsappAutomation")}
              </Typography>
              <Tag color="success">{t("dashboard.status.operational")}</Tag>
            </Flex>
            {AUTOMATIONS.map((item) => (
              <div key={item.labelKey} className={styles.automation}>
                <Flex justify="space-between">
                  <Typography className={styles.automationLabel}>
                    {t(item.labelKey)}
                  </Typography>
                  <Typography className={styles.automationMeta}>
                    {item.sent} {t("dashboard.tenant.sent")}
                  </Typography>
                </Flex>
                <Progress
                  percent={item.rate}
                  showInfo={false}
                  size="small"
                  strokeColor="#20a875"
                />
              </div>
            ))}
            <div className={styles.automationHealth}>
              <div>
                <Typography className={styles.healthValue}>98.7%</Typography>
                <Typography className={styles.healthLabel}>
                  {t("dashboard.tenant.deliveryRate")}
                </Typography>
              </div>
              <div>
                <Typography className={styles.healthValue}>91.4%</Typography>
                <Typography className={styles.healthLabel}>
                  {t("dashboard.tenant.readRate")}
                </Typography>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} xl={14}>
          <Card className={styles.card}>
            <Flex justify="space-between" align="start">
              <div>
                <Typography className={styles.sectionTitle}>
                  {t("dashboard.tenant.commerce.title")}
                </Typography>
                <Typography className={styles.sectionHint}>
                  {t("dashboard.tenant.commerce.description")}
                </Typography>
              </div>
              <Link href="/store" className={styles.sectionLink}>
                {t("dashboard.tenant.commerce.manageStore")}
              </Link>
            </Flex>
            <div className={styles.commerceGrid}>
              {SALES_CHANNELS.map((channel) => (
                <div key={channel.labelKey} className={styles.channel}>
                  <span
                    className={styles.channelIcon}
                    style={{ color: channel.color, background: channel.tint }}
                  >
                    <Icon type={channel.icon} size={15} />
                  </span>
                  <Typography className={styles.channelName}>
                    {t(channel.labelKey)}
                  </Typography>
                  <Typography className={styles.channelValue}>
                    {channel.value}
                  </Typography>
                  <Typography className={styles.channelOrders}>
                    {channel.orders} {t("dashboard.tenant.commerce.orders")}
                  </Typography>
                </div>
              ))}
            </div>
            <Flex
              className={styles.commerceTotal}
              justify="space-between"
              align="center"
            >
              <div>
                <Typography className={styles.rankMeta}>
                  {t("dashboard.tenant.commerce.totalSales")}
                </Typography>
                <Typography className={styles.rankName}>Rp 12,88 jt</Typography>
              </div>
              <Tag color="success">+18,4%</Tag>
            </Flex>
          </Card>
        </Col>

        <Col xs={24} xl={10}>
          <Card className={styles.card}>
            <Flex justify="space-between" align="start">
              <div>
                <Typography className={styles.sectionTitle}>
                  {t("dashboard.tenant.inventory.title")}
                </Typography>
                <Typography className={styles.sectionHint}>
                  {t("dashboard.tenant.inventory.description")}
                </Typography>
              </div>
              <Tag color="warning">
                {t("dashboard.tenant.inventory.lowStock")}
              </Tag>
            </Flex>
            <div className={styles.inventoryProduct}>
              <span className={styles.productIcon}>
                <Icon type="ShoppingOutlined" size={17} />
              </span>
              <div>
                <Typography className={styles.rankName}>
                  Kerastase Shampoo
                </Typography>
                <Typography className={styles.rankMeta}>
                  {t("dashboard.tenant.inventory.sku")}: KRS-SHM-250
                </Typography>
              </div>
              <div>
                <Typography className={styles.rankValue}>8</Typography>
                <Typography className={styles.rankMeta}>
                  {t("dashboard.tenant.inventory.units")}
                </Typography>
              </div>
            </div>
            <Progress
              percent={20}
              showInfo={false}
              strokeColor="#d97706"
              railColor="#f4ead8"
              size="small"
            />
            <div className={styles.inventoryChannels}>
              <div className={styles.inventoryChannel}>
                <Typography className={styles.rankMeta}>
                  {t("dashboard.tenant.commerce.pos")}
                </Typography>
                <Typography className={styles.rankName}>
                  2 {t("dashboard.tenant.inventory.sold")}
                </Typography>
              </div>
              <div className={styles.inventoryChannel}>
                <Typography className={styles.rankMeta}>
                  {t("dashboard.tenant.commerce.store")}
                </Typography>
                <Typography className={styles.rankName}>
                  3 {t("dashboard.tenant.inventory.sold")}
                </Typography>
              </div>
            </div>
            <Button
              className={styles.inventoryAction}
              icon={<Icon type="ShoppingCartOutlined" />}
            >
              {t("dashboard.tenant.inventory.restock")}
            </Button>
          </Card>
        </Col>
      </Row>
    </main>
  );
}
