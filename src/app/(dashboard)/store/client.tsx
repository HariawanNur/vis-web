"use client";

import {
  Button,
  Card,
  createStyles,
  Flex,
  Icon,
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
    labelKey: "store.kpi.products",
    value: "48",
    icon: "AppstoreOutlined",
    color: "#7c3aed",
    tint: "#f3e8ff",
  },
  {
    labelKey: "store.kpi.ordersToday",
    value: "18",
    icon: "ShoppingCartOutlined",
    color: "#2563eb",
    tint: "#dbeafe",
  },
  {
    labelKey: "store.kpi.revenue",
    value: "Rp 3.28M",
    icon: "DollarOutlined",
    color: "#16a34a",
    tint: "#dcfce7",
  },
  {
    labelKey: "store.kpi.conversion",
    value: "3.2%",
    icon: "RiseOutlined",
    color: "#ea580c",
    tint: "#ffedd5",
  },
];

const PRODUCTS = [
  {
    name: "Kerastase Shampoo",
    price: "Rp 385.000",
    stock: 8,
    sold: 24,
    color: "#7c3aed",
    status: "Active",
  },
  {
    name: "Olaplex No.3",
    price: "Rp 420.000",
    stock: 24,
    sold: 18,
    color: "#2563eb",
    status: "Active",
  },
  {
    name: "Moroccanoil Serum",
    price: "Rp 365.000",
    stock: 15,
    sold: 31,
    color: "#16a34a",
    status: "Active",
  },
  {
    name: "Hair Mask Keratin",
    price: "Rp 295.000",
    stock: 18,
    sold: 12,
    color: "#db2777",
    status: "Active",
  },
  {
    name: "Wella Hair Color",
    price: "Rp 185.000",
    stock: 3,
    sold: 42,
    color: "#ea580c",
    status: "Low Stock",
  },
  {
    name: "Nail Polish Set",
    price: "Rp 125.000",
    stock: 42,
    sold: 15,
    color: "#0891b2",
    status: "Active",
  },
  {
    name: "Body Lotion Vitamin E",
    price: "Rp 175.000",
    stock: 32,
    sold: 8,
    color: "#7c3aed",
    status: "Active",
  },
  {
    name: "Scalp Treatment Oil",
    price: "Rp 245.000",
    stock: 0,
    sold: 21,
    color: "#dc2626",
    status: "Out of Stock",
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
  productGrid: css`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;
    @media (max-width: 1199px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  `,
  productCard: css`
    border: 1px solid #ebeaf0;
    border-radius: 12px;
    overflow: hidden;
    transition: 0.2s ease;
    &:hover {
      box-shadow: 0 7px 18px rgba(28, 22, 49, 0.07);
      transform: translateY(-2px);
    }
  `,
  productImage: css`
    height: 120px;
    display: grid;
    place-items: center;
    color: #fff;
    font-size: 28px;
    font-weight: 800;
  `,
  productBody: css`
    padding: 12px;
  `,
  productName: css`
    color: #272238 !important;
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 4px;
  `,
  productPrice: css`
    color: #7c3aed !important;
    font-size: 14px;
    font-weight: 800;
  `,
  productMeta: css`
    color: #9793a0 !important;
    font-size: 10px;
    margin-top: 4px;
  `,
}));

export default function StoreClient() {
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
            {t("store.title")}
          </Typography.Title>
          <Typography className={styles.subtitle}>
            {t("store.subtitle")}
          </Typography>
        </div>
        <Button type="primary" icon={<Icon type="PlusOutlined" />}>
          {t("store.addProduct")}
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
          defaultActiveKey="products"
          items={[
            {
              key: "products",
              label: "Products",
              children: (
                <div className={styles.productGrid}>
                  {PRODUCTS.map((p) => (
                    <div key={p.name} className={styles.productCard}>
                      <div
                        className={styles.productImage}
                        style={{ background: p.color }}
                      >
                        {p.name.charAt(0)}
                      </div>
                      <div className={styles.productBody}>
                        <Flex justify="space-between" align="center">
                          <Typography className={styles.productName}>
                            {p.name}
                          </Typography>
                          <Tag
                            color={
                              p.status === "Active"
                                ? "green"
                                : p.status === "Low Stock"
                                  ? "orange"
                                  : "red"
                            }
                            style={{ fontSize: 9 }}
                          >
                            {p.status}
                          </Tag>
                        </Flex>
                        <Typography className={styles.productPrice}>
                          {p.price}
                        </Typography>
                        <Flex
                          justify="space-between"
                          align="center"
                          style={{ marginTop: 6 }}
                        >
                          <Typography className={styles.productMeta}>
                            Stock: {p.stock}
                          </Typography>
                          <Typography className={styles.productMeta}>
                            {p.sold} sold
                          </Typography>
                        </Flex>
                      </div>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              key: "categories",
              label: "Categories",
              children: (
                <Typography className={styles.subtitle}>
                  Product categories management
                </Typography>
              ),
            },
            {
              key: "orders",
              label: "Orders",
              children: (
                <Typography className={styles.subtitle}>
                  Online store orders
                </Typography>
              ),
            },
            {
              key: "promos",
              label: "Promos",
              children: (
                <Typography className={styles.subtitle}>
                  Promotions and discounts
                </Typography>
              ),
            },
            {
              key: "shipping",
              label: "Shipping",
              children: (
                <Typography className={styles.subtitle}>
                  Shipping configuration
                </Typography>
              ),
            },
            {
              key: "settings",
              label: "Store Settings",
              children: (
                <Typography className={styles.subtitle}>
                  Storefront settings
                </Typography>
              ),
            },
          ]}
        />
      </Card>
    </main>
  );
}
