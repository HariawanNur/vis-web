"use client";

import { useState } from "react";
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

type Tenant = {
  id: string;
  name: string;
  owner: string;
  plan: string;
  users: number;
  revenue: string;
  status: string;
  created: string;
};

const TENANTS: Tenant[] = [
  {
    id: "1",
    name: "Glow Beauty Studio",
    owner: "Rina Wijaya",
    plan: "Enterprise",
    users: 48,
    revenue: "Rp 24.5M",
    status: "Active",
    created: "2024-01-15",
  },
  {
    id: "2",
    name: "Luxe Nail Art",
    owner: "Dewi Lestari",
    plan: "Business",
    users: 22,
    revenue: "Rp 12.8M",
    status: "Active",
    created: "2024-02-20",
  },
  {
    id: "3",
    name: "Sakura Hair Salon",
    owner: "Yuki Tanaka",
    plan: "Pro",
    users: 8,
    revenue: "Rp 4.2M",
    status: "Active",
    created: "2024-03-10",
  },
  {
    id: "4",
    name: "The Glam Room",
    owner: "Sari Dewi",
    plan: "Enterprise",
    users: 35,
    revenue: "Rp 18.9M",
    status: "Trial",
    created: "2024-06-01",
  },
  {
    id: "5",
    name: "Beauty Bliss",
    owner: "Maya Putri",
    plan: "Business",
    users: 15,
    revenue: "Rp 8.4M",
    status: "Active",
    created: "2024-04-18",
  },
  {
    id: "6",
    name: "Crown Cuts Barbershop",
    owner: "Budi Santoso",
    plan: "Pro",
    users: 6,
    revenue: "Rp 3.1M",
    status: "Churned",
    created: "2024-01-28",
  },
  {
    id: "7",
    name: "Zen Spa & Wellness",
    owner: "Lina Chen",
    plan: "Enterprise",
    users: 52,
    revenue: "Rp 32.1M",
    status: "Active",
    created: "2023-11-05",
  },
  {
    id: "8",
    name: "Nailicious",
    owner: "Ayu Rahmawati",
    plan: "Business",
    users: 18,
    revenue: "Rp 9.7M",
    status: "Trial",
    created: "2024-07-12",
  },
  {
    id: "9",
    name: "Hairchemy Studio",
    owner: "Rizky Pratama",
    plan: "Pro",
    users: 5,
    revenue: "Rp 2.8M",
    status: "Churned",
    created: "2024-02-25",
  },
  {
    id: "10",
    name: "Velvet Beauty Lounge",
    owner: "Nina Hartono",
    plan: "Enterprise",
    users: 40,
    revenue: "Rp 21.3M",
    status: "Active",
    created: "2024-05-08",
  },
];

const KPIS = [
  {
    label: "Total Tenants",
    value: "248",
    icon: "ShopOutlined",
    color: "#7c3aed",
    tint: "#f3e8ff",
  },
  {
    label: "Active",
    value: "231",
    icon: "CheckCircleOutlined",
    color: "#16a34a",
    tint: "#dcfce7",
  },
  {
    label: "Trial",
    value: "12",
    icon: "ClockCircleOutlined",
    color: "#ea580c",
    tint: "#ffedd5",
  },
  {
    label: "Churned",
    value: "17",
    icon: "CloseCircleOutlined",
    color: "#dc2626",
    tint: "#fef2f2",
  },
];

const STATUS_COLOR: Record<string, string> = {
  Active: "success",
  Trial: "warning",
  Churned: "error",
};

export default function TenantsClient() {
  const { t } = useI18n();
  const { styles } = useStyles();
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState<string | undefined>();
  const [statusFilter, setStatusFilter] = useState<string | undefined>();

  const filtered = TENANTS.filter((t) => {
    if (search && !t.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    if (planFilter && t.plan !== planFilter) return false;
    if (statusFilter && t.status !== statusFilter) return false;
    return true;
  });

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
        {t("admin.tenants.title")}
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
        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: 16 }}
        >
          <Typography className={styles.sectionTitle}>
            {t("admin.tenants.list")}
          </Typography>
          <Flex gap={8}>
            <Input
              placeholder={t("admin.tenants.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              prefix={<Icon type="SearchOutlined" />}
              style={{ width: 220 }}
            />
            <Select
              placeholder={t("admin.tenants.plan")}
              value={planFilter}
              onChange={setPlanFilter}
              allowClear
              style={{ width: 130 }}
              options={[
                { value: "Enterprise" },
                { value: "Business" },
                { value: "Pro" },
              ]}
            />
            <Select
              placeholder={t("admin.tenants.status")}
              value={statusFilter}
              onChange={setStatusFilter}
              allowClear
              style={{ width: 130 }}
              options={[
                { value: "Active" },
                { value: "Trial" },
                { value: "Churned" },
              ]}
            />
          </Flex>
        </Flex>

        <Table
          dataSource={filtered}
          rowKey="id"
          pagination={{}}
          size="small"
          columns={[
            {
              title: t("admin.tenants.col.name"),
              dataIndex: "name",
              render: (v: string) => (
                <Typography style={{ fontWeight: 600, fontSize: 13 }}>
                  {v}
                </Typography>
              ),
            },
            {
              title: t("admin.tenants.col.owner"),
              dataIndex: "owner",
              render: (v: string) => (
                <Typography style={{ fontSize: 13 }}>{v}</Typography>
              ),
            },
            {
              title: t("admin.tenants.col.plan"),
              dataIndex: "plan",
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
              title: t("admin.tenants.col.users"),
              dataIndex: "users",
              render: (v: number) => (
                <Typography style={{ fontSize: 13 }}>{v}</Typography>
              ),
            },
            {
              title: t("admin.tenants.col.revenue"),
              dataIndex: "revenue",
              render: (v: string) => (
                <Typography style={{ fontSize: 13, fontWeight: 600 }}>
                  {v}
                </Typography>
              ),
            },
            {
              title: t("admin.tenants.col.status"),
              dataIndex: "status",
              render: (v: string) => <Tag color={STATUS_COLOR[v]}>{v}</Tag>,
            },
            {
              title: t("admin.tenants.col.created"),
              dataIndex: "created",
              render: (v: string) => (
                <Typography style={{ fontSize: 12, color: "#6b7280" }}>
                  {v}
                </Typography>
              ),
            },
            {
              title: t("admin.tenants.col.actions"),
              render: () => (
                <Button type="link" size="small" style={{ fontSize: 12 }}>
                  {t("admin.tenants.view")}
                </Button>
              ),
            },
          ]}
        />
      </Card>
    </Flex>
  );
}
