"use client";

import { useState } from "react";
import {
  Avatar,
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

type PlatformUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  scope: string;
  status: string;
  lastLogin: string;
  avatar: string;
};

const USERS: PlatformUser[] = [
  {
    id: "1",
    name: "Andi Prasetyo",
    email: "andi@kasera.id",
    role: "PLATFORM_SUPER_ADMIN",
    scope: "Global",
    status: "Active",
    lastLogin: "2026-08-30 09:12",
    avatar: "AP",
  },
  {
    id: "2",
    name: "Siti Nurhaliza",
    email: "siti.n@kasera.id",
    role: "PLATFORM_ADMIN",
    scope: "Global",
    status: "Active",
    lastLogin: "2026-08-30 08:45",
    avatar: "SN",
  },
  {
    id: "3",
    name: "Rizky Ramadhan",
    email: "rizky.r@kasera.id",
    role: "PLATFORM_ADMIN",
    scope: "Global",
    status: "Active",
    lastLogin: "2026-08-29 17:30",
    avatar: "RR",
  },
  {
    id: "4",
    name: "Dewi Anggraini",
    email: "dewi@a.com",
    role: "TENANT_OWNER",
    scope: "Glow Beauty Studio",
    status: "Active",
    lastLogin: "2026-08-30 07:20",
    avatar: "DA",
  },
  {
    id: "5",
    name: "Budi Hartono",
    email: "budi.h@b.com",
    role: "TENANT_ADMIN",
    scope: "Luxe Nail Art",
    status: "Active",
    lastLogin: "2026-08-28 14:10",
    avatar: "BH",
  },
  {
    id: "6",
    name: "Maya Sari",
    email: "maya@s.com",
    role: "TENANT_STAFF",
    scope: "Sakura Hair Salon",
    status: "Inactive",
    lastLogin: "2026-08-15 11:05",
    avatar: "MS",
  },
  {
    id: "7",
    name: "Fajar Nugroho",
    email: "fajar@k.com",
    role: "PLATFORM_SUPPORT",
    scope: "Global",
    status: "Active",
    lastLogin: "2026-08-30 06:55",
    avatar: "FN",
  },
  {
    id: "8",
    name: "Lestari Putri",
    email: "lestari@b.com",
    role: "TENANT_OWNER",
    scope: "Beauty Bliss",
    status: "Active",
    lastLogin: "2026-08-29 20:15",
    avatar: "LP",
  },
];

const KPIS = [
  {
    label: "Total Users",
    value: "18,429",
    icon: "TeamOutlined",
    color: "#7c3aed",
    tint: "#f3e8ff",
  },
  {
    label: "Platform Admins",
    value: "12",
    icon: "SafetyOutlined",
    color: "#2563eb",
    tint: "#dbeafe",
  },
  {
    label: "Active Today",
    value: "12,847",
    icon: "UserOutlined",
    color: "#16a34a",
    tint: "#dcfce7",
  },
];

const ROLE_COLOR: Record<string, string> = {
  PLATFORM_SUPER_ADMIN: "purple",
  PLATFORM_ADMIN: "blue",
  TENANT_OWNER: "green",
  TENANT_ADMIN: "orange",
  TENANT_STAFF: "default",
  PLATFORM_SUPPORT: "cyan",
};

export default function UsersClient() {
  const { t } = useI18n();
  const { styles } = useStyles();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | undefined>();

  const filtered = USERS.filter((u) => {
    if (
      search &&
      !u.name.toLowerCase().includes(search.toLowerCase()) &&
      !u.email.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    if (roleFilter && u.role !== roleFilter) return false;
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
        {t("admin.users.title")}
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
            {t("admin.users.list")}
          </Typography>
          <Flex gap={8}>
            <Input
              placeholder={t("admin.users.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              prefix={<Icon type="SearchOutlined" />}
              style={{ width: 260 }}
            />
            <Select
              placeholder={t("admin.users.role")}
              value={roleFilter}
              onChange={setRoleFilter}
              allowClear
              style={{ width: 200 }}
              options={Object.keys(ROLE_COLOR).map((r) => ({
                value: r,
                label: r.replace(/_/g, " "),
              }))}
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
              title: t("admin.users.col.name"),
              dataIndex: "name",
              render: (_: string, r: PlatformUser) => (
                <Flex align="center" gap={8}>
                  <Avatar
                    size={28}
                    style={{ background: "#7c3aed", fontSize: 11 }}
                  >
                    {r.avatar}
                  </Avatar>
                  <Typography style={{ fontWeight: 600, fontSize: 13 }}>
                    {r.name}
                  </Typography>
                </Flex>
              ),
            },
            {
              title: t("admin.users.col.email"),
              dataIndex: "email",
              render: (v: string) => (
                <Typography style={{ fontSize: 12, color: "#6b7280" }}>
                  {v}
                </Typography>
              ),
            },
            {
              title: t("admin.users.col.role"),
              dataIndex: "role",
              render: (v: string) => (
                <Tag color={ROLE_COLOR[v]}>{v.replace(/_/g, " ")}</Tag>
              ),
            },
            {
              title: t("admin.users.col.scope"),
              dataIndex: "scope",
              render: (v: string) => (
                <Typography style={{ fontSize: 13 }}>{v}</Typography>
              ),
            },
            {
              title: t("admin.users.col.status"),
              dataIndex: "status",
              render: (v: string) => (
                <Tag color={v === "Active" ? "success" : "default"}>{v}</Tag>
              ),
            },
            {
              title: t("admin.users.col.lastLogin"),
              dataIndex: "lastLogin",
              render: (v: string) => (
                <Typography style={{ fontSize: 12, color: "#6b7280" }}>
                  {v}
                </Typography>
              ),
            },
            {
              title: t("admin.users.col.actions"),
              render: () => (
                <Button type="link" size="small" style={{ fontSize: 12 }}>
                  {t("admin.users.manage")}
                </Button>
              ),
            },
          ]}
        />
      </Card>
    </Flex>
  );
}
