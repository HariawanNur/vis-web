"use client";

import {
  Button,
  Card,
  createStyles,
  Flex,
  Icon,
  Progress,
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
    labelKey: "outlets.kpi.total",
    value: "3",
    icon: "ShopOutlined",
    color: "#7c3aed",
    tint: "#f3e8ff",
  },
  {
    labelKey: "outlets.kpi.active",
    value: "3",
    icon: "CheckCircleOutlined",
    color: "#16a34a",
    tint: "#dcfce7",
  },
  {
    labelKey: "outlets.kpi.staff",
    value: "24",
    icon: "TeamOutlined",
    color: "#2563eb",
    tint: "#dbeafe",
  },
  {
    labelKey: "outlets.kpi.revenue",
    value: "Rp 45.6M",
    icon: "DollarOutlined",
    color: "#ea580c",
    tint: "#ffedd5",
  },
];

const OUTLETS = [
  {
    name: "Salon Cantik - Jakarta Selatan",
    address: "Jl. Kemang Raya No. 88, Jakarta Selatan",
    manager: "Sarah Wijaya",
    staff: 10,
    revenue: "Rp 18.2M",
    status: "Active",
    statusColor: "green",
    utilization: 87,
    color: "#7c3aed",
  },
  {
    name: "Salon Cantik - Jakarta Pusat",
    address: "Jl. MH Thamrin No. 45, Jakarta Pusat",
    manager: "Maya Salma",
    staff: 8,
    revenue: "Rp 15.4M",
    status: "Active",
    statusColor: "green",
    utilization: 79,
    color: "#2563eb",
  },
  {
    name: "Salon Cantik - Bandung",
    address: "Jl. Dago No. 112, Bandung",
    manager: "Rina Marsela",
    staff: 6,
    revenue: "Rp 12.0M",
    status: "Active",
    statusColor: "green",
    utilization: 72,
    color: "#16a34a",
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
  outletCard: css`
    border: 1px solid #ebeaf0;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
    transition: 0.2s ease;
    &:hover {
      box-shadow: 0 4px 12px rgba(28, 22, 49, 0.06);
    }
  `,
  outletIcon: css`
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    border-radius: 12px;
    color: #fff;
    font-size: 14px;
    font-weight: 800;
  `,
  outletName: css`
    color: #272238 !important;
    font-size: 13px;
    font-weight: 700;
  `,
  outletAddr: css`
    color: #9793a0 !important;
    font-size: 10px;
  `,
  outletMeta: css`
    color: #858190 !important;
    font-size: 10px;
    margin-top: 8px;
  `,
}));

export default function OutletsClient() {
  const { t } = useI18n();
  const { styles } = useStyles();

  const columns = [
    {
      title: "Outlet",
      dataIndex: "name",
      key: "name",
      render: (v: string) => <Typography.Text strong>{v}</Typography.Text>,
    },
    { title: "Location", dataIndex: "address", key: "address" },
    { title: "Manager", dataIndex: "manager", key: "manager" },
    {
      title: "Staff",
      dataIndex: "staff",
      key: "staff",
      render: (v: number) => <Typography.Text strong>{v}</Typography.Text>,
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      render: (v: string) => <Typography.Text strong>{v}</Typography.Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (v: string, r: (typeof OUTLETS)[0]) => (
        <Tag color={r.statusColor}>{v}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space size={4}>
          <Button size="small" icon={<Icon type="EyeOutlined" />} />
          <Button size="small" icon={<Icon type="EditOutlined" />} />
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
            {t("outlets.title")}
          </Typography.Title>
          <Typography className={styles.subtitle}>
            {t("outlets.subtitle")}
          </Typography>
        </div>
        <Button type="primary" icon={<Icon type="PlusOutlined" />}>
          {t("outlets.addOutlet")}
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
        <Tabs
          defaultActiveKey="overview"
          items={[
            {
              key: "overview",
              label: "Overview",
              children: (
                <div>
                  {OUTLETS.map((o) => (
                    <div key={o.name} className={styles.outletCard}>
                      <Flex justify="space-between" align="start">
                        <Flex gap={12} align="start">
                          <div
                            className={styles.outletIcon}
                            style={{ background: o.color }}
                          >
                            {o.name.charAt(0)}
                          </div>
                          <div>
                            <Typography className={styles.outletName}>
                              {o.name}
                            </Typography>
                            <Typography className={styles.outletAddr}>
                              {o.address}
                            </Typography>
                            <Typography className={styles.outletMeta}>
                              Manager: {o.manager} | Staff: {o.staff}
                            </Typography>
                          </div>
                        </Flex>
                        <div style={{ textAlign: "right" }}>
                          <Typography className={styles.outletName}>
                            {o.revenue}
                          </Typography>
                          <Tag color={o.statusColor} style={{ marginTop: 4 }}>
                            {o.status}
                          </Tag>
                        </div>
                      </Flex>
                      <Flex
                        justify="space-between"
                        align="center"
                        style={{ marginTop: 10 }}
                      >
                        <Typography className={styles.outletMeta}>
                          Utilization: {o.utilization}%
                        </Typography>
                        <Progress
                          percent={o.utilization}
                          showInfo={false}
                          size="small"
                          strokeColor={o.color}
                          style={{ width: 200 }}
                        />
                      </Flex>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              key: "staff",
              label: "Staff per Outlet",
              children: (
                <Table
                  className={styles.table}
                  dataSource={OUTLETS}
                  columns={columns}
                  rowKey="name"
                />
              ),
            },
            {
              key: "inventory",
              label: "Inventory per Outlet",
              children: (
                <Typography className={styles.subtitle}>
                  Outlet inventory distribution
                </Typography>
              ),
            },
            {
              key: "performance",
              label: "Performance",
              children: (
                <Typography className={styles.subtitle}>
                  Outlet performance comparison
                </Typography>
              ),
            },
          ]}
        />
      </Card>
    </main>
  );
}
