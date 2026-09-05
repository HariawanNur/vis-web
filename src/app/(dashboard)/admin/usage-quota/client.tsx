"use client";

import {
  Card,
  createStyles,
  Flex,
  Progress,
  Table,
  Tag,
  Typography,
} from "@/components";
import { useI18n } from "@/i18n";

const useStyles = createStyles({
  card: {
    border: "1px solid #ebeaf0",
    boxShadow: "0 4px 15px rgba(28,22,49,.035)",
  },
  sectionTitle: { fontSize: 14, fontWeight: 800, color: "#272238" },
});

type TenantUsage = {
  id: string;
  tenant: string;
  plan: string;
  apiCalls: { used: number; limit: number; percent: number };
  storage: { used: string; limit: string; percent: number };
  users: { used: number; limit: number; percent: number };
  status: string;
};

const TENANTS: TenantUsage[] = [
  {
    id: "1",
    tenant: "Glow Beauty Studio",
    plan: "Enterprise",
    apiCalls: { used: 145200, limit: 500000, percent: 29 },
    storage: { used: "12.4 GB", limit: "50 GB", percent: 25 },
    users: { used: 48, limit: 999, percent: 5 },
    status: "Healthy",
  },
  {
    id: "2",
    tenant: "Luxe Nail Art",
    plan: "Business",
    apiCalls: { used: 78400, limit: 100000, percent: 78 },
    storage: { used: "8.2 GB", limit: "20 GB", percent: 41 },
    users: { used: 22, limit: 25, percent: 88 },
    status: "Warning",
  },
  {
    id: "3",
    tenant: "Sakura Hair Salon",
    plan: "Pro",
    apiCalls: { used: 28900, limit: 30000, percent: 96 },
    storage: { used: "2.1 GB", limit: "5 GB", percent: 42 },
    users: { used: 8, limit: 5, percent: 160 },
    status: "Critical",
  },
  {
    id: "4",
    tenant: "The Glam Room",
    plan: "Enterprise",
    apiCalls: { used: 92100, limit: 500000, percent: 18 },
    storage: { used: "5.7 GB", limit: "50 GB", percent: 11 },
    users: { used: 35, limit: 999, percent: 4 },
    status: "Healthy",
  },
  {
    id: "5",
    tenant: "Beauty Bliss",
    plan: "Business",
    apiCalls: { used: 65300, limit: 100000, percent: 65 },
    storage: { used: "7.8 GB", limit: "20 GB", percent: 39 },
    users: { used: 15, limit: 25, percent: 60 },
    status: "Healthy",
  },
  {
    id: "6",
    tenant: "Zen Spa & Wellness",
    plan: "Enterprise",
    apiCalls: { used: 210000, limit: 500000, percent: 42 },
    storage: { used: "22.1 GB", limit: "50 GB", percent: 44 },
    users: { used: 52, limit: 999, percent: 5 },
    status: "Healthy",
  },
  {
    id: "7",
    tenant: "Nailicious",
    plan: "Business",
    apiCalls: { used: 41200, limit: 100000, percent: 41 },
    storage: { used: "3.9 GB", limit: "20 GB", percent: 20 },
    users: { used: 18, limit: 25, percent: 72 },
    status: "Healthy",
  },
  {
    id: "8",
    tenant: "Velvet Beauty Lounge",
    plan: "Enterprise",
    apiCalls: { used: 167800, limit: 500000, percent: 34 },
    storage: { used: "15.3 GB", limit: "50 GB", percent: 31 },
    users: { used: 40, limit: 999, percent: 4 },
    status: "Healthy",
  },
];

const STATUS_COLOR: Record<string, string> = {
  Healthy: "success",
  Warning: "warning",
  Critical: "error",
};

function QuotaBar({ percent }: { percent: number }) {
  const color =
    percent >= 90 ? "#dc2626" : percent >= 70 ? "#ea580c" : "#16a34a";
  return <Progress percent={percent} strokeColor={color} size="small" />;
}

export default function UsageQuotaClient() {
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
        {t("admin.usage.title")}
      </Typography>

      <Card className={styles.card} styles={{ body: { padding: 20 } }}>
        <Typography
          className={styles.sectionTitle}
          style={{ marginBottom: 16 }}
        >
          {t("admin.usage.list")}
        </Typography>

        <Table
          dataSource={TENANTS}
          rowKey="id"
          pagination={{}}
          size="small"
          columns={[
            {
              title: t("admin.usage.col.tenant"),
              dataIndex: "tenant",
              render: (v: string) => (
                <Typography style={{ fontWeight: 600, fontSize: 13 }}>
                  {v}
                </Typography>
              ),
            },
            {
              title: t("admin.usage.col.plan"),
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
              title: t("admin.usage.col.apiCalls"),
              render: (_: unknown, r: TenantUsage) => (
                <Flex vertical style={{ gap: 2 }}>
                  <Typography style={{ fontSize: 12 }}>
                    {r.apiCalls.used.toLocaleString()} /{" "}
                    {r.apiCalls.limit.toLocaleString()}
                  </Typography>
                  <QuotaBar percent={r.apiCalls.percent} />
                </Flex>
              ),
            },
            {
              title: t("admin.usage.col.storage"),
              render: (_: unknown, r: TenantUsage) => (
                <Flex vertical style={{ gap: 2 }}>
                  <Typography style={{ fontSize: 12 }}>
                    {r.storage.used} / {r.storage.limit}
                  </Typography>
                  <QuotaBar percent={r.storage.percent} />
                </Flex>
              ),
            },
            {
              title: t("admin.usage.col.users"),
              render: (_: unknown, r: TenantUsage) => (
                <Flex vertical style={{ gap: 2 }}>
                  <Typography style={{ fontSize: 12 }}>
                    {r.users.used} / {r.users.limit}
                  </Typography>
                  <QuotaBar percent={Math.min(r.users.percent, 100)} />
                </Flex>
              ),
            },
            {
              title: t("admin.usage.col.status"),
              dataIndex: "status",
              render: (v: string) => <Tag color={STATUS_COLOR[v]}>{v}</Tag>,
            },
          ]}
        />
      </Card>
    </Flex>
  );
}
