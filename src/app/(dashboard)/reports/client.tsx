"use client";

import {
  Button,
  Card,
  Col,
  createStyles,
  Flex,
  Icon,
  Input,
  Row,
  Select,
  Space,
  Tabs,
  Typography,
  type IconName,
} from "@/components";
import { useI18n, type TranslationKey } from "@/i18n";

const KPIS: Array<{
  labelKey: TranslationKey;
  value: string;
  detail: string;
  icon: IconName;
  color: string;
  tint: string;
}> = [
  {
    labelKey: "reports.kpi.revenue",
    value: "Rp 128.5M",
    detail: "+18.4% vs last month",
    icon: "DollarOutlined",
    color: "#7c3aed",
    tint: "#f3e8ff",
  },
  {
    labelKey: "reports.kpi.transactions",
    value: "1,842",
    detail: "+12.1% vs last month",
    icon: "TransactionOutlined",
    color: "#2563eb",
    tint: "#dbeafe",
  },
  {
    labelKey: "reports.kpi.avgTransaction",
    value: "Rp 69.7K",
    detail: "+5.6% vs last month",
    icon: "BarChartOutlined",
    color: "#16a34a",
    tint: "#dcfce7",
  },
  {
    labelKey: "reports.kpi.growth",
    value: "18.4%",
    detail: "Monthly growth rate",
    icon: "RiseOutlined",
    color: "#ea580c",
    tint: "#ffedd5",
  },
];

const TOP_SERVICES = [
  { name: "Hair Coloring", revenue: "Rp 42.5M", count: 148, percent: 33 },
  { name: "Facial Treatment", revenue: "Rp 31.2M", count: 112, percent: 24 },
  { name: "Hair Spa", revenue: "Rp 24.8M", count: 96, percent: 19 },
  { name: "Manicure & Pedicure", revenue: "Rp 18.4M", count: 84, percent: 14 },
  { name: "Body Massage", revenue: "Rp 11.6M", count: 48, percent: 9 },
];

const TOP_STAFF = [
  {
    name: "Sarah Wijaya",
    revenue: "Rp 32.4M",
    services: 142,
    utilization: "92%",
  },
  {
    name: "Maya Salma",
    revenue: "Rp 28.1M",
    services: 118,
    utilization: "87%",
  },
  {
    name: "Rina Marsela",
    revenue: "Rp 21.6M",
    services: 94,
    utilization: "81%",
  },
  {
    name: "Dewi Lestari",
    revenue: "Rp 18.2M",
    services: 82,
    utilization: "76%",
  },
];

const useStyles = createStyles(({ css }) => ({
  page: css`
    max-width: 1600px;
    margin: 0 auto;
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
  card: css`
    border: 1px solid #ebeaf0 !important;
    box-shadow: 0 4px 15px rgba(28, 22, 49, 0.035) !important;
    .ant-card-body {
      padding: 17px !important;
    }
  `,
  kpiGrid: css`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;
    margin-bottom: 14px;
    @media (max-width: 1199px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
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
    font-size: 11px;
    font-weight: 600;
  `,
  kpiValue: css`
    color: #201b31 !important;
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.03em;
    margin-top: 4px;
  `,
  kpiDetail: css`
    color: #16a34a !important;
    font-size: 10px;
    font-weight: 600;
    margin-top: 2px;
  `,
  sectionTitle: css`
    color: #272238 !important;
    font-size: 14px;
    font-weight: 800;
  `,
  chartPlaceholder: css`
    height: 260px;
    background: linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%);
    border-radius: 12px;
    display: grid;
    place-items: center;
    color: #7c3aed;
    font-size: 14px;
    font-weight: 700;
    margin-top: 12px;
  `,
  serviceRow: css`
    display: grid;
    grid-template-columns: 28px minmax(0, 1fr) auto;
    align-items: center;
    gap: 10px;
    padding: 9px 0;
    &:not(:last-child) {
      border-bottom: 1px solid #f0eff4;
    }
  `,
  rank: css`
    width: 24px;
    height: 24px;
    display: grid;
    place-items: center;
    border-radius: 7px;
    background: #f3e8ff;
    color: #7c3aed;
    font-size: 10px;
    font-weight: 800;
  `,
  serviceName: css`
    color: #272238 !important;
    font-size: 11px;
    font-weight: 700;
  `,
  serviceMeta: css`
    color: #9793a0 !important;
    font-size: 9px;
  `,
  serviceRevenue: css`
    color: #272238 !important;
    font-size: 11px;
    font-weight: 800;
  `,
  staffRow: css`
    display: grid;
    grid-template-columns: 28px minmax(0, 1fr) auto;
    align-items: center;
    gap: 10px;
    padding: 9px 0;
    &:not(:last-child) {
      border-bottom: 1px solid #f0eff4;
    }
  `,
}));

export default function ReportsClient() {
  const { t } = useI18n();
  const { styles } = useStyles();

  return (
    <main className={styles.page}>
      <Flex
        justify="space-between"
        align="end"
        gap={12}
        wrap
        style={{ marginBottom: 16 }}
      >
        <div>
          <Typography.Title level={2} className={styles.title}>
            {t("reports.title")}
          </Typography.Title>
          <Typography className={styles.subtitle}>
            {t("reports.subtitle")}
          </Typography>
        </div>
        <Space>
          <Input type="date" style={{ width: 140 }} />
          <Select
            style={{ width: 140 }}
            defaultValue="all"
            options={[
              { label: "All Outlets", value: "all" },
              { label: "Jakarta Selatan", value: "jksel" },
              { label: "Jakarta Pusat", value: "jkpus" },
              { label: "Bandung", value: "bdg" },
            ]}
          />
          <Button icon={<Icon type="DownloadOutlined" />}>
            {t("reports.export")}
          </Button>
        </Space>
      </Flex>

      <section className={styles.kpiGrid}>
        {KPIS.map((k) => (
          <Card key={k.labelKey} className={styles.card}>
            <Flex justify="space-between" align="start">
              <div>
                <Typography className={styles.kpiLabel}>
                  {t(k.labelKey)}
                </Typography>
                <Typography className={styles.kpiValue}>{k.value}</Typography>
                <Typography className={styles.kpiDetail}>{k.detail}</Typography>
              </div>
              <span
                className={styles.kpiIcon}
                style={{ color: k.color, background: k.tint }}
              >
                <Icon type={k.icon} size={19} />
              </span>
            </Flex>
          </Card>
        ))}
      </section>

      <Tabs
        defaultActiveKey="revenue"
        items={[
          {
            key: "revenue",
            label: "Revenue",
            children: (
              <Row gutter={[14, 14]}>
                <Col xs={24} xl={16}>
                  <Card className={styles.card}>
                    <Typography className={styles.sectionTitle}>
                      Revenue Overview
                    </Typography>
                    <div className={styles.chartPlaceholder}>
                      Revenue Chart - Click to integrate chart library
                    </div>
                  </Card>
                </Col>
                <Col xs={24} xl={8}>
                  <Card className={styles.card}>
                    <Typography className={styles.sectionTitle}>
                      Top Services
                    </Typography>
                    {TOP_SERVICES.map((s, i) => (
                      <div key={s.name} className={styles.serviceRow}>
                        <span className={styles.rank}>{i + 1}</span>
                        <div>
                          <Typography className={styles.serviceName}>
                            {s.name}
                          </Typography>
                          <Typography className={styles.serviceMeta}>
                            {s.count} bookings | {s.percent}%
                          </Typography>
                        </div>
                        <Typography className={styles.serviceRevenue}>
                          {s.revenue}
                        </Typography>
                      </div>
                    ))}
                  </Card>
                </Col>
                <Col xs={24}>
                  <Card className={styles.card}>
                    <Typography className={styles.sectionTitle}>
                      Top Staff by Revenue
                    </Typography>
                    {TOP_STAFF.map((s, i) => (
                      <div key={s.name} className={styles.staffRow}>
                        <span className={styles.rank}>{i + 1}</span>
                        <div>
                          <Typography className={styles.serviceName}>
                            {s.name}
                          </Typography>
                          <Typography className={styles.serviceMeta}>
                            {s.services} services | {s.utilization} utilization
                          </Typography>
                        </div>
                        <Typography className={styles.serviceRevenue}>
                          {s.revenue}
                        </Typography>
                      </div>
                    ))}
                  </Card>
                </Col>
              </Row>
            ),
          },
          {
            key: "transactions",
            label: "Transactions",
            children: (
              <Card className={styles.card}>
                <div
                  style={{
                    height: 300,
                    display: "grid",
                    placeItems: "center",
                    color: "#9793a0",
                  }}
                >
                  Transaction analytics
                </div>
              </Card>
            ),
          },
          {
            key: "services",
            label: "Services",
            children: (
              <Card className={styles.card}>
                <div
                  style={{
                    height: 300,
                    display: "grid",
                    placeItems: "center",
                    color: "#9793a0",
                  }}
                >
                  Service performance
                </div>
              </Card>
            ),
          },
          {
            key: "staff",
            label: "Staff",
            children: (
              <Card className={styles.card}>
                <div
                  style={{
                    height: 300,
                    display: "grid",
                    placeItems: "center",
                    color: "#9793a0",
                  }}
                >
                  Staff analytics
                </div>
              </Card>
            ),
          },
          {
            key: "commission",
            label: "Commission",
            children: (
              <Card className={styles.card}>
                <div
                  style={{
                    height: 300,
                    display: "grid",
                    placeItems: "center",
                    color: "#9793a0",
                  }}
                >
                  Commission report
                </div>
              </Card>
            ),
          },
          {
            key: "retention",
            label: "Customer Retention",
            children: (
              <Card className={styles.card}>
                <div
                  style={{
                    height: 300,
                    display: "grid",
                    placeItems: "center",
                    color: "#9793a0",
                  }}
                >
                  Retention analytics
                </div>
              </Card>
            ),
          },
          {
            key: "inventory",
            label: "Inventory",
            children: (
              <Card className={styles.card}>
                <div
                  style={{
                    height: 300,
                    display: "grid",
                    placeItems: "center",
                    color: "#9793a0",
                  }}
                >
                  Inventory report
                </div>
              </Card>
            ),
          },
        ]}
      />
    </main>
  );
}
