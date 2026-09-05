"use client";

import {
  Badge,
  Card,
  Col,
  createStyles,
  Flex,
  Icon,
  Row,
  Table,
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

type Service = {
  id: string;
  name: string;
  status: string;
  latency: string;
  uptime: string;
  icon: IconName;
};

const SERVICES: Service[] = [
  {
    id: "1",
    name: "API Gateway",
    status: "Operational",
    latency: "12ms",
    uptime: "99.99%",
    icon: "ApiOutlined",
  },
  {
    id: "2",
    name: "PostgreSQL Database",
    status: "Operational",
    latency: "3ms",
    uptime: "99.99%",
    icon: "DatabaseOutlined",
  },
  {
    id: "3",
    name: "Redis Cache",
    status: "Operational",
    latency: "1ms",
    uptime: "100%",
    icon: "ThunderboltOutlined",
  },
  {
    id: "4",
    name: "Message Queue (RabbitMQ)",
    status: "Operational",
    latency: "5ms",
    uptime: "99.98%",
    icon: "ClusterOutlined",
  },
  {
    id: "5",
    name: "Object Storage (S3)",
    status: "Degraded",
    latency: "245ms",
    uptime: "99.85%",
    icon: "CloudOutlined",
  },
  {
    id: "6",
    name: "CDN",
    status: "Operational",
    latency: "8ms",
    uptime: "99.99%",
    icon: "GlobalOutlined",
  },
];

const KPIS = [
  {
    label: "Uptime",
    value: "99.97%",
    icon: "CheckCircleOutlined",
    color: "#16a34a",
    tint: "#dcfce7",
  },
  {
    label: "Response Time",
    value: "45ms",
    icon: "ClockCircleOutlined",
    color: "#2563eb",
    tint: "#dbeafe",
  },
  {
    label: "Error Rate",
    value: "0.03%",
    icon: "WarningOutlined",
    color: "#ea580c",
    tint: "#ffedd5",
  },
  {
    label: "Active Connections",
    value: "1,247",
    icon: "LinkOutlined",
    color: "#7c3aed",
    tint: "#f3e8ff",
  },
];

const STATUS_DOT: Record<string, "success" | "warning" | "error"> = {
  Operational: "success",
  Degraded: "warning",
  Down: "error",
};

export default function SystemHealthClient() {
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
        {t("admin.health.title")}
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
          {t("admin.health.services")}
        </Typography>

        <Table
          dataSource={SERVICES}
          rowKey="id"
          pagination={false}
          size="small"
          columns={[
            {
              title: t("admin.health.col.service"),
              dataIndex: "name",
              render: (_: string, r: Service) => (
                <Flex align="center" gap={10}>
                  <Icon
                    type={r.icon}
                    style={{ color: "#6b7280", fontSize: 16 }}
                  />
                  <Typography style={{ fontWeight: 600, fontSize: 13 }}>
                    {r.name}
                  </Typography>
                </Flex>
              ),
            },
            {
              title: t("admin.health.col.status"),
              dataIndex: "status",
              render: (v: string) => (
                <Flex align="center" gap={6}>
                  <Badge status={STATUS_DOT[v]} />
                  <Typography
                    style={{
                      fontSize: 13,
                      color:
                        v === "Operational"
                          ? "#16a34a"
                          : v === "Degraded"
                            ? "#ea580c"
                            : "#dc2626",
                    }}
                  >
                    {v}
                  </Typography>
                </Flex>
              ),
            },
            {
              title: t("admin.health.col.latency"),
              dataIndex: "latency",
              render: (v: string) => (
                <Typography style={{ fontSize: 13, fontFamily: "monospace" }}>
                  {v}
                </Typography>
              ),
            },
            {
              title: t("admin.health.col.uptime"),
              dataIndex: "uptime",
              render: (v: string) => (
                <Typography style={{ fontSize: 13, fontWeight: 600 }}>
                  {v}
                </Typography>
              ),
            },
          ]}
        />
      </Card>
    </Flex>
  );
}
