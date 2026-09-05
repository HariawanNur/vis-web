"use client";

import {
  Button,
  Card,
  createStyles,
  Flex,
  Icon,
  Input,
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
    labelKey: "customers.kpi.total",
    value: "1,248",
    icon: "TeamOutlined",
    color: "#7c3aed",
    tint: "#f3e8ff",
  },
  {
    labelKey: "customers.kpi.active",
    value: "892",
    icon: "UserOutlined",
    color: "#16a34a",
    tint: "#dcfce7",
  },
  {
    labelKey: "customers.kpi.newMonth",
    value: "64",
    icon: "UserAddOutlined",
    color: "#2563eb",
    tint: "#dbeafe",
  },
  {
    labelKey: "customers.kpi.atRisk",
    value: "23",
    icon: "WarningOutlined",
    color: "#ea580c",
    tint: "#ffedd5",
  },
];

const CUSTOMERS = [
  {
    name: "Maya Putri",
    phone: "0812-3456-7890",
    email: "maya.p@email.com",
    visits: 24,
    lastVisit: "Aug 30, 2026",
    membership: "Gold",
    ltv: "Rp 8.2M",
    color: "#7c3aed",
  },
  {
    name: "Rina Sulastri",
    phone: "0813-4567-8901",
    email: "rina.s@email.com",
    visits: 18,
    lastVisit: "Aug 28, 2026",
    membership: "Silver",
    ltv: "Rp 5.4M",
    color: "#2563eb",
  },
  {
    name: "Dewi Lestari",
    phone: "0815-5678-9012",
    email: "dewi.l@email.com",
    visits: 32,
    lastVisit: "Aug 30, 2026",
    membership: "Platinum",
    ltv: "Rp 12.1M",
    color: "#db2777",
  },
  {
    name: "Sari Dewi",
    phone: "0816-6789-0123",
    email: "sari.d@email.com",
    visits: 8,
    lastVisit: "Aug 20, 2026",
    membership: "Basic",
    ltv: "Rp 1.8M",
    color: "#16a34a",
  },
  {
    name: "Lina Marlena",
    phone: "0817-7890-1234",
    email: "lina.m@email.com",
    visits: 15,
    lastVisit: "Aug 25, 2026",
    membership: "Gold",
    ltv: "Rp 6.7M",
    color: "#ea580c",
  },
  {
    name: "Putri Ayu",
    phone: "0818-8901-2345",
    email: "putri.a@email.com",
    visits: 6,
    lastVisit: "Aug 15, 2026",
    membership: "Basic",
    ltv: "Rp 1.2M",
    color: "#0891b2",
  },
  {
    name: "Anisa Rahma",
    phone: "0819-9012-3456",
    email: "anisa.r@email.com",
    visits: 21,
    lastVisit: "Aug 29, 2026",
    membership: "Gold",
    ltv: "Rp 7.5M",
    color: "#7c3aed",
  },
  {
    name: "Bunga Citra",
    phone: "0821-0123-4567",
    email: "bunga.c@email.com",
    visits: 12,
    lastVisit: "Aug 22, 2026",
    membership: "Silver",
    ltv: "Rp 3.9M",
    color: "#2563eb",
  },
  {
    name: "Dian Purnama",
    phone: "0822-1234-5678",
    email: "dian.p@email.com",
    visits: 3,
    lastVisit: "Aug 10, 2026",
    membership: "Basic",
    ltv: "Rp 850K",
    color: "#ea580c",
  },
  {
    name: "Eka Fitri",
    phone: "0823-2345-6789",
    email: "eka.f@email.com",
    visits: 9,
    lastVisit: "Aug 18, 2026",
    membership: "Silver",
    ltv: "Rp 2.6M",
    color: "#16a34a",
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

export default function CustomersClient() {
  const { t } = useI18n();
  const { styles } = useStyles();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (v: string, r: (typeof CUSTOMERS)[0]) => (
        <Flex align="center" gap={8}>
          <span className={styles.avatar} style={{ background: r.color }}>
            {v.charAt(0)}
          </span>
          <div>
            <Typography.Text strong>{v}</Typography.Text>
            <br />
            <Typography.Text type="secondary" style={{ fontSize: 10 }}>
              {r.email}
            </Typography.Text>
          </div>
        </Flex>
      ),
    },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Visits",
      dataIndex: "visits",
      key: "visits",
      render: (v: number) => <Typography.Text strong>{v}</Typography.Text>,
    },
    { title: "Last Visit", dataIndex: "lastVisit", key: "lastVisit" },
    {
      title: "Membership",
      dataIndex: "membership",
      key: "membership",
      render: (v: string) => (
        <Tag
          color={
            v === "Platinum"
              ? "purple"
              : v === "Gold"
                ? "gold"
                : v === "Silver"
                  ? "default"
                  : "blue"
          }
        >
          {v}
        </Tag>
      ),
    },
    {
      title: "LTV",
      dataIndex: "ltv",
      key: "ltv",
      render: (v: string) => <Typography.Text strong>{v}</Typography.Text>,
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
            {t("customers.title")}
          </Typography.Title>
          <Typography className={styles.subtitle}>
            {t("customers.subtitle")}
          </Typography>
        </div>
        <Space>
          <Input
            prefix={<Icon type="SearchOutlined" />}
            placeholder="Search customers..."
            style={{ width: 260 }}
          />
          <Button type="primary" icon={<Icon type="PlusOutlined" />}>
            {t("customers.addNew")}
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
          {t("customers.database")}
        </Typography>
        <Tabs
          defaultActiveKey="all"
          items={[
            {
              key: "all",
              label: "All Customers",
              children: (
                <Table
                  className={styles.table}
                  dataSource={CUSTOMERS}
                  columns={columns}
                  rowKey="email"
                  pagination={{ defaultCurrent: 1 }}
                />
              ),
            },
            {
              key: "segments",
              label: "Segments",
              children: (
                <Typography className={styles.subtitle}>
                  Customer segments management
                </Typography>
              ),
            },
            {
              key: "memberships",
              label: "Memberships",
              children: (
                <Typography className={styles.subtitle}>
                  Membership tiers: Basic, Silver, Gold, Platinum
                </Typography>
              ),
            },
            {
              key: "loyalty",
              label: "Loyalty Points",
              children: (
                <Typography className={styles.subtitle}>
                  Loyalty points tracking
                </Typography>
              ),
            },
          ]}
        />
      </Card>
    </main>
  );
}
