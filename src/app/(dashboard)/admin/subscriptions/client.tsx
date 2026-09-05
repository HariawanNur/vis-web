"use client";

import {
  Button,
  Card,
  Col,
  createStyles,
  Flex,
  Icon,
  Row,
  Table,
  Tag,
  Typography,
  type IconName,
} from "@/components";
import { useI18n } from "@/i18n";

const useStyles = createStyles({
  kpiIcon: {
    width: 42,
    height: 42,
    display: "grid",
    placeItems: "center",
    borderRadius: 12,
  },
  card: {
    border: "1px solid #ebeaf0",
    boxShadow: "0 4px 15px rgba(28,22,49,.035)",
  },
  sectionTitle: { fontSize: 14, fontWeight: 800, color: "#272238" },
});

type Subscription = {
  id: string;
  tenant: string;
  package: string;
  status: string;
  startDate: string;
  nextBilling: string;
  amount: string;
};

const SUBSCRIPTIONS: Subscription[] = [
  {
    id: "1",
    tenant: "Glow Beauty Studio",
    package: "Enterprise",
    status: "Active",
    startDate: "2024-01-15",
    nextBilling: "2026-09-15",
    amount: "Rp 2.500.000",
  },
  {
    id: "2",
    tenant: "Luxe Nail Art",
    package: "Business",
    status: "Active",
    startDate: "2024-02-20",
    nextBilling: "2026-09-20",
    amount: "Rp 990.000",
  },
  {
    id: "3",
    tenant: "Sakura Hair Salon",
    package: "Pro",
    status: "Active",
    startDate: "2024-03-10",
    nextBilling: "2026-09-10",
    amount: "Rp 390.000",
  },
  {
    id: "4",
    tenant: "The Glam Room",
    package: "Enterprise",
    status: "Trial",
    startDate: "2026-06-01",
    nextBilling: "2026-09-01",
    amount: "Rp 0",
  },
  {
    id: "5",
    tenant: "Beauty Bliss",
    package: "Business",
    status: "Active",
    startDate: "2024-04-18",
    nextBilling: "2026-09-18",
    amount: "Rp 990.000",
  },
  {
    id: "6",
    tenant: "Zen Spa & Wellness",
    package: "Enterprise",
    status: "Active",
    startDate: "2023-11-05",
    nextBilling: "2026-09-05",
    amount: "Rp 2.500.000",
  },
  {
    id: "7",
    tenant: "Nailicious",
    package: "Business",
    status: "Trial",
    startDate: "2026-07-12",
    nextBilling: "2026-09-12",
    amount: "Rp 0",
  },
  {
    id: "8",
    tenant: "Velvet Beauty Lounge",
    package: "Enterprise",
    status: "Active",
    startDate: "2024-05-08",
    nextBilling: "2026-09-08",
    amount: "Rp 2.500.000",
  },
  {
    id: "9",
    tenant: "Crown Cuts Barbershop",
    package: "Pro",
    status: "Cancelled",
    startDate: "2024-01-28",
    nextBilling: "—",
    amount: "Rp 390.000",
  },
];

const KPIS = [
  {
    label: "Active",
    value: "231",
    icon: "CheckCircleOutlined",
    color: "#16a34a",
    tint: "#dcfce7",
  },
  {
    label: "Revenue",
    value: "Rp 1.28B",
    icon: "DollarOutlined",
    color: "#7c3aed",
    tint: "#f3e8ff",
  },
  {
    label: "MRR",
    value: "Rp 142M",
    icon: "RiseOutlined",
    color: "#2563eb",
    tint: "#dbeafe",
  },
  {
    label: "Churn Rate",
    value: "3.2%",
    icon: "FallOutlined",
    color: "#ea580c",
    tint: "#ffedd5",
  },
];

const STATUS_COLOR: Record<string, string> = {
  Active: "success",
  Trial: "warning",
  Cancelled: "error",
};

export default function SubscriptionsClient() {
  const { t } = useI18n();
  const { styles } = useStyles();

  return (
    <Flex
      vertical={true}
      style={{
        maxWidth: 1600,
        margin: "0 auto",
      }}
    >
      <Typography
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: "#272238",
          marginBottom: 24,
        }}
      >
        {t("admin.subscriptions.title")}
      </Typography>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {KPIS.map((kpi) => (
          <Col xs={24} sm={12} lg={6} key={kpi.label}>
            <Card className={styles.card} styles={{ body: { padding: 20 } }}>
              <Flex align="center" gap={14}>
                <div
                  className={styles.kpiIcon}
                  style={{ background: kpi.tint }}
                >
                  <Icon
                    type={kpi.icon as IconName}
                    style={{ color: kpi.color, fontSize: 20 }}
                  />
                </div>
                <div>
                  <Typography style={{ fontSize: 12, color: "#6b7280" }}>
                    {kpi.label}
                  </Typography>
                  <Typography
                    style={{ fontSize: 22, fontWeight: 800, color: "#272238" }}
                  >
                    {kpi.value}
                  </Typography>
                </div>
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className={styles.card} styles={{ body: { padding: 20 } }}>
        <Typography
          className={styles.sectionTitle}
          style={{ marginBottom: 16 }}
        >
          {t("admin.subscriptions.list")}
        </Typography>

        <Table
          dataSource={SUBSCRIPTIONS}
          rowKey="id"
          pagination={{}}
          size="small"
          columns={[
            {
              title: t("admin.subscriptions.col.tenant"),
              dataIndex: "tenant",
              render: (v: string) => (
                <Typography style={{ fontWeight: 600, fontSize: 13 }}>
                  {v}
                </Typography>
              ),
            },
            {
              title: t("admin.subscriptions.col.package"),
              dataIndex: "package",
              render: (v: string) => (
                <Tag
                  color={
                    v === "Enterprise"
                      ? "purple"
                      : v === "Business"
                        ? "blue"
                        : "default"
                  }
                >
                  {v}
                </Tag>
              ),
            },
            {
              title: t("admin.subscriptions.col.status"),
              dataIndex: "status",
              render: (v: string) => <Tag color={STATUS_COLOR[v]}>{v}</Tag>,
            },
            {
              title: t("admin.subscriptions.col.startDate"),
              dataIndex: "startDate",
              render: (v: string) => (
                <Typography style={{ fontSize: 12, color: "#6b7280" }}>
                  {v}
                </Typography>
              ),
            },
            {
              title: t("admin.subscriptions.col.nextBilling"),
              dataIndex: "nextBilling",
              render: (v: string) => (
                <Typography style={{ fontSize: 12, color: "#6b7280" }}>
                  {v}
                </Typography>
              ),
            },
            {
              title: t("admin.subscriptions.col.amount"),
              dataIndex: "amount",
              render: (v: string) => (
                <Typography style={{ fontSize: 13, fontWeight: 600 }}>
                  {v}
                </Typography>
              ),
            },
            {
              title: t("admin.subscriptions.col.actions"),
              render: () => (
                <Button type="link" size="small" style={{ fontSize: 12 }}>
                  {t("admin.subscriptions.manage")}
                </Button>
              ),
            },
          ]}
        />
      </Card>
    </Flex>
  );
}
