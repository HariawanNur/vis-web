"use client";

import {
  Button,
  Card,
  createStyles,
  Flex,
  Icon,
  Input,
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
    labelKey: "inventory.kpi.totalSku",
    value: "156",
    icon: "AppstoreOutlined",
    color: "#7c3aed",
    tint: "#f3e8ff",
  },
  {
    labelKey: "inventory.kpi.lowStock",
    value: "12",
    icon: "WarningOutlined",
    color: "#ea580c",
    tint: "#ffedd5",
  },
  {
    labelKey: "inventory.kpi.outOfStock",
    value: "3",
    icon: "CloseCircleOutlined",
    color: "#dc2626",
    tint: "#fee2e2",
  },
  {
    labelKey: "inventory.kpi.totalValue",
    value: "Rp 45.2M",
    icon: "DollarOutlined",
    color: "#16a34a",
    tint: "#dcfce7",
  },
];

const PRODUCTS = [
  {
    name: "Kerastase Shampoo",
    sku: "KRS-SHM-250",
    category: "Hair Care",
    stock: 8,
    minStock: 10,
    price: "Rp 385.000",
    status: "Low Stock",
    statusColor: "orange",
  },
  {
    name: "Olaplex No.3 Treatment",
    sku: "OLP-TRT-100",
    category: "Hair Treatment",
    stock: 24,
    minStock: 10,
    price: "Rp 420.000",
    status: "In Stock",
    statusColor: "green",
  },
  {
    name: "Moroccanoil Serum",
    sku: "MRC-SRM-100",
    category: "Hair Serum",
    stock: 15,
    minStock: 8,
    price: "Rp 365.000",
    status: "In Stock",
    statusColor: "green",
  },
  {
    name: "Wella Hair Color",
    sku: "WLA-CLR-60",
    category: "Coloring",
    stock: 3,
    minStock: 5,
    price: "Rp 185.000",
    status: "Low Stock",
    statusColor: "orange",
  },
  {
    name: "Scalp Treatment Oil",
    sku: "SCL-OIL-120",
    category: "Scalp Care",
    stock: 0,
    minStock: 5,
    price: "Rp 245.000",
    status: "Out of Stock",
    statusColor: "red",
  },
  {
    name: "Hair Mask Keratin",
    sku: "HRM-MSK-500",
    category: "Hair Treatment",
    stock: 18,
    minStock: 8,
    price: "Rp 295.000",
    status: "In Stock",
    statusColor: "green",
  },
  {
    name: "Vitamin E Body Lotion",
    sku: "VTE-LOT-250",
    category: "Body Care",
    stock: 32,
    minStock: 10,
    price: "Rp 175.000",
    status: "In Stock",
    statusColor: "green",
  },
  {
    name: "Nail Polish Collection",
    sku: "NPL-CLT-15",
    category: "Nail Care",
    stock: 42,
    minStock: 15,
    price: "Rp 85.000",
    status: "In Stock",
    statusColor: "green",
  },
  {
    name: "Facial Cleanser Aloe",
    sku: "FCL-CLS-200",
    category: "Skin Care",
    stock: 0,
    minStock: 8,
    price: "Rp 225.000",
    status: "Out of Stock",
    statusColor: "red",
  },
  {
    name: "Styling Wax Matte",
    sku: "STL-WAX-75",
    category: "Styling",
    stock: 5,
    minStock: 10,
    price: "Rp 145.000",
    status: "Low Stock",
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
  table: css`
    .ant-table {
      font-size: 12px;
    }
  `,
  stockBar: css`
    width: 80px;
  `,
}));

export default function InventoryClient() {
  const { t } = useI18n();
  const { styles } = useStyles();

  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (v: string) => <Typography.Text strong>{v}</Typography.Text>,
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      render: (v: string) => <Tag>{v}</Tag>,
    },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (v: number, r: (typeof PRODUCTS)[0]) => (
        <Flex align="center" gap={8}>
          <Typography.Text strong>{v}</Typography.Text>
          <Progress
            className={styles.stockBar}
            percent={Math.min(100, (v / r.minStock) * 100)}
            showInfo={false}
            size="small"
            strokeColor={
              v === 0 ? "#dc2626" : v < r.minStock ? "#ea580c" : "#16a34a"
            }
          />
        </Flex>
      ),
    },
    { title: "Min Stock", dataIndex: "minStock", key: "minStock" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (v: string) => <Typography.Text strong>{v}</Typography.Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (v: string, r: (typeof PRODUCTS)[0]) => (
        <Tag color={r.statusColor}>{v}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space size={4}>
          <Button size="small" icon={<Icon type="EditOutlined" />} />
          <Button size="small" icon={<Icon type="PlusOutlined" />} />
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
            {t("inventory.title")}
          </Typography.Title>
          <Typography className={styles.subtitle}>
            {t("inventory.subtitle")}
          </Typography>
        </div>
        <Space>
          <Input
            prefix={<Icon type="SearchOutlined" />}
            placeholder="Search products..."
            style={{ width: 240 }}
          />
          <Button type="primary" icon={<Icon type="PlusOutlined" />}>
            {t("inventory.addProduct")}
          </Button>
        </Space>
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
        <Typography
          className={styles.sectionTitle}
          style={{ marginBottom: 14 }}
        >
          {t("inventory.management")}
        </Typography>
        <Tabs
          defaultActiveKey="products"
          items={[
            {
              key: "products",
              label: "Products",
              children: (
                <Table
                  className={styles.table}
                  dataSource={PRODUCTS}
                  columns={columns}
                  rowKey="sku"
                  pagination={{ defaultCurrent: 1 }}
                />
              ),
            },
            {
              key: "movement",
              label: "Stock Movement",
              children: (
                <Typography className={styles.subtitle}>
                  Stock in/out history
                </Typography>
              ),
            },
            {
              key: "suppliers",
              label: "Suppliers",
              children: (
                <Typography className={styles.subtitle}>
                  Supplier management
                </Typography>
              ),
            },
            {
              key: "po",
              label: "Purchase Orders",
              children: (
                <Typography className={styles.subtitle}>
                  Purchase order tracking
                </Typography>
              ),
            },
          ]}
        />
      </Card>
    </main>
  );
}
