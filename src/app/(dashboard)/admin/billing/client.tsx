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

type Invoice = {
  id: string;
  number: string;
  tenant: string;
  amount: string;
  status: string;
  dueDate: string;
  paidDate: string | null;
};

const INVOICES: Invoice[] = [
  {
    id: "1",
    number: "INV-2026-0847",
    tenant: "Glow Beauty Studio",
    amount: "Rp 2.500.000",
    status: "Paid",
    dueDate: "2026-08-01",
    paidDate: "2026-07-29",
  },
  {
    id: "2",
    number: "INV-2026-0846",
    tenant: "Luxe Nail Art",
    amount: "Rp 990.000",
    status: "Paid",
    dueDate: "2026-08-05",
    paidDate: "2026-08-04",
  },
  {
    id: "3",
    number: "INV-2026-0845",
    tenant: "Zen Spa & Wellness",
    amount: "Rp 2.500.000",
    status: "Pending",
    dueDate: "2026-09-05",
    paidDate: null,
  },
  {
    id: "4",
    number: "INV-2026-0844",
    tenant: "Sakura Hair Salon",
    amount: "Rp 390.000",
    status: "Paid",
    dueDate: "2026-08-10",
    paidDate: "2026-08-09",
  },
  {
    id: "5",
    number: "INV-2026-0843",
    tenant: "The Glam Room",
    amount: "Rp 0",
    status: "Pending",
    dueDate: "2026-09-01",
    paidDate: null,
  },
  {
    id: "6",
    number: "INV-2026-0842",
    tenant: "Hairchemy Studio",
    amount: "Rp 390.000",
    status: "Overdue",
    dueDate: "2026-08-15",
    paidDate: null,
  },
  {
    id: "7",
    number: "INV-2026-0841",
    tenant: "Velvet Beauty Lounge",
    amount: "Rp 2.500.000",
    status: "Paid",
    dueDate: "2026-08-08",
    paidDate: "2026-08-07",
  },
  {
    id: "8",
    number: "INV-2026-0840",
    tenant: "Beauty Bliss",
    amount: "Rp 990.000",
    status: "Pending",
    dueDate: "2026-09-18",
    paidDate: null,
  },
  {
    id: "9",
    number: "INV-2026-0839",
    tenant: "Crown Cuts Barbershop",
    amount: "Rp 390.000",
    status: "Overdue",
    dueDate: "2026-07-28",
    paidDate: null,
  },
  {
    id: "10",
    number: "INV-2026-0838",
    tenant: "Nailicious",
    amount: "Rp 0",
    status: "Pending",
    dueDate: "2026-09-12",
    paidDate: null,
  },
];

const KPIS = [
  {
    label: "Pending",
    value: "12",
    icon: "ClockCircleOutlined",
    color: "#ea580c",
    tint: "#ffedd5",
  },
  {
    label: "Overdue",
    value: "3",
    icon: "ExclamationCircleOutlined",
    color: "#dc2626",
    tint: "#fef2f2",
  },
  {
    label: "Paid This Month",
    value: "Rp 1.28B",
    icon: "CheckCircleOutlined",
    color: "#16a34a",
    tint: "#dcfce7",
  },
];

const STATUS_COLOR: Record<string, string> = {
  Paid: "success",
  Pending: "warning",
  Overdue: "error",
};

export default function BillingClient() {
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
        {t("admin.billing.title")}
      </Typography>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {KPIS.map((kpi) => (
          <Col xs={24} sm={12} lg={8} key={kpi.label}>
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
        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: 16 }}
        >
          <Typography className={styles.sectionTitle}>
            {t("admin.billing.invoices")}
          </Typography>
          <Button icon={<Icon type="DownloadOutlined" />}>
            {t("admin.billing.export")}
          </Button>
        </Flex>

        <Table
          dataSource={INVOICES}
          rowKey="id"
          pagination={{}}
          size="small"
          columns={[
            {
              title: t("admin.billing.col.invoice"),
              dataIndex: "number",
              render: (v: string) => (
                <Typography
                  style={{
                    fontWeight: 600,
                    fontSize: 13,
                    fontFamily: "monospace",
                  }}
                >
                  {v}
                </Typography>
              ),
            },
            {
              title: t("admin.billing.col.tenant"),
              dataIndex: "tenant",
              render: (v: string) => (
                <Typography style={{ fontSize: 13 }}>{v}</Typography>
              ),
            },
            {
              title: t("admin.billing.col.amount"),
              dataIndex: "amount",
              render: (v: string) => (
                <Typography style={{ fontSize: 13, fontWeight: 600 }}>
                  {v}
                </Typography>
              ),
            },
            {
              title: t("admin.billing.col.status"),
              dataIndex: "status",
              render: (v: string) => <Tag color={STATUS_COLOR[v]}>{v}</Tag>,
            },
            {
              title: t("admin.billing.col.dueDate"),
              dataIndex: "dueDate",
              render: (v: string) => (
                <Typography style={{ fontSize: 12, color: "#6b7280" }}>
                  {v}
                </Typography>
              ),
            },
            {
              title: t("admin.billing.col.paidDate"),
              dataIndex: "paidDate",
              render: (v: string | null) => (
                <Typography
                  style={{ fontSize: 12, color: v ? "#16a34a" : "#6b7280" }}
                >
                  {v ?? "—"}
                </Typography>
              ),
            },
          ]}
        />
      </Card>
    </Flex>
  );
}
