"use client";

import {
  Button,
  Card,
  Col,
  createStyles,
  Flex,
  Icon,
  Progress,
  Row,
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
    labelKey: "marketing.kpi.sentToday",
    value: "562",
    icon: "SendOutlined",
    color: "#7c3aed",
    tint: "#f3e8ff",
  },
  {
    labelKey: "marketing.kpi.delivered",
    value: "98.7%",
    icon: "CheckCircleOutlined",
    color: "#16a34a",
    tint: "#dcfce7",
  },
  {
    labelKey: "marketing.kpi.read",
    value: "91.4%",
    icon: "EyeOutlined",
    color: "#2563eb",
    tint: "#dbeafe",
  },
  {
    labelKey: "marketing.kpi.activeCampaigns",
    value: "3",
    icon: "RocketOutlined",
    color: "#ea580c",
    tint: "#ffedd5",
  },
];

const AUTOMATIONS: Array<{
  name: string;
  trigger: string;
  audience: string;
  sent: number;
  rate: number;
  icon: IconName;
  color: string;
  tint: string;
}> = [
  {
    name: "Booking Confirmation",
    trigger: "On new booking",
    audience: "All customers",
    sent: 342,
    rate: 99,
    icon: "CalendarOutlined",
    color: "#7c3aed",
    tint: "#f3e8ff",
  },
  {
    name: "Appointment Reminder",
    trigger: "24h before appointment",
    audience: "Booked customers",
    sent: 286,
    rate: 97,
    icon: "ClockCircleOutlined",
    color: "#2563eb",
    tint: "#dbeafe",
  },
  {
    name: "Review Request",
    trigger: "After service completed",
    audience: "Completed services",
    sent: 198,
    rate: 89,
    icon: "StarOutlined",
    color: "#16a34a",
    tint: "#dcfce7",
  },
  {
    name: "Promotions",
    trigger: "Manual / Scheduled",
    audience: "Gold & Platinum members",
    sent: 124,
    rate: 94,
    icon: "GiftOutlined",
    color: "#ea580c",
    tint: "#ffedd5",
  },
];

const CAMPAIGNS = [
  {
    name: "August Flash Sale",
    audience: "All Members",
    sent: 1248,
    status: "Active",
    statusColor: "green",
    created: "Aug 28, 2026",
  },
  {
    name: "Birthday Promo",
    audience: "August Birthdays",
    sent: 86,
    status: "Active",
    statusColor: "green",
    created: "Aug 1, 2026",
  },
  {
    name: "Referral Program Launch",
    audience: "Gold & Platinum",
    sent: 0,
    status: "Draft",
    statusColor: "default",
    created: "Aug 30, 2026",
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
  autoCard: css`
    border: 1px solid #ebeaf0;
    border-radius: 12px;
    padding: 16px;
    transition: 0.2s ease;
    &:hover {
      box-shadow: 0 4px 12px rgba(28, 22, 49, 0.06);
    }
  `,
  autoIcon: css`
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    border-radius: 12px;
  `,
  autoName: css`
    color: #272238 !important;
    font-size: 13px;
    font-weight: 700;
  `,
  autoTrigger: css`
    color: #9793a0 !important;
    font-size: 10px;
  `,
  autoMeta: css`
    color: #858190 !important;
    font-size: 10px;
    margin-top: 8px;
  `,
  table: css`
    .ant-table {
      font-size: 12px;
    }
  `,
}));

export default function MarketingClient() {
  const { t } = useI18n();
  const { styles } = useStyles();

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
            {t("marketing.title")}
          </Typography.Title>
          <Typography className={styles.subtitle}>
            {t("marketing.subtitle")}
          </Typography>
        </div>
        <Button type="primary" icon={<Icon type="PlusOutlined" />}>
          {t("marketing.newCampaign")}
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
          defaultActiveKey="automation"
          items={[
            {
              key: "automation",
              label: "WhatsApp Automation",
              children: (
                <Row gutter={[12, 12]}>
                  {AUTOMATIONS.map((a) => (
                    <Col key={a.name} xs={24} sm={12} lg={6}>
                      <div className={styles.autoCard}>
                        <Flex justify="space-between" align="start">
                          <span
                            className={styles.autoIcon}
                            style={{ color: a.color, background: a.tint }}
                          >
                            <Icon type={a.icon} size={19} />
                          </span>
                          <Tag color="green">Active</Tag>
                        </Flex>
                        <Typography
                          className={styles.autoName}
                          style={{ marginTop: 10 }}
                        >
                          {a.name}
                        </Typography>
                        <Typography className={styles.autoTrigger}>
                          {a.trigger}
                        </Typography>
                        <Typography className={styles.autoMeta}>
                          Audience: {a.audience}
                        </Typography>
                        <Flex
                          justify="space-between"
                          align="center"
                          style={{ marginTop: 10 }}
                        >
                          <Typography className={styles.autoMeta}>
                            {a.sent} sent
                          </Typography>
                          <Typography className={styles.autoMeta}>
                            {a.rate}% delivered
                          </Typography>
                        </Flex>
                        <Progress
                          percent={a.rate}
                          showInfo={false}
                          size="small"
                          strokeColor={a.color}
                          style={{ marginTop: 4 }}
                        />
                      </div>
                    </Col>
                  ))}
                </Row>
              ),
            },
            {
              key: "campaigns",
              label: "Campaigns",
              children: (
                <div>
                  <Flex
                    justify="space-between"
                    align="center"
                    style={{ marginBottom: 12 }}
                  >
                    <Typography className={styles.sectionTitle}>
                      Active Campaigns
                    </Typography>
                    <Button size="small" icon={<Icon type="PlusOutlined" />}>
                      New Campaign
                    </Button>
                  </Flex>
                  {CAMPAIGNS.map((c) => (
                    <Flex
                      key={c.name}
                      justify="space-between"
                      align="center"
                      style={{
                        padding: "10px 0",
                        borderBottom: "1px solid #f0eff4",
                      }}
                    >
                      <div>
                        <Typography.Text strong>{c.name}</Typography.Text>
                        <br />
                        <Typography.Text
                          type="secondary"
                          style={{ fontSize: 10 }}
                        >
                          {c.audience} | Created {c.created}
                        </Typography.Text>
                      </div>
                      <Flex align="center" gap={8}>
                        <Typography.Text style={{ fontSize: 11 }}>
                          {c.sent > 0
                            ? `${c.sent.toLocaleString()} sent`
                            : "Not sent"}
                        </Typography.Text>
                        <Tag color={c.statusColor}>{c.status}</Tag>
                        <Button
                          size="small"
                          icon={<Icon type="EditOutlined" />}
                        />
                      </Flex>
                    </Flex>
                  ))}
                </div>
              ),
            },
            {
              key: "segments",
              label: "Customer Segments",
              children: (
                <Typography className={styles.subtitle}>
                  Customer segmentation for targeted campaigns
                </Typography>
              ),
            },
          ]}
        />
      </Card>
    </main>
  );
}
