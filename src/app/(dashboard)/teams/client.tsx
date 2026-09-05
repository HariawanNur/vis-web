"use client";

import {
  Button,
  Card,
  createStyles,
  Flex,
  Icon,
  Space,
  Table,
  Tabs,
  Tag,
  Typography,
  type IconName,
} from "@/components";
import { useI18n, type TranslationKey } from "@/i18n";

const KPIS: Array<{
  labelKey: TranslationKey;
  value: string;
  icon: IconName;
  color: string;
  tint: string;
}> = [
  {
    labelKey: "teams.kpi.activeStaff",
    value: "24",
    icon: "TeamOutlined",
    color: "#7c3aed",
    tint: "#f3e8ff",
  },
  {
    labelKey: "teams.kpi.totalCommission",
    value: "Rp 12.8M",
    icon: "WalletOutlined",
    color: "#16a34a",
    tint: "#dcfce7",
  },
  {
    labelKey: "teams.kpi.avgPerStaff",
    value: "Rp 533K",
    icon: "BarChartOutlined",
    color: "#2563eb",
    tint: "#dbeafe",
  },
  {
    labelKey: "teams.kpi.topPerformer",
    value: "Sarah W.",
    icon: "TrophyOutlined",
    color: "#ea580c",
    tint: "#ffedd5",
  },
];

const STAFF = [
  {
    name: "Sarah Wijaya",
    role: "Senior Stylist",
    rate: "15%",
    serviceRev: "Rp 18.2M",
    productRev: "Rp 3.1M",
    commission: "Rp 3.2M",
    status: "Active",
    color: "#7c3aed",
  },
  {
    name: "Maya Salma",
    role: "Senior Stylist",
    rate: "15%",
    serviceRev: "Rp 15.7M",
    productRev: "Rp 2.4M",
    commission: "Rp 2.7M",
    status: "Active",
    color: "#2563eb",
  },
  {
    name: "Rina Marsela",
    role: "Stylist",
    rate: "12%",
    serviceRev: "Rp 12.1M",
    productRev: "Rp 1.8M",
    commission: "Rp 1.7M",
    status: "Active",
    color: "#db2777",
  },
  {
    name: "Dewi Lestari",
    role: "Stylist",
    rate: "12%",
    serviceRev: "Rp 10.4M",
    productRev: "Rp 1.5M",
    commission: "Rp 1.4M",
    status: "Active",
    color: "#16a34a",
  },
  {
    name: "Anisa Rahma",
    role: "Therapist",
    rate: "10%",
    serviceRev: "Rp 8.9M",
    productRev: "Rp 980K",
    commission: "Rp 988K",
    status: "Active",
    color: "#ea580c",
  },
  {
    name: "Lina Marlena",
    role: "Therapist",
    rate: "10%",
    serviceRev: "Rp 7.2M",
    productRev: "Rp 750K",
    commission: "Rp 795K",
    status: "On Leave",
    color: "#0891b2",
  },
  {
    name: "Putri Ayu",
    role: "Stylist",
    rate: "12%",
    serviceRev: "Rp 6.8M",
    productRev: "Rp 1.1M",
    commission: "Rp 948K",
    status: "Active",
    color: "#7c3aed",
  },
  {
    name: "Sari Dewi",
    role: "Cashier",
    rate: "5%",
    serviceRev: "Rp 0",
    productRev: "Rp 420K",
    commission: "Rp 21K",
    status: "Active",
    color: "#2563eb",
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
  sectionTitle: css`
    color: #272238 !important;
    font-size: 14px;
    font-weight: 800;
  `,
  table: css`
    .ant-table {
      font-size: 12px;
    }
  `,
  avatar: css`
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    border-radius: 8px;
    color: #fff;
    font-size: 11px;
    font-weight: 800;
  `,
}));

export default function TeamsClient() {
  const { t } = useI18n();
  const { styles } = useStyles();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (v: string, r: (typeof STAFF)[0]) => (
        <Flex align="center" gap={8}>
          <span className={styles.avatar} style={{ background: r.color }}>
            {v.charAt(0)}
          </span>
          <div>
            <Typography.Text strong>{v}</Typography.Text>
            <br />
            <Typography.Text type="secondary" style={{ fontSize: 10 }}>
              {r.role}
            </Typography.Text>
          </div>
        </Flex>
      ),
    },
    { title: "Commission Rate", dataIndex: "rate", key: "rate" },
    { title: "Service Revenue", dataIndex: "serviceRev", key: "serviceRev" },
    { title: "Product Revenue", dataIndex: "productRev", key: "productRev" },
    {
      title: "Total Commission",
      dataIndex: "commission",
      key: "commission",
      render: (v: string) => <Typography.Text strong>{v}</Typography.Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (v: string) => (
        <Tag color={v === "Active" ? "green" : "orange"}>{v}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space size={4}>
          <Button size="small" icon={<Icon type="EyeOutlined" />} />
          <Button size="small" icon={<Icon type="EditOutlined" />} />
        </Space>
      ),
    },
  ];

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
            {t("teams.title")}
          </Typography.Title>
          <Typography className={styles.subtitle}>
            {t("teams.subtitle")}
          </Typography>
        </div>
        <Button type="primary" icon={<Icon type="PlusOutlined" />}>
          {t("teams.addStaff")}
        </Button>
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

      <Card className={styles.card}>
        <Typography
          className={styles.sectionTitle}
          style={{ marginBottom: 14 }}
        >
          {t("teams.directory")}
        </Typography>
        <Tabs
          defaultActiveKey="directory"
          items={[
            {
              key: "directory",
              label: "Directory",
              children: (
                <Table
                  className={styles.table}
                  dataSource={STAFF}
                  columns={columns}
                  rowKey="name"
                  pagination={{ defaultCurrent: 1 }}
                />
              ),
            },
            {
              key: "schedule",
              label: "Schedule",
              children: (
                <Typography className={styles.subtitle}>
                  Staff scheduling view
                </Typography>
              ),
            },
            {
              key: "attendance",
              label: "Attendance",
              children: (
                <Typography className={styles.subtitle}>
                  Attendance tracking
                </Typography>
              ),
            },
            {
              key: "rules",
              label: "Commission Rules",
              children: (
                <Typography className={styles.subtitle}>
                  Configure commission tiers and rules
                </Typography>
              ),
            },
            {
              key: "report",
              label: "Commission Report",
              children: (
                <Typography className={styles.subtitle}>
                  Detailed commission breakdown
                </Typography>
              ),
            },
          ]}
        />
      </Card>
    </main>
  );
}
