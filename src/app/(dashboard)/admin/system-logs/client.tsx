"use client";

import { useState } from "react";
import {
  Button,
  Card,
  createStyles,
  Flex,
  Icon,
  Input,
  Select,
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
  mono: { fontFamily: "monospace", fontSize: 12 },
});

type LogEntry = {
  id: string;
  timestamp: string;
  level: string;
  source: string;
  message: string;
  user: string;
};

const LOGS: LogEntry[] = [
  {
    id: "1",
    timestamp: "2026-08-30 09:12:03",
    level: "INFO",
    source: "api-gateway",
    message: "Request completed POST /api/v1/auth/login 200 OK (45ms)",
    user: "andi@kasera.id",
  },
  {
    id: "2",
    timestamp: "2026-08-30 09:11:58",
    level: "WARN",
    source: "billing-service",
    message: "Invoice INV-2026-0839 payment overdue by 33 days",
    user: "system",
  },
  {
    id: "3",
    timestamp: "2026-08-30 09:11:45",
    level: "ERROR",
    source: "worker-queue",
    message:
      "Failed to send email notification: SMTP connection timeout after 30s",
    user: "system",
  },
  {
    id: "4",
    timestamp: "2026-08-30 09:11:30",
    level: "INFO",
    source: "tenant-service",
    message: "Tenant 'Glow Beauty Studio' subscription renewed successfully",
    user: "siti.n@kasera.id",
  },
  {
    id: "5",
    timestamp: "2026-08-30 09:10:22",
    level: "INFO",
    source: "api-gateway",
    message:
      "Request completed GET /api/v1/tenants/42/appointments 200 OK (120ms)",
    user: "dewi@a.com",
  },
  {
    id: "6",
    timestamp: "2026-08-30 09:10:15",
    level: "WARN",
    source: "usage-monitor",
    message: "Tenant 'Sakura Hair Salon' API quota at 96% - approaching limit",
    user: "system",
  },
  {
    id: "7",
    timestamp: "2026-08-30 09:09:58",
    level: "INFO",
    source: "auth-service",
    message: "Password reset requested for user fajar@k.com",
    user: "fajar@k.com",
  },
  {
    id: "8",
    timestamp: "2026-08-30 09:09:40",
    level: "ERROR",
    source: "database",
    message:
      "Connection pool exhausted: max 50 connections reached, 12 waiting",
    user: "system",
  },
  {
    id: "9",
    timestamp: "2026-08-30 09:09:12",
    level: "INFO",
    source: "scheduler",
    message: "Daily backup completed successfully. Duration: 4m 32s",
    user: "system",
  },
  {
    id: "10",
    timestamp: "2026-08-30 09:08:55",
    level: "INFO",
    source: "api-gateway",
    message: "Request completed PUT /api/v1/users/profile 200 OK (89ms)",
    user: "maya@s.com",
  },
];

const LEVEL_COLOR: Record<string, string> = {
  INFO: "processing",
  WARN: "warning",
  ERROR: "error",
};

export default function SystemLogsClient() {
  const { t } = useI18n();
  const { styles } = useStyles();
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<string | undefined>();

  const filtered = LOGS.filter((l) => {
    if (
      search &&
      !l.message.toLowerCase().includes(search.toLowerCase()) &&
      !l.source.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    if (levelFilter && l.level !== levelFilter) return false;
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
        {t("admin.logs.title")}
      </Typography>

      <Card className={styles.card} styles={{ body: { padding: 20 } }}>
        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: 16 }}
        >
          <Typography className={styles.sectionTitle}>
            {t("admin.logs.recent")}
          </Typography>
          <Flex gap={8}>
            <Input
              placeholder={t("admin.logs.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              prefix={<Icon type="SearchOutlined" />}
              style={{ width: 260 }}
            />
            <Select
              placeholder={t("admin.logs.level")}
              value={levelFilter}
              onChange={setLevelFilter}
              allowClear
              style={{ width: 120 }}
              options={[
                { value: "INFO" },
                { value: "WARN" },
                { value: "ERROR" },
              ]}
            />
            <Button icon={<Icon type="DownloadOutlined" />}>
              {t("admin.logs.export")}
            </Button>
          </Flex>
        </Flex>

        <Table
          dataSource={filtered}
          rowKey="id"
          pagination={{}}
          size="small"
          columns={[
            {
              title: t("admin.logs.col.timestamp"),
              dataIndex: "timestamp",
              width: 180,
              render: (v: string) => (
                <Typography className={styles.mono}>{v}</Typography>
              ),
            },
            {
              title: t("admin.logs.col.level"),
              dataIndex: "level",
              width: 90,
              render: (v: string) => <Tag color={LEVEL_COLOR[v]}>{v}</Tag>,
            },
            {
              title: t("admin.logs.col.source"),
              dataIndex: "source",
              width: 140,
              render: (v: string) => <Tag>{v}</Tag>,
            },
            {
              title: t("admin.logs.col.message"),
              dataIndex: "message",
              render: (v: string) => (
                <Typography
                  style={{
                    fontSize: 12,
                    color:
                      v.includes("ERROR") || v.includes("Failed")
                        ? "#dc2626"
                        : "#374151",
                  }}
                >
                  {v}
                </Typography>
              ),
            },
            {
              title: t("admin.logs.col.user"),
              dataIndex: "user",
              width: 160,
              render: (v: string) => (
                <Typography style={{ fontSize: 12, color: "#6b7280" }}>
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
