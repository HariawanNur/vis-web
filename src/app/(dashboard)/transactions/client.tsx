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
    labelKey: "transactions.kpi.todaySales",
    value: "Rp 8.45M",
    icon: "WalletOutlined",
    color: "#7c3aed",
    tint: "#f3e8ff",
  },
  {
    labelKey: "transactions.kpi.transactions",
    value: "42",
    icon: "TransactionOutlined",
    color: "#2563eb",
    tint: "#dbeafe",
  },
  {
    labelKey: "transactions.kpi.average",
    value: "Rp 201K",
    icon: "BarChartOutlined",
    color: "#16a34a",
    tint: "#dcfce7",
  },
  {
    labelKey: "transactions.kpi.refunds",
    value: "1",
    icon: "RollbackOutlined",
    color: "#ea580c",
    tint: "#ffedd5",
  },
];

const TRANSACTIONS = [
  {
    id: "TXN-2801",
    date: "2026-08-30 14:23",
    customer: "Maya Putri",
    items: "Hair Coloring, Shampoo",
    method: "Cash",
    amount: "Rp 850.000",
    status: "Paid",
    statusColor: "green",
  },
  {
    id: "TXN-2802",
    date: "2026-08-30 13:45",
    customer: "Rina Sulastri",
    items: "Facial Treatment",
    method: "QRIS",
    amount: "Rp 450.000",
    status: "Paid",
    statusColor: "green",
  },
  {
    id: "TXN-2803",
    date: "2026-08-30 13:10",
    customer: "Dewi Lestari",
    items: "Hair Spa, Serum",
    method: "Debit Card",
    amount: "Rp 620.000",
    status: "Paid",
    statusColor: "green",
  },
  {
    id: "TXN-2804",
    date: "2026-08-30 12:30",
    customer: "Sari Dewi",
    items: "Manicure & Pedicure",
    method: "Cash",
    amount: "Rp 280.000",
    status: "Paid",
    statusColor: "green",
  },
  {
    id: "TXN-2805",
    date: "2026-08-30 11:55",
    customer: "Lina Marlena",
    items: "Hair Cut, Hair Spa",
    method: "Transfer",
    amount: "Rp 530.000",
    status: "Paid",
    statusColor: "green",
  },
  {
    id: "TXN-2806",
    date: "2026-08-30 11:20",
    customer: "Putri Ayu",
    items: "Body Massage",
    method: "QRIS",
    amount: "Rp 380.000",
    status: "Refunded",
    statusColor: "red",
  },
  {
    id: "TXN-2807",
    date: "2026-08-30 10:45",
    customer: "Anisa Rahma",
    items: "Hair Treatment",
    method: "Cash",
    amount: "Rp 420.000",
    status: "Paid",
    statusColor: "green",
  },
  {
    id: "TXN-2808",
    date: "2026-08-30 10:10",
    customer: "Bunga Citra",
    items: "Facial, Serum",
    method: "Debit Card",
    amount: "Rp 560.000",
    status: "Paid",
    statusColor: "green",
  },
  {
    id: "TXN-2809",
    date: "2026-08-30 09:30",
    customer: "Dian Purnama",
    items: "Hair Coloring",
    method: "Transfer",
    amount: "Rp 950.000",
    status: "Pending",
    statusColor: "orange",
  },
  {
    id: "TXN-2810",
    date: "2026-08-30 09:00",
    customer: "Eka Fitri",
    items: "Nail Art",
    method: "Cash",
    amount: "Rp 180.000",
    status: "Paid",
    statusColor: "green",
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
}));

export default function TransactionsClient() {
  const { t } = useI18n();
  const { styles } = useStyles();

  const columns = [
    {
      title: "Transaction #",
      dataIndex: "id",
      key: "id",
      render: (v: string) => <Typography.Text strong>{v}</Typography.Text>,
    },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Items", dataIndex: "items", key: "items" },
    {
      title: "Payment",
      dataIndex: "method",
      key: "method",
      render: (v: string) => <Tag>{v}</Tag>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (v: string) => <Typography.Text strong>{v}</Typography.Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (v: string, r: (typeof TRANSACTIONS)[0]) => (
        <Tag color={r.statusColor}>{v}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space size={4}>
          <Button size="small" icon={<Icon type="EyeOutlined" />} />
          <Button size="small" icon={<Icon type="PrinterOutlined" />} />
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
            {t("transactions.title")}
          </Typography.Title>
          <Typography className={styles.subtitle}>
            {t("transactions.subtitle")}
          </Typography>
        </div>
        <Button type="primary" icon={<Icon type="PlusOutlined" />}>
          {t("transactions.newTransaction")}
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
          {t("transactions.history")}
        </Typography>
        <Tabs
          defaultActiveKey="all"
          items={[
            {
              key: "all",
              label: "All",
              children: (
                <Table
                  className={styles.table}
                  dataSource={TRANSACTIONS}
                  columns={columns}
                  rowKey="id"
                  pagination={{ defaultCurrent: 1 }}
                />
              ),
            },
            {
              key: "pos",
              label: "POS",
              children: (
                <Table
                  className={styles.table}
                  dataSource={TRANSACTIONS.filter(
                    (t) => t.method !== "Transfer",
                  )}
                  columns={columns}
                  rowKey="id"
                />
              ),
            },
            {
              key: "online",
              label: "Online Store",
              children: (
                <div
                  style={{ padding: 24, textAlign: "center", color: "#9793a0" }}
                >
                  No online orders
                </div>
              ),
            },
            {
              key: "whatsapp",
              label: "WhatsApp",
              children: (
                <div
                  style={{ padding: 24, textAlign: "center", color: "#9793a0" }}
                >
                  No WhatsApp orders
                </div>
              ),
            },
          ]}
        />
      </Card>
    </main>
  );
}
