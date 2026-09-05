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

type AuditEntry = {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  ip: string;
  details: string;
};

const AUDIT_LOGS: AuditEntry[] = [
  {
    id: "1",
    timestamp: "2026-08-30 09:12:03",
    user: "andi@kasera.id",
    action: "USER_LOGIN",
    resource: "Auth",
    ip: "103.28.14.55",
    details: "Successful login via email/password",
  },
  {
    id: "2",
    timestamp: "2026-08-30 09:10:22",
    user: "siti.n@kasera.id",
    action: "SUBSCRIPTION_RENEW",
    resource: "Glow Beauty Studio",
    ip: "103.28.14.60",
    details: "Enterprise plan renewed for 12 months",
  },
  {
    id: "3",
    timestamp: "2026-08-30 09:08:15",
    user: "rizky.r@kasera.id",
    action: "PACKAGE_UPDATE",
    resource: "Business Package",
    ip: "103.28.14.72",
    details: "Price updated from Rp 890K to Rp 990K",
  },
  {
    id: "4",
    timestamp: "2026-08-30 08:55:40",
    user: "andi@kasera.id",
    action: "TENANT_CREATE",
    resource: "New Salon Demo",
    ip: "103.28.14.55",
    details: "New tenant created with Pro plan",
  },
  {
    id: "5",
    timestamp: "2026-08-30 08:42:18",
    user: "fajar@k.com",
    action: "USER_DEACTIVATE",
    resource: "crown@example.com",
    ip: "103.28.14.88",
    details: "User account deactivated by support",
  },
  {
    id: "6",
    timestamp: "2026-08-30 08:30:05",
    user: "system",
    action: "BACKUP_COMPLETE",
    resource: "System",
    ip: "—",
    details: "Automated daily backup completed",
  },
  {
    id: "7",
    timestamp: "2026-08-30 08:15:33",
    user: "siti.n@kasera.id",
    action: "ROLE_ASSIGN",
    resource: "rizky.r@kasera.id",
    ip: "103.28.14.60",
    details: "Role changed from PLATFORM_SUPPORT to PLATFORM_ADMIN",
  },
  {
    id: "8",
    timestamp: "2026-08-30 07:58:12",
    user: "andi@kasera.id",
    action: "SETTINGS_UPDATE",
    resource: "Platform Settings",
    ip: "103.28.14.55",
    details: "SMTP configuration updated",
  },
  {
    id: "9",
    timestamp: "2026-08-30 07:45:00",
    user: "system",
    action: "QUOTA_ALERT",
    resource: "Sakura Hair Salon",
    ip: "—",
    details: "API quota exceeded 90% threshold",
  },
  {
    id: "10",
    timestamp: "2026-08-30 07:30:22",
    user: "fajar@k.com",
    action: "TENANT_SUSPEND",
    resource: "Hairchemy Studio",
    ip: "103.28.14.88",
    details: "Suspended due to overdue payment (33 days)",
  },
];

const ACTION_COLOR: Record<string, string> = {
  USER_LOGIN: "blue",
  SUBSCRIPTION_RENEW: "green",
  PACKAGE_UPDATE: "purple",
  TENANT_CREATE: "cyan",
  USER_DEACTIVATE: "orange",
  BACKUP_COMPLETE: "default",
  ROLE_ASSIGN: "geekblue",
  SETTINGS_UPDATE: "gold",
  QUOTA_ALERT: "warning",
  TENANT_SUSPEND: "red",
};

export default function AuditLogsClient() {
  const { t } = useI18n();
  const { styles } = useStyles();
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState<string | undefined>();

  const filtered = AUDIT_LOGS.filter((l) => {
    if (
      search &&
      !l.user.toLowerCase().includes(search.toLowerCase()) &&
      !l.resource.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    if (actionFilter && l.action !== actionFilter) return false;
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
        {t("admin.audit.title")}
      </Typography>

      <Card className={styles.card} styles={{ body: { padding: 20 } }}>
        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: 16 }}
        >
          <Typography className={styles.sectionTitle}>
            {t("admin.audit.recent")}
          </Typography>
          <Flex gap={8}>
            <Input
              type="text"
              placeholder="Date range"
              style={{ width: 200 }}
            />
            <Input
              placeholder={t("admin.audit.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              prefix={<Icon type="SearchOutlined" />}
              style={{ width: 220 }}
            />
            <Select
              placeholder={t("admin.audit.action")}
              value={actionFilter}
              onChange={setActionFilter}
              allowClear
              style={{ width: 180 }}
              options={Object.keys(ACTION_COLOR).map((a) => ({
                value: a,
                label: a.replace(/_/g, " "),
              }))}
            />
            <Button icon={<Icon type="DownloadOutlined" />}>
              {t("admin.audit.export")}
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
              title: t("admin.audit.col.timestamp"),
              dataIndex: "timestamp",
              width: 180,
              render: (v: string) => (
                <Typography className={styles.mono}>{v}</Typography>
              ),
            },
            {
              title: t("admin.audit.col.user"),
              dataIndex: "user",
              width: 180,
              render: (v: string) => (
                <Typography style={{ fontSize: 12, fontWeight: 600 }}>
                  {v}
                </Typography>
              ),
            },
            {
              title: t("admin.audit.col.action"),
              dataIndex: "action",
              width: 180,
              render: (v: string) => (
                <Tag color={ACTION_COLOR[v]}>{v.replace(/_/g, " ")}</Tag>
              ),
            },
            {
              title: t("admin.audit.col.resource"),
              dataIndex: "resource",
              render: (v: string) => (
                <Typography style={{ fontSize: 13 }}>{v}</Typography>
              ),
            },
            {
              title: t("admin.audit.col.ip"),
              dataIndex: "ip",
              width: 130,
              render: (v: string) => (
                <Typography className={styles.mono}>{v}</Typography>
              ),
            },
            {
              title: t("admin.audit.col.details"),
              dataIndex: "details",
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
