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
    labelKey: "sales.kpi.today",
    value: "Rp 12.88M",
    icon: "DollarOutlined",
    color: "#7c3aed",
    tint: "#f3e8ff",
  },
  {
    labelKey: "sales.kpi.pos",
    value: "Rp 8.45M",
    icon: "ShopOutlined",
    color: "#2563eb",
    tint: "#dbeafe",
  },
  {
    labelKey: "sales.kpi.online",
    value: "Rp 3.28M",
    icon: "ShoppingOutlined",
    color: "#16a34a",
    tint: "#dcfce7",
  },
  {
    labelKey: "sales.kpi.whatsapp",
    value: "Rp 1.15M",
    icon: "MessageOutlined",
    color: "#ea580c",
    tint: "#ffedd5",
  },
];

const ORDERS = [
  {
    id: "ORD-501",
    channel: "POS",
    customer: "Maya Putri",
    items: "Hair Coloring, Shampoo",
    amount: "Rp 850.000",
    status: "Completed",
    statusColor: "green",
    date: "Aug 30, 14:23",
  },
  {
    id: "ORD-502",
    channel: "Online",
    customer: "Rina Sulastri",
    items: "Hair Treatment Serum x2",
    amount: "Rp 730.000",
    status: "Processing",
    statusColor: "blue",
    date: "Aug 30, 13:15",
  },
  {
    id: "ORD-503",
    channel: "POS",
    customer: "Dewi Lestari",
    items: "Hair Spa, Serum",
    amount: "Rp 620.000",
    status: "Completed",
    statusColor: "green",
    date: "Aug 30, 12:45",
  },
  {
    id: "ORD-504",
    channel: "WhatsApp",
    customer: "Sari Dewi",
    items: "Kerastase Shampoo",
    amount: "Rp 385.000",
    status: "Shipped",
    statusColor: "purple",
    date: "Aug 30, 11:30",
  },
  {
    id: "ORD-505",
    channel: "Online",
    customer: "Lina Marlena",
    items: "Nail Polish Set, Hand Cream",
    amount: "Rp 245.000",
    status: "Delivered",
    statusColor: "green",
    date: "Aug 30, 10:20",
  },
  {
    id: "ORD-506",
    channel: "POS",
    customer: "Putri Ayu",
    items: "Body Massage Oil",
    amount: "Rp 195.000",
    status: "Completed",
    statusColor: "green",
    date: "Aug 30, 09:45",
  },
  {
    id: "ORD-507",
    channel: "WhatsApp",
    customer: "Anisa Rahma",
    items: "Moroccanoil Serum",
    amount: "Rp 365.000",
    status: "Pending",
    statusColor: "orange",
    date: "Aug 29, 16:30",
  },
  {
    id: "ORD-508",
    channel: "POS",
    customer: "Bunga Citra",
    items: "Facial Treatment Kit",
    amount: "Rp 420.000",
    status: "Completed",
    statusColor: "green",
    date: "Aug 29, 15:10",
  },
  {
    id: "ORD-509",
    channel: "Online",
    customer: "Dian Purnama",
    items: "Wella Hair Color x3",
    amount: "Rp 555.000",
    status: "Cancelled",
    statusColor: "red",
    date: "Aug 29, 14:00",
  },
  {
    id: "ORD-510",
    channel: "POS",
    customer: "Eka Fitri",
    items: "Hair Mask Keratin",
    amount: "Rp 295.000",
    status: "Completed",
    statusColor: "green",
    date: "Aug 29, 12:20",
  },
];

const channelColors: Record<string, string> = {
  POS: "#7c3aed",
  Online: "#2563eb",
  WhatsApp: "#16a34a",
};

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

export default function SalesClient() {
  const { t } = useI18n();
  const { styles } = useStyles();

  const columns = [
    {
      title: "Order #",
      dataIndex: "id",
      key: "id",
      render: (v: string) => <Typography.Text strong>{v}</Typography.Text>,
    },
    {
      title: "Channel",
      dataIndex: "channel",
      key: "channel",
      render: (v: string) => (
        <Tag color={channelColors[v] || "default"}>{v}</Tag>
      ),
    },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Items", dataIndex: "items", key: "items" },
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
      render: (v: string, r: (typeof ORDERS)[0]) => (
        <Tag color={r.statusColor}>{v}</Tag>
      ),
    },
    { title: "Date", dataIndex: "date", key: "date" },
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
            {t("sales.title")}
          </Typography.Title>
          <Typography className={styles.subtitle}>
            {t("sales.subtitle")}
          </Typography>
        </div>
        <Button type="primary" icon={<Icon type="DownloadOutlined" />}>
          {t("sales.export")}
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
          {t("sales.orders")}
        </Typography>
        <Tabs
          defaultActiveKey="all"
          items={[
            {
              key: "all",
              label: "All Orders",
              children: (
                <Table
                  className={styles.table}
                  dataSource={ORDERS}
                  columns={columns}
                  rowKey="id"
                  pagination={{ defaultCurrent: 1 }}
                />
              ),
            },
            {
              key: "pos",
              label: "POS Orders",
              children: (
                <Table
                  className={styles.table}
                  dataSource={ORDERS.filter((o) => o.channel === "POS")}
                  columns={columns}
                  rowKey="id"
                />
              ),
            },
            {
              key: "online",
              label: "Online Orders",
              children: (
                <Table
                  className={styles.table}
                  dataSource={ORDERS.filter((o) => o.channel === "Online")}
                  columns={columns}
                  rowKey="id"
                />
              ),
            },
            {
              key: "refunds",
              label: "Refunds",
              children: (
                <div
                  style={{ padding: 24, textAlign: "center", color: "#9793a0" }}
                >
                  No refunds
                </div>
              ),
            },
            {
              key: "payments",
              label: "Payments",
              children: (
                <div
                  style={{ padding: 24, textAlign: "center", color: "#9793a0" }}
                >
                  Payment details
                </div>
              ),
            },
          ]}
        />
      </Card>
    </main>
  );
}
