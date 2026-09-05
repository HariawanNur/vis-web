"use client";

import {
  Button,
  Card,
  createStyles,
  Flex,
  Icon,
  Input,
  Select,
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
    labelKey: "appointments.kpi.today",
    value: "32",
    icon: "CalendarOutlined",
    color: "#7c3aed",
    tint: "#f3e8ff",
  },
  {
    labelKey: "appointments.kpi.upcoming",
    value: "18",
    icon: "ClockCircleOutlined",
    color: "#2563eb",
    tint: "#dbeafe",
  },
  {
    labelKey: "appointments.kpi.completed",
    value: "12",
    icon: "CheckCircleOutlined",
    color: "#16a34a",
    tint: "#dcfce7",
  },
  {
    labelKey: "appointments.kpi.noShow",
    value: "2",
    icon: "CloseCircleOutlined",
    color: "#ea580c",
    tint: "#ffedd5",
  },
];

const APPOINTMENTS = [
  {
    id: "APT-001",
    date: "2026-08-30",
    time: "09:00",
    customer: "Maya Putri",
    service: "Hair Coloring",
    staff: "Sarah Wijaya",
    status: "In Progress",
    statusColor: "purple",
  },
  {
    id: "APT-002",
    date: "2026-08-30",
    time: "09:30",
    customer: "Rina Sulastri",
    service: "Facial Treatment",
    staff: "Maya Salma",
    status: "Confirmed",
    statusColor: "blue",
  },
  {
    id: "APT-003",
    date: "2026-08-30",
    time: "10:00",
    customer: "Dewi Lestari",
    service: "Hair Spa",
    staff: "Rina Marsela",
    status: "Confirmed",
    statusColor: "blue",
  },
  {
    id: "APT-004",
    date: "2026-08-30",
    time: "10:30",
    customer: "Sari Dewi",
    service: "Manicure & Pedicure",
    staff: "Dewi Lestari",
    status: "Pending",
    statusColor: "orange",
  },
  {
    id: "APT-005",
    date: "2026-08-30",
    time: "11:00",
    customer: "Lina Marlena",
    service: "Hair Cut",
    staff: "Sarah Wijaya",
    status: "Confirmed",
    statusColor: "blue",
  },
  {
    id: "APT-006",
    date: "2026-08-30",
    time: "13:00",
    customer: "Putri Ayu",
    service: "Body Massage",
    staff: "Rina Marsela",
    status: "Pending",
    statusColor: "orange",
  },
  {
    id: "APT-007",
    date: "2026-08-30",
    time: "13:30",
    customer: "Anisa Rahma",
    service: "Hair Treatment",
    staff: "Maya Salma",
    status: "Confirmed",
    statusColor: "blue",
  },
  {
    id: "APT-008",
    date: "2026-08-30",
    time: "14:00",
    customer: "Bunga Citra",
    service: "Facial",
    staff: "Dewi Lestari",
    status: "Completed",
    statusColor: "green",
  },
  {
    id: "APT-009",
    date: "2026-08-30",
    time: "14:30",
    customer: "Dian Purnama",
    service: "Hair Coloring",
    staff: "Sarah Wijaya",
    status: "No-show",
    statusColor: "red",
  },
  {
    id: "APT-010",
    date: "2026-08-30",
    time: "15:00",
    customer: "Eka Fitri",
    service: "Nail Art",
    staff: "Maya Salma",
    status: "Pending",
    statusColor: "orange",
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
  filterBar: css`
    display: flex;
    gap: 10px;
    margin-bottom: 14px;
    flex-wrap: wrap;
    align-items: center;
  `,
  filterSelect: css`
    min-width: 150px;
    height: 36px;
  `,
  table: css`
    .ant-table {
      font-size: 12px;
    }
  `,
}));

export default function AppointmentsClient() {
  const { t } = useI18n();
  const { styles } = useStyles();

  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (v: string) => <Tag color="purple">{v}</Tag>,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (v: string) => <Typography.Text strong>{v}</Typography.Text>,
    },
    { title: "Service", dataIndex: "service", key: "service" },
    { title: "Staff", dataIndex: "staff", key: "staff" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (v: string, r: (typeof APPOINTMENTS)[0]) => (
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
          <Button size="small" danger icon={<Icon type="DeleteOutlined" />} />
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
            {t("appointments.title")}
          </Typography.Title>
          <Typography className={styles.subtitle}>
            {t("appointments.subtitle")}
          </Typography>
        </div>
        <Button type="primary" icon={<Icon type="PlusOutlined" />}>
          {t("appointments.newBooking")}
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
        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: 14 }}
        >
          <Typography className={styles.sectionTitle}>
            {t("appointments.schedule")}
          </Typography>
        </Flex>
        <div className={styles.filterBar}>
          <Input type="text" placeholder="Select date" style={{ width: 200 }} />
          <Select
            className={styles.filterSelect}
            placeholder="All Staff"
            allowClear
            options={[
              { label: "Sarah Wijaya", value: "sarah" },
              { label: "Maya Salma", value: "maya" },
              { label: "Rina Marsela", value: "rina" },
            ]}
          />
          <Select
            className={styles.filterSelect}
            placeholder="All Status"
            allowClear
            options={[
              { label: "Confirmed", value: "confirmed" },
              { label: "In Progress", value: "in_progress" },
              { label: "Pending", value: "pending" },
              { label: "Completed", value: "completed" },
              { label: "No-show", value: "noshow" },
            ]}
          />
        </div>
        <Tabs
          defaultActiveKey="list"
          items={[
            {
              key: "calendar",
              label: "Calendar View",
              children: (
                <div
                  style={{
                    height: 400,
                    background: "#f9f8fc",
                    borderRadius: 8,
                    display: "grid",
                    placeItems: "center",
                    color: "#9793a0",
                  }}
                >
                  Calendar View Placeholder
                </div>
              ),
            },
            {
              key: "list",
              label: "List View",
              children: (
                <Table
                  className={styles.table}
                  dataSource={APPOINTMENTS}
                  columns={columns}
                  rowKey="id"
                  pagination={{ defaultCurrent: 1 }}
                />
              ),
            },
            {
              key: "waiting",
              label: "Waiting List",
              children: (
                <Typography className={styles.subtitle}>
                  No items in waiting list
                </Typography>
              ),
            },
            {
              key: "noshow",
              label: "No-show Management",
              children: (
                <Typography className={styles.subtitle}>
                  2 no-show appointments today
                </Typography>
              ),
            },
          ]}
        />
      </Card>
    </main>
  );
}
