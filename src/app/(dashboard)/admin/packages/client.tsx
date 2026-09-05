"use client";

import {
  Button,
  Card,
  Col,
  createStyles,
  Flex,
  Icon,
  Row,
  Switch,
  Typography,
  type IconName,
} from "@/components";
import { useI18n } from "@/i18n";

const useStyles = createStyles({
  card: {
    border: "1px solid #ebeaf0",
    boxShadow: "0 4px 15px rgba(28,22,49,.035)",
  },
  sectionTitle: { fontSize: 14, fontWeight: 800, color: "#272238" },
  featureRow: { fontSize: 13, color: "#4b5563", padding: "4px 0" },
  price: { fontSize: 28, fontWeight: 800, color: "#272238" },
  pricePeriod: { fontSize: 13, color: "#6b7280" },
  badge: {
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 600,
    background: "#f3e8ff",
    color: "#7c3aed",
  },
});

type Package = {
  id: string;
  name: string;
  priceMonth: string;
  priceYear: string;
  features: string[];
  subscribers: number;
  active: boolean;
  icon: IconName;
  color: string;
  tint: string;
};

const PACKAGES: Package[] = [
  {
    id: "1",
    name: "Enterprise",
    priceMonth: "Rp 2.500.000",
    priceYear: "Rp 24.000.000",
    features: [
      "Unlimited staff accounts",
      "Advanced analytics",
      "Custom branding",
      "Priority support",
      "API access",
      "Multi-location",
      "White-label option",
    ],
    subscribers: 42,
    active: true,
    icon: "CrownOutlined",
    color: "#7c3aed",
    tint: "#f3e8ff",
  },
  {
    id: "2",
    name: "Business",
    priceMonth: "Rp 990.000",
    priceYear: "Rp 9.500.000",
    features: [
      "Up to 25 staff accounts",
      "Standard analytics",
      "Online booking",
      "Email support",
      "Inventory management",
      "Multi-branch (3)",
    ],
    subscribers: 128,
    active: true,
    icon: "ShopOutlined",
    color: "#2563eb",
    tint: "#dbeafe",
  },
  {
    id: "3",
    name: "Pro",
    priceMonth: "Rp 390.000",
    priceYear: "Rp 3.700.000",
    features: [
      "Up to 5 staff accounts",
      "Basic analytics",
      "Online booking",
      "Chat support",
      "POS integration",
    ],
    subscribers: 61,
    active: true,
    icon: "RocketOutlined",
    color: "#16a34a",
    tint: "#dcfce7",
  },
];

export default function PackagesClient() {
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
      <Flex
        justify="space-between"
        align="center"
        style={{
          marginBottom: 24,
        }}
      >
        <Typography style={{ fontSize: 20, fontWeight: 800, color: "#272238" }}>
          {t("admin.packages.title")}
        </Typography>
        <Button type="primary" icon={<Icon type="PlusOutlined" />}>
          {t("admin.packages.create")}
        </Button>
      </Flex>

      <Row gutter={[20, 20]}>
        {PACKAGES.map((pkg) => (
          <Col xs={24} lg={8} key={pkg.id}>
            <Card
              className={styles.card}
              styles={{ body: { padding: 28 } }}
              extra={<Switch defaultChecked={pkg.active} />}
            >
              <Flex align="center" gap={12} style={{ marginBottom: 16 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: 12,
                    background: pkg.tint,
                  }}
                >
                  <Icon
                    type={pkg.icon}
                    style={{ color: pkg.color, fontSize: 20 }}
                  />
                </div>
                <div>
                  <Typography
                    style={{ fontSize: 16, fontWeight: 800, color: "#272238" }}
                  >
                    {pkg.name}
                  </Typography>
                  <span className={styles.badge}>
                    {pkg.subscribers} subscribers
                  </span>
                </div>
              </Flex>

              <div style={{ marginBottom: 20 }}>
                <Flex align="baseline" gap={4}>
                  <span className={styles.price}>{pkg.priceMonth}</span>
                  <span className={styles.pricePeriod}>/month</span>
                </Flex>
                <Typography style={{ fontSize: 12, color: "#6b7280" }}>
                  {t("admin.packages.yearly")}: {pkg.priceYear}/yr
                </Typography>
              </div>

              <div
                style={{ borderTop: "1px solid #e5e7eb", margin: "12px 0" }}
              />

              <div style={{ marginBottom: 20 }}>
                <Typography
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#272238",
                    marginBottom: 8,
                  }}
                >
                  {t("admin.packages.features")}
                </Typography>
                {pkg.features.map((f) => (
                  <Flex
                    key={f}
                    align="center"
                    gap={8}
                    className={styles.featureRow}
                  >
                    <Icon
                      type="CheckOutlined"
                      style={{ color: "#16a34a", fontSize: 12 }}
                    />
                    <span>{f}</span>
                  </Flex>
                ))}
              </div>

              <Flex gap={8}>
                <Button block icon={<Icon type="EditOutlined" />}>
                  {t("admin.packages.edit")}
                </Button>
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>
    </Flex>
  );
}
